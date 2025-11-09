// Email service utility
// You can configure this with your preferred email service

interface EmailData {
  name: string;
  surname: string;
  email: string;
  message: string;
}

export async function sendContactEmail(data: EmailData) {
  // Option 1: Using FormSubmit.co (free service)
  try {
    const formData = new FormData();
    formData.append('name', `${data.name} ${data.surname}`);
    formData.append('email', data.email);
    formData.append('message', data.message);
    formData.append('_subject', 'New Contact Form Submission from Portfolio');
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');

    const response = await fetch('https://formsubmit.co/shivambarkule.xyz@gmail.com', {
      method: 'POST',
      body: formData,
    });

    return response.ok;
  } catch (error) {
    console.error('Email service error:', error);
    return false;
  }
}

// Option 2: Using EmailJS (alternative free service)
export async function sendEmailJS(data: EmailData) {
  // You would need to set up EmailJS account and get these values
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS not configured');
    return false;
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: `${data.name} ${data.surname}`,
          from_email: data.email,
          message: data.message,
          to_email: 'shivambarkule.xyz@gmail.com',
        },
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('EmailJS error:', error);
    return false;
  }
}

// Option 3: Using Resend (modern email API)
export async function sendResendEmail(data: EmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.warn('Resend API key not configured');
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'contact@yourdomain.com', // You need to verify this domain with Resend
        to: ['shivambarkule.xyz@gmail.com'],
        subject: 'New Contact Form Submission from Portfolio',
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name} ${data.surname}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Resend error:', error);
    return false;
  }
}