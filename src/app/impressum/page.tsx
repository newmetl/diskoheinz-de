import Link from "next/link";

export const metadata = {
  title: "Impressum | DISKOHEINZ",
};

export default function Impressum() {
  return (
    <div className="min-h-screen bg-surface text-on-surface px-6 py-24 max-w-3xl mx-auto">
      <Link
        href="/"
        className="text-on-surface-variant hover:text-white text-sm font-headline uppercase tracking-widest mb-12 block"
      >
        &larr; Back
      </Link>
      <h1 className="text-4xl font-headline font-bold text-white tracking-tighter uppercase mb-8">
        Impressum
      </h1>
      <div className="text-on-surface-variant space-y-4">
        <p>Angaben gemäß § 5 TMG</p>
        <p>
          [Name]
          <br />
          [Straße]
          <br />
          [PLZ Ort]
        </p>
        <p>
          <strong className="text-white">Kontakt:</strong>
          <br />
          E-Mail: booking@diskoheinz.de
        </p>
      </div>
    </div>
  );
}
