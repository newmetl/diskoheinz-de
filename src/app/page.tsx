import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MediaSection from "@/components/MediaSection";
import GigsSection from "@/components/GigsSection";
import BookingForm from "@/components/BookingForm";
import ArtistBio from "@/components/ArtistBio";
import Footer from "@/components/Footer";
import { listGigs } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function Home() {
  const gigs = listGigs();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MediaSection />
        <GigsSection gigs={gigs} />
        <BookingForm />
        <ArtistBio />
      </main>
      <Footer />
    </>
  );
}
