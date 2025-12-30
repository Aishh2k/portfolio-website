import Hero from "@/components/sections/Hero";
import Works from "@/components/sections/Works";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <Hero />
      <Works />
      <Footer />
    </main>
  );
}
