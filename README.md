# Anveya Designs — Website + Admin Panel

Next.js 15 (frontend + backend API routes) · MySQL · Irish-cream design with page-load / page-change curtain, line-mask text reveals, image wipes, sticky hero, cursor glow, smooth scrolling.

## 1. Requirements
- Node.js 18.18+ (20 or 22 recommended)
- MySQL 5.7+/8 or MariaDB (XAMPP / WAMP / MySQL Server all work)

## 2. Database settings
Edit **`.env.local`** (already filled in for your local setup):

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=8080
DB_NAME=ANEYA
```

## 3. Install & run
```bash
npm install
npm run db:setup      # creates database ANEYA, tables and the admin user
npm run dev           # http://localhost:3000
```
`db:setup` is optional — the app also creates the database and tables automatically on first request.
You can also import `database/schema.sql` in phpMyAdmin instead.

Production: `npm run build && npm start`

## 4. Admin panel
- URL: **http://localhost:3000/login**
- Email: **admin@anveya.com** (case-insensitive, so ADMIN@ANVEYA.com works)
- Password: **Admin@anveya**

| Section | What it does |
|---|---|
| Dashboard | Totals, new leads, last 7 / 30 days, status / property-type breakdown, recent enquiries |
| Sidebar | Dashboard · Leads (with new-lead badge) · Export leads (CSV) · View website · Log out |
| Leads | Every enquiry from the Home and Contact forms · search · filter by status/type · open a lead to call / WhatsApp / email, change status (New → Contacted → Qualified → Proposal Sent → Won/Lost), add internal notes, delete · Export CSV |

Home page FAQs are not managed in the admin panel — edit them in **`lib/defaults.js`** (`FAQS`).

## 5. Portfolio projects
Each project has its own page at `/portfolio/<slug>` (cover, project facts, brief, approach, 4-image gallery with full-screen viewer, highlights, previous/next project).
Edit projects in **`lib/projects.js`** — title, category, summary, location, area, year, spaces, scope, brief, approach, highlights, cover image and 4 gallery images. Empty fields are hidden. Add a new object to the list to add a project; it appears on the Portfolio page automatically.

## 5a. Enquiry form & popup
Fields: Full Name, Mobile (+91, 10 digits), Interior Budget, Property Location, Property Type, Project Timeline — on the Home page, Contact page and in the popup.
The dropdown options and popup timing are in **`lib/defaults.js`** (`BUDGETS`, `LOCATIONS`, `PROPERTY_TYPE_GROUPS`, `TIMELINES`, `POPUP_AUTO_OPEN_SECONDS` — popup opens every 20 s while closed and stops once the visitor submits; set to 0 to turn off).
Every "Book a Consultation" / "Start Your Project" button opens the popup. All submissions appear in Admin → Leads.

## 5b. Contact details
Fill in `CONTACT` in **`lib/defaults.js`** (email, phone, address, jurisdiction city, social links). They appear in the footer, Contact page and the Privacy / Terms / Cookies pages. Until then the policy pages show the doc's `[Business Email]` / `[Contact Number]` / `[Business Address]` / `[City, State]` placeholders.

## 6. Pages (content from the "Anveya Design Website Content" doc)
`/` · `/about-us` · `/portfolio` · `/contact-us` · `/privacy-policy` · `/terms-and-conditions` · `/cookies-policy`

## 7. Images
Stock interior photos are loaded from Unsplash. Replace them with your own project photos in **`lib/defaults.js` → `IMG`** (any URL, or put files in `/public/images/` and use `/images/your-file.jpg`).

## 8. Where things live
```
app/(site)/…           public pages
app/login, app/admin   login + admin panel
app/api/leads          public enquiry endpoint (validation, honeypot, rate limit)
app/api/admin/…        protected admin APIs (JWT cookie, see middleware.js)
components/site/Motion.js   all animations: curtain, reveals, smooth scroll, parallax
app/globals.css        design system (colours, fonts, animation CSS)
lib/db.js              MySQL pool + auto schema
```

## 9. Going live
- Set a new `JWT_SECRET` and `COOKIE_SECURE=true` (when served over HTTPS).
- Change the admin password: generate a hash with
  `node -e "console.log(require('bcryptjs').hashSync('NewPassword',10))"`
  and update `admin_users.password_hash` in phpMyAdmin.
