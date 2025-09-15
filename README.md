# 🧑‍🏫 Mentora – AI Career Coach

Mentora is an **AI-powered career assistant** that helps users create professional resumes, practice interviews, and track industry trends.  
Built entirely with **Next.js (frontend + backend)**, **MongoDB**, and the **OpenAI API**, Mentora provides an interactive platform to prepare for real-world career opportunities.

---

## 🚀 Features

- **Resume Builder** → Generate tailored resumes with AI assistance.  
- **AI Interview Coach** → Practice with **200+ automated mock interview Q&As** and receive real-time feedback.  
- **Industry Trends Dashboard** → Visualize **50+ in-demand job skills** across industries with interactive charts.  
- **Real-Time AI Feedback** → Get instant suggestions to improve technical and communication responses.  
- **Secure User Profiles** → Save resumes, interview history, and skill insights with a **MongoDB backend**.  

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (Frontend + Backend API routes)  
- **Database**: [MongoDB](https://www.mongodb.com/)  
- **AI Engine**: [OpenAI API](https://platform.openai.com/)  
- **Data Visualization**: Recharts / Chart.js  
- **Auth**: NextAuth.js  

---

## 📂 Project Structure

mentora/
├── components/ # Reusable UI components
├── pages/
│ ├── api/ # Backend API routes (Next.js)
│ ├── index.js # Landing page
│ ├── resume.js # Resume builder
│ ├── interview.js # AI mock interview
│ └── dashboard.js # Industry trends dashboard
├── utils/ # Helper functions & API handlers
├── public/ # Static assets
├── styles/ # Global & modular styles
└── README.md



---

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone (https://github.com/Altamashkhan9315/mentora)
cd mentora

---

### 2️⃣ Install Dependencies
npm install

---

### 3️⃣ Add Environment Variables

Create a .env.local file in the root directory:

OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret

### 4️⃣ Run the Development Server
npm run dev


Visit http://localhost:3000
 🚀

📊 Dashboard Preview

The Industry Trends Dashboard provides a real-time visualization of:

📈 Top 50 job skills demand

🏭 Industry-specific insights

📊 Growth trends in technical & soft skills

## 🤝 Contributing

Contributions are welcome!

Fork the repo

Create a new branch (feature/my-feature)

Commit changes

Push to your fork & submit a PR

## 📜 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by Altamash Khan
