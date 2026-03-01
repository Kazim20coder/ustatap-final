import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import CustomerRequestForm from "@/components/CustomerRequestForm";
import TopRatedPros from "@/components/TopRatedPros";
import RecentRequests from "@/components/RecentRequests";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session?.user?.role === "PRO") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-white selection:bg-primary/20">
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <CustomerRequestForm />
        <TopRatedPros />
        <RecentRequests />
      </main>
      <Footer />
    </div>
  );
}
