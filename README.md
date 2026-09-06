# ResQBed - Hospital Referral System for India

ResQBed is a web application designed to streamline the process of referring patients from local hospitals to higher hierarchy hospitals across India. It helps doctors quickly find available beds for their patients and enables hospitals to manage referrals, bed availability, and blood stock in real time.

## Features

- **For Doctors:**
  - Register with hospital affiliation and upload degree certificate
  - Refer patients to higher hierarchy hospitals, including patient contact details (phone, address) so hospitals can reach them
  - Upload prescriptions for referred patients (JPG, PNG, WEBP, HEIC, or PDF)
  - Track referral status with a unique Referral ID, searchable and sortable by ID or date
  - Print or download a PDF referral slip with the patient's details, the referring doctor's info, and the receiving hospital's contact information

- **For Hospitals:**
  - Register as a local or higher hierarchy hospital
  - Manage incoming referrals (accept, reject, or mark as completed), searchable and sortable by Referral ID or date
  - Update bed, ICU, ventilator, and oxygen availability in real time
  - Update blood group inventory (all 8 blood groups) from the Blood Availability page
  - View patient and referring doctor information, plus a proper in-browser viewer for prescriptions (images and PDFs)

- **Public / No Login Required:**
  - Live stats on the home page: total beds, ICU beds, ventilators, and oxygen cylinders across all registered hospitals, searchable by hospital name, location, or pincode, with a "Get Directions" link to each hospital
  - **Blood Availability** page: live blood group availability across all hospitals, searchable and sortable by hospital name, city, or blood group

- **ResQSaathi:** a bilingual (English/Hindi) AI chatbot on the home page with live access to hospital stats, so visitors can ask things like "kitne ICU beds available hain?" and get an accurate, current answer

- **Profile Settings:** users can update their profile photo; all other account details are read-only with a note to contact the admin for changes

## Tech Stack

- **Frontend:** Next.js (App Router) with TypeScript, React, Tailwind CSS
- **Icons:** Lucide React
- **UI Components:** Kibo UI (spinner)
- **Authentication:** JWT (via `jose`)
- **Database:** Supabase (Postgres), accessed via `postgres.js`
- **File Storage:** Supabase Storage (prescriptions, profile photos)
- **AI Chatbot:** Groq (`openai/gpt-oss-120b`)
- **PDF Generation:** jsPDF (referral slips)
- **Markdown Rendering:** react-markdown (chatbot responses)
- **API:** Next.js API Routes

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm
- A Supabase project (see `schema.sql` and the additional migration files in this repo for the full database schema)
- A free Groq API key from [console.groq.com](https://console.groq.com)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Sarrafaditya/resqbed.git
   cd resqbed
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up your Supabase project:
   - Run `schema.sql` in the Supabase SQL Editor to create the core tables (`users`, `hospitals`, `referrals`)
   - Run the additional migration files (patient contact fields, profile photo, blood inventory) in the SQL Editor
   - Create two **public** Storage buckets: `prescriptions` and `profile-photos`

4. Create a `.env.local` file in the project root with:
   ```
   DATABASE_URL=your_supabase_connection_pooler_url
   JWT_SECRET=a_random_secret_string
   GROQ_API_KEY=your_groq_api_key
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```
   Never commit this file — it's already listed in `.gitignore`.

5. Run the development server
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
resqbed/
├── app/
│   ├── api/                  # API routes (auth, referrals, stats, blood-availability, chat, etc.)
│   ├── components/           # Reusable components (HeaderNav, Footer, ResQSaathi, etc.)
│   ├── context/              # AuthContext
│   ├── doctor/                # Doctor dashboard
│   ├── hospital/              # Hospital dashboard
│   ├── blood-availability/    # Public blood availability page
│   ├── stats/                 # Public stats page
│   ├── profile/                # Profile settings page
│   ├── login/ register/       # Authentication pages
│   └── utils/                 # Supabase (Postgres + Storage) clients
├── components/kibo-ui/        # Spinner component
├── public/                    # Static assets
├── schema.sql                 # Core database schema
├── README.md
└── package.json
```

## Deployment

ResQBed is designed to deploy for free on [Vercel](https://vercel.com):

1. Push this repository to GitHub
2. Import it into Vercel
3. Add all five environment variables from `.env.local` to Vercel's project settings
4. Deploy — every future push to `main` redeploys automatically

## Current Limitations

- No admin dashboard yet for account/content moderation
- No SMS notifications for referral status updates

## Future Enhancements

- Admin dashboard for system monitoring
- Mobile application for doctors
- SMS notifications for referral status updates
- Integration with hospital EHR systems