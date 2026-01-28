import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import Pricing from "@/components/landing/pricing";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* <Navbar /> */}
      <Hero />
      <Features />
      <Pricing />
      <CTA />
    </div>
  );
}
