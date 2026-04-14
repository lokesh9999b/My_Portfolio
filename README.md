# My Portfolio

A modern, dynamic personal portfolio website built with React, TypeScript, and Tailwind CSS. This portfolio features a stunning space-themed background, smooth scroll animations, and a comprehensive showcase of my skills, projects, and contact information.

## Features

- **🚀 Dynamic Hero Section**: Features a typing animation for my name and a captivating space-themed canvas background with animated stars and shooting stars.
- **✨ Smooth Scroll Animations**: Utilizes a custom hook `useScrollAnimation` to reveal sections with elegant fade-in and slide-up effects.
- **🎨 Modern Design**: Built with Tailwind CSS, offering a responsive, glassmorphism-inspired UI.
- **📧 Contact Form**: A fully functional contact form that integrates with Supabase to store messages in a database.
- **📂 Project Showcase**: Detailed cards for each project with descriptions, tech stacks, and links.
- **🛠️ Tech Stack Display**: A dedicated section to highlight my technical skills and expertise.
- **🔗 Social Links**: Easy access to my GitHub, LinkedIn, and Twitter profiles.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Custom Scroll Animations, Canvas API
- **Backend**: Supabase (for contact form submissions)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd My_Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure Supabase (Optional):
   - Create a `.env` file in the root directory.
   - Add your Supabase credentials:
     ```env
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Project Structure

```
src/
├── components/      # Reusable UI components (Hero, Navbar, Projects, etc.)
├── hooks/           # Custom React hooks (useScrollAnimation)
├── lib/             # Library code (Supabase client)
├── pages/           # (If applicable, though currently using direct imports)
├── App.tsx          # Main application component
├── index.tsx        # Entry point
└── index.css        # Global styles
```

## Deployment

To build the project for production:

```bash
npm run build
# or
yarn build
```

Then serve the contents of the `dist` folder.

## License

This project is licensed under the MIT License.