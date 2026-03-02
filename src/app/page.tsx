import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import SearchResults from "@/components/SearchResults";
import CustomerRequestForm from "@/components/CustomerRequestForm";
import TopRatedPros from "@/components/TopRatedPros";
import RecentRequests from "@/components/RecentRequests";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Home(props: any) {
  const session = await getSession();

  const searchParams = props.searchParams ? await props.searchParams : {};
  const q = searchParams.q;

  if (session?.user?.role === "PRO") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-white selection:bg-primary/20">
      <Navbar />
      <main>
        <Hero />
        {q ? <SearchResults q={q} /> : <CategoryGrid />}
        <CustomerRequestForm />
        <TopRatedPros />
        <RecentRequests />
      </main>
      <Footer />
    </div>
  );
}
