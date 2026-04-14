import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MediaSection from "@/components/MediaSection";
import GigsSection from "@/components/GigsSection";
import BookingForm from "@/components/BookingForm";
import ArtistBio from "@/components/ArtistBio";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MediaSection />
        <GigsSection />
        <BookingForm />
        <ArtistBio />
      </main>
      <Footer />
    </>
  );
}
