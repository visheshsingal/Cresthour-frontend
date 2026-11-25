# Cresthour - Weekly Live Webinars (Soft Skills & Basic Coding)

A complete **Next.js 14 App Router** platform for hosting weekly live webinars on **Soft Skills & Basic Coding**, featuring an authenticated `/admin` control panel, **Cloudinary** poster uploads, **Razorpay** payments, and automated **WhatsApp** link & details delivery.

---

## 🌟 Key Features

1. **Public Platform (`/`)**:
   - Modern, high-converting dark-themed UI.
   - Highlights the dual power of **1 Core Soft Skill + 1 Basic Coding Concept** every week.
   - Live Countdown timer to the upcoming session.
   - Interactive Registration Modal with **Razorpay Checkout**.
   - Immediate confirmation with WhatsApp delivery status and direct Meeting link backup.

2. **Admin Panel (`/admin`)**:
   - Protected route with Username & Password authentication configured in `.env.local`.
   - **Cloudinary Poster Upload**: Upload webinar thumbnail/pic directly to Cloudinary.
   - Schedule & manage weekly webinars (Name, Date, Time, Duration, Price, Description, Key takeaways, Google Meet/Zoom link, Attendee WhatsApp group).
   - **Attendee Tracker**: View registered users, payment IDs, and WhatsApp delivery status.
   - **1-Click WhatsApp Resend**: Ability to re-dispatch meeting links to attendees.
   - **API & Environment Guide tab**: In-app overview of credentials status.

3. **Payment & WhatsApp Automation**:
   - **Razorpay**: Order creation (`/api/razorpay/create-order`) & signature verification (`/api/razorpay/verify`).
   - Includes simulated test payment mode for local development without keys.
   - **WhatsApp Automation**: Automatically sends personalized session confirmation, meeting join link, date, time, and tips directly to the attendee's WhatsApp number.
   - Supports **Meta WhatsApp Cloud API**, **Twilio**, or **Webhooks (Aisensy / Interakt / Wati / Zapier)**, with local simulation log fallback.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (`.env.local`)
Create or edit `.env.local`:
```env
# Admin Credentials for /admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Cloudinary (Poster / Pic Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay (Online Payments)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_razorpay_secret

# WhatsApp Automation (Option 1: Meta WhatsApp Cloud API)
WHATSAPP_TOKEN=your_meta_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id

# WhatsApp Automation (Option 2: Webhook - Aisensy / Interakt / Zapier)
# WHATSAPP_WEBHOOK_URL=https://...
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public landing page and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin portal.

### 4. Build for Production
```bash
npm run build
npm run start
```
