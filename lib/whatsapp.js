/**
 * WhatsApp Notification Service for Webinar & Monthly Pass Confirmation
 */

export async function sendWebinarWhatsAppMessage({
  phone,
  userName,
  webinarTitle,
  date,
  time,
  duration,
  meetingLink,
  whatsappGroupLink,
  orderId,
  isMonthlyPass
}) {
  let cleanPhone = (phone || '').replace(/\D/g, '');
  if (cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }

  let messageText = '';

  if (isMonthlyPass) {
    messageText = 
`🎉 *Congratulations ${userName}!* Your *Cresthour All-Access Monthly Pass* (₹800) is confirmed!

🌟 *Membership Benefits:*
• Full Access to ALL 4 Live Webinars this month
• High-Definition Recordings Archive & Code Snippets
• Private Attendee WhatsApp Community Access
• Priority 1-on-1 Resume & Mock Interview Review

💬 *Join the Exclusive Cohort Community Group:*
${whatsappGroupLink || 'https://chat.whatsapp.com/cresthour-cohort-community'}

📅 *Your Monthly Schedule:*
• Week 1: Array DSA & Articulating Problem Solving Out Loud
• Week 2: Strings, Two-Pointers & STAR Storytelling Method
• Week 3: Recursion Intuition, Git Mastery & Overcoming Getting Stuck
• Week 4: Full Stack Basics, Portfolio Pitch & Salary Negotiation

🔗 *Individual session meeting links will be shared in the community group 2 hours before each live session.*

🔖 *Booking Reference ID:* ${orderId || 'CREST-PASS-' + Date.now().toString().slice(-6)}

See you live this Saturday at 7:00 PM IST!
— Team Cresthour`;
  } else {
    messageText = 
`🎉 *Congratulations ${userName}!* Your seat is confirmed for the upcoming Cresthour Live Webinar.

📚 *Topic:* ${webinarTitle}
📅 *Date:* ${date}
⏰ *Time:* ${time} (${duration || '90 mins'})

🔗 *Live Join Link (Google Meet / Zoom):*
${meetingLink || 'Will be shared 1 hour before session'}

${whatsappGroupLink ? `💬 *Attendee WhatsApp Community:*\n${whatsappGroupLink}\n` : ''}
🔖 *Registration ID:* ${orderId || 'CREST-' + Date.now().toString().slice(-6)}

*Important Guidelines:*
1. Join 5 minutes early for sound & screen check.
2. Keep a notebook handy for problem-solving diagrams & communication models.

See you live!
— Team Cresthour`;
  }

  console.log('----------------------------------------------------');
  console.log(`[WhatsApp Dispatch] To: +${cleanPhone}`);
  console.log(messageText);
  console.log('----------------------------------------------------');

  // 1. Meta WhatsApp Cloud API
  const metaToken = process.env.WHATSAPP_TOKEN;
  const metaPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (metaToken && metaPhoneId) {
    try {
      const res = await fetch(`https://graph.facebook.com/v21.0/${metaPhoneId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${metaToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: cleanPhone,
          type: 'text',
          text: {
            preview_url: true,
            body: messageText
          }
        })
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('[WhatsApp Cloud API Error]:', data);
        return { success: false, provider: 'meta', error: data, simulated: false };
      }
      return { success: true, provider: 'meta', data, simulated: false };
    } catch (err) {
      console.error('[WhatsApp Cloud API Exception]:', err);
      return { success: false, provider: 'meta', error: err.message, simulated: false };
    }
  }

  // 2. Custom Webhook (Aisensy / Interakt / Zapier / Make)
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanPhone,
          name: userName,
          message: messageText,
          webinarTitle,
          isMonthlyPass: Boolean(isMonthlyPass),
          date,
          time,
          meetingLink,
          whatsappGroupLink,
          orderId
        })
      });
      return { success: res.ok, provider: 'webhook', simulated: false };
    } catch (err) {
      console.error('[WhatsApp Webhook Exception]:', err);
    }
  }

  // 3. Fallback / Test Mode
  return {
    success: false,
    provider: 'logger_simulated',
    simulated: true,
    message: 'WhatsApp was not sent. Prepare and send the message manually from the admin attendees list.'
  };
}
