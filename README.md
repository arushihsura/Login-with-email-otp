🔐 Login with Email OTP – Full Stack App

A dummy authentication system where users log in via email and OTP. It uses React on the frontend, Node.js/Express for the backend, and Supabase for storing users and OTP session data. Upon successful OTP verification, a JWT is issued for session management.


🚀 Features

Login using email

OTP sent via email (or logged in console)

OTP expiry & invalidation handling

JWT-based session management

Supabase-backed persistent storage

Minimal React frontend + dashboard

🛠️ Tech Stack

Frontend : React, Axios, TailwindCSS

Backend	:  Node.js, Express, Nodemailer, JWT

Database : Supabase (PostgreSQL)


⚙️ Setup Instructions

📌 Prerequisites

Node.js, npm

Supabase account

React development environment

🔧 Backend Setup

Go to the backend/ folder:

    cd backend


Install dependencies:

    npm install


Create a .env file with:

    PORT=4002

    SUPABASE_URL=your_supabase_url

    SUPABASE_ANON_KEY=your_supabase_anon_key
    
    JWT_SECRET=your_jwt_secret
    
    EMAIL_USER=your_email@gmail.com

    EMAIL_PASS=your_email_password


Start the backend server:

npm run dev


💻 Frontend Setup

Go to the frontend/ folder:

    cd frontend


Install dependencies:

    npm install

Start the frontend app:

    npm run dev

Visit: http://localhost:3000

🧪 Testing the App

Enter your email

Check inbox for OTP

Enter OTP and click Login

Redirects to dummy dashboard

📝 Notes

OTP expires after a set duration (e.g., 5 mins).

