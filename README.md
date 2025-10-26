# InterviewScore 🎯

A standardized interview evaluation system for technical intern positions. InterviewScore helps interview panels consistently assess candidates across Backend Developer, Frontend Developer, and Fullstack (SE Intern) roles with weighted scoring criteria.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)

## 📋 Features

- **Role-Specific Evaluation Criteria** - Tailored scoring for Backend, Frontend, and Fullstack positions
- **Weighted Scoring System** - 5 main categories with customizable weights
- **Automated Grading** - Instant grade calculation (A, B, C, D) with hiring recommendations
- **Candidate Management** - Save, compare, and track multiple candidates
- **CSV Export** - Export evaluation results for record-keeping and analysis
- **Real-time Calculations** - Live score updates as you evaluate
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🎓 Grading System

| Grade | Score Range | Decision | Action |
|-------|-------------|----------|--------|
| **A** | 85-100 | Strong Hire | Make offer immediately |
| **B** | 70-84 | Hire | Proceed with offer |
| **C** | 55-69 | Maybe | Team discussion needed |
| **D** | 0-54 | No Hire | Politely decline |

## 📊 Evaluation Categories

### Backend Developer
- **Technical Skills** (35%) - DSA, Databases, APIs, Server-side languages
- **Problem Solving** (25%) - Analytical thinking, Coding challenges
- **Theoretical Knowledge** (15%) - System design, Security
- **Communication & Soft Skills** (15%) - Technical communication, Collaboration
- **Learning & Attitude** (10%) - Willingness to learn, Initiative

### Frontend Developer
- **Technical Skills** (35%) - HTML/CSS, JavaScript/Frameworks, Responsive design, UI/UX
- **Problem Solving** (25%) - UI problem solving, Coding challenges
- **Theoretical Knowledge** (15%) - Performance optimization, Accessibility
- **Communication & Soft Skills** (15%) - Design communication, Collaboration
- **Learning & Attitude** (10%) - Willingness to learn, Initiative

### SE Intern (Fullstack)
- **Technical Skills** (40%) - Frontend/Backend tech, Databases, APIs, Git
- **Problem Solving** (25%) - End-to-end thinking, Coding challenges
- **Theoretical Knowledge** (15%) - Full stack architecture, DevOps basics
- **Communication & Soft Skills** (12%) - Cross-functional communication, Collaboration
- **Learning & Attitude** (8%) - Adaptability, Initiative

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/interview-score.git
   cd interview-score
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Tailwind CSS**
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

4. **Install lucide-react for icons**
   ```bash
   npm install lucide-react
   ```

5. **Configure Tailwind**
   
   Create/update `vite.config.js`:
   ```javascript
   import { defineConfig } from "vite";   
   import react from "@vitejs/plugin-react-swc";
   import tailwindcss from "@tailwindcss/vite";

   export default defineConfig({
     plugins: [react(), tailwindcss()],
    });
   ```

6. **Add Tailwind directives to your CSS**
   
   In `src/index.css`:
   ```css
   @import "tailwindcss";
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 🎯 Usage

1. **Select the role** you're interviewing for (Backend, Frontend, or Fullstack)
2. **Enter the candidate's name**
3. **Score each criterion** based on interview performance (use 0.5 increments for precision)
4. **Review the total score** and automated recommendation
5. **Save the candidate** to compare with others
6. **Export results** to CSV when you're done evaluating all candidates

## 🛠️ Tech Stack

- **React** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## 📁 Project Structure

```
interview-score/
├── src
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Nisal Mallawaarachchi - [@NisalMallawaarachchi](https://github.com/NisalMallawaarachchi)


## 🙏 Acknowledgments

- Inspired by the need for standardized technical interview evaluations
- Built for fair and consistent candidate assessment
- Designed for interview panels of all sizes


## 🔄 Changelog

### Version 1.0.0 (2025-01-XX)
- Initial release
- Role-specific evaluation criteria
- Weighted scoring system
- CSV export functionality
- Responsive design

---

**Made with ❤️ for better hiring decisions**
