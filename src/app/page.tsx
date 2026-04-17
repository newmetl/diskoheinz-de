import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MediaSection from "@/components/MediaSection";
import GigsSection from "@/components/GigsSection";
import BookingForm from "@/components/BookingForm";
import ArtistBio from "@/components/ArtistBio";
import Footer from "@/components/Footer";
import { getSetting, listGigs } from "@/lib/db";
import { SETTING_YT_THUMBNAIL } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default function Home() {
  const gigs = listGigs();
  const youtubeThumbnailVideoId =
    getSetting(SETTING_YT_THUMBNAIL) ?? undefined;
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MediaSection youtubeThumbnailVideoId={youtubeThumbnailVideoId} />
        <GigsSection gigs={gigs} />
        <BookingForm />
        <ArtistBio />
      </main>
      <Footer />
    </>
  );
}
