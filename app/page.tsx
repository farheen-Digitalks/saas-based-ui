import Image from "next/image";
import LoginPage from "./(auth)/login/page";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Navbar from "@/components/landing/Navbar";
import CTA from "@/components/landing/CTA";
import Pricing from "@/components/landing/pricing";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* <LoginPage /> */}
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Pricing />
    </div>
  );
}
