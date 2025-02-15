# **PromptTown**  

**PromptTown** is a platform where users can easily add and find useful prompts for AI searches. It helps users discover well-structured prompts to improve AI interactions efficiently.  

## **🚀 Features**  
- 🔍 Search for AI prompts easily  
- ➕ Add your own prompts  
- 📂 Categorized prompt listings  
- 🔐 Secure authentication using Clerk  
- 📊 Backend powered by Supabase  

## **🛠 Tech Stack**  
- **Frontend:** Next.js, React, TailwindCSS  
- **Backend:** Supabase  
- **Authentication:** Clerk  
- **Deployment:** Vercel  

## **📦 Installation & Setup**  

1. **Clone the repository**  
   ```sh
   git clone https://github.com/your-username/prompttown.git
   cd prompttown
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. Set up environment variables**  
   Create a `.env.local` file and add the required keys:  
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   ```

4. **Run the development server**  
   ```sh
   npm run dev
   ```
   Open **http://localhost:3000** in your browser.

## **🚀 Deployment**  
- The project is deployed on **Vercel**.  
- To deploy, push your code to GitHub, then link your repository to Vercel.  
- Run:  
  ```sh
  vercel deploy
  ```

## **📜 License**  
This project is **MIT Licensed**.  

