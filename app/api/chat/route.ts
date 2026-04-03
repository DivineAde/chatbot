import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  console.log('🔥 Incoming request: /api/chat');

  try {
    // ==============================
    // 1. Parse Request Body
    // ==============================
    let body;

    try {
      body = await request.json();
      console.log('✅ Request body:', body);
    } catch (err) {
      console.error('❌ Failed to parse JSON:', err);
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const { message } = body;

    if (!message) {
      console.warn('⚠️ Message is missing');
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // ==============================
    // 2. Check API Key
    // ==============================
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error('❌ OPENROUTER_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    console.log('✅ API Key detected');

    // ==============================
    // 3. Prepare Payload
    // ==============================
    const payload = {
      model: 'deepseek/deepseek-r1',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
    };

    console.log('📤 Sending payload:', JSON.stringify(payload, null, 2));

    // ==============================
    // 4. Call OpenRouter
    // ==============================
    let response;

    try {
      response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer':
              process.env.SITE_URL || 'http://localhost:3000',
            'X-Title': process.env.SITE_NAME || 'ChatBot App',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
    } catch (err) {
      console.error('❌ Network error calling OpenRouter:', err);
      return NextResponse.json(
        { error: 'Network error contacting AI service' },
        { status: 500 }
      );
    }

    console.log('📥 Response status:', response.status);

    // ==============================
    // 5. Handle API Errors
    // ==============================
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenRouter API Error:', errorText);

      return NextResponse.json(
        {
          error: `OpenRouter error (${response.status})`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    // ==============================
    // 6. Parse Response
    // ==============================
    let data;

    try {
      data = await response.json();
      console.log('✅ Response data:', JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('❌ Failed to parse response JSON:', err);
      return NextResponse.json(
        { error: 'Invalid JSON from AI service' },
        { status: 500 }
      );
    }

    // ==============================
    // 7. Extract Reply
    // ==============================
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.warn('⚠️ No reply in response');
      return NextResponse.json(
        {
          error: 'No response generated',
          raw: data,
        },
        { status: 500 }
      );
    }

    console.log('✅ AI Reply:', reply);

    // ==============================
    // 8. Return Response
    // ==============================
    return NextResponse.json({
      message: reply,
    });

  } catch (error) {
    console.error('💥 Unexpected error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        details:
          error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
