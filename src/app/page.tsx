import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LinkButtons from "@/components/LinkButtons";
import MediaSection from "@/components/MediaSection";
import GigsSection from "@/components/GigsSection";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LinkButtons />
        <MediaSection />
        <GigsSection />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
