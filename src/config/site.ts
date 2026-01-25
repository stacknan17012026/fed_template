export const siteConfig = {
  name: "FED Project",
  description:
    "Production-grade Next.js application with TypeScript, Tailwind CSS, and best practices",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "https://og-image.vercel.app",
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com",
    docs: "https://nextjs.org/docs",
  },
} as const;
