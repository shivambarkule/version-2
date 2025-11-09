import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, sendEmailJS, sendResendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, surname, email, message } = body;

    // Basic validation
    if (!name || !surname || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Message length validation
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long' },
        { status: 400 }
      );
    }

    const emailData = { name, surname, email, message };

    // Try multiple email services for reliability
    let success = false;

    // Try Resend first (if configured)
    if (!success) {
      success = await sendResendEmail(emailData);
    }

    // Try EmailJS as fallback (if configured)
    if (!success) {
      success = await sendEmailJS(emailData);
    }

    // Try FormSubmit.co as final fallback
    if (!success) {
      success = await sendContactEmail(emailData);
    }

    if (success) {
      return NextResponse.json(
        { message: 'Message sent successfully!' },
        { status: 200 }
      );
    } else {
      throw new Error('All email services failed');
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}