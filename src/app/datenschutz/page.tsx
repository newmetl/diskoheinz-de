import Link from "next/link";

export const metadata = {
  title: "Datenschutz | DISKOHEINZ",
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-surface text-on-surface px-6 py-24 max-w-3xl mx-auto">
      <Link
        href="/"
        className="text-on-surface-variant hover:text-white text-sm font-headline uppercase tracking-widest mb-12 block"
      >
        &larr; Back
      </Link>
      <h1 className="text-4xl font-headline font-bold text-white tracking-tighter uppercase mb-8">
        Datenschutz
      </h1>
      <div className="text-on-surface-variant space-y-6 leading-relaxed">
        <h2 className="text-xl font-headline font-bold text-white mt-8">
          1. Verantwortlicher
        </h2>
        <p>[Name und Kontaktdaten des Verantwortlichen]</p>

        <h2 className="text-xl font-headline font-bold text-white mt-8">
          2. Eingebettete Inhalte
        </h2>
        <p>
          Diese Website bindet Inhalte von Drittanbietern ein (YouTube,
          SoundCloud, Spotify). Diese Inhalte werden erst nach Ihrer
          Einwilligung geladen. Beim Laden werden Daten an den jeweiligen
          Anbieter übertragen.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-white">YouTube:</strong> Es wird
            youtube-nocookie.com verwendet, um das Tracking vor dem Abspielen zu
            minimieren.
          </li>
          <li>
            <strong className="text-white">SoundCloud:</strong> Beim Laden des
            Players werden Daten an SoundCloud übertragen.
          </li>
          <li>
            <strong className="text-white">Spotify:</strong> Beim Laden des
            Players werden Daten an Spotify übertragen.
          </li>
        </ul>

        <h2 className="text-xl font-headline font-bold text-white mt-8">
          3. Kontaktformular
        </h2>
        <p>
          Das Booking-Formular wird über Formspree (Formspree Inc.)
          verarbeitet. Bei Absenden werden Ihre Daten an Formspree übertragen
          und per E-Mail weitergeleitet.
        </p>

        <h2 className="text-xl font-headline font-bold text-white mt-8">
          4. Hosting
        </h2>
        <p>[Hosting-Anbieter und Details]</p>
      </div>
    </div>
  );
}
