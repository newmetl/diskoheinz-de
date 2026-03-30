Diskoheinz – Website Konzept

Wie jedes Element technisch eingebunden wird
Dieses Dokument beschreibt für jedes Element auf der Startseite die konkrete Einbindung: Embed-Methode, Code-Beispiel, Konfiguration im Admin, und Fallback.

Übersicht: Elementtypen auf der Startseite
#	Element	Beispiel-Inhalt	Einbindung
1	Hero	Avatar, Name, Tagline, Social Icons	Statisch + Admin-Settings
2	Link-Buttons	Press Kit, Diskoverse, Diskologne, etc.	Dynamisch aus DB
3	SoundCloud Player	Einzelner Track oder Profil	iframe Embed
4	Spotify Embed	Track, Playlist	iframe Embed
5	YouTube Player	Playlist oder Einzelvideo	iframe Embed
6	Instagram Link	Profil-Link + Teaser	Einfacher Link (kein Embed)
7	Gigs (Upcoming/Past)	Event-Liste	Dynamisch aus DB/JSON
8	Booking-Formular	Kontaktformular	Formspree
9	Press Kit	PDF / Google Drive	Externer Link
1. Hero Section
Zweck: Erster Eindruck – Wer ist Diskoheinz?
Inhalte (aus Admin-Settings):
* Profilbild (statisches Asset oder Supabase Storage URL)
* Name: "DISKOHEINZ"
* Tagline: "Techno and house with a slice of disco, soul, and love."
* Social Icons → verlinken auf Plattform-Profile

Einbindung:
// Daten kommen aus einer settings-Tabelle oder einer lokalen JSON-Datei
const hero = {
  name: "DISKOHEINZ",
  tagline: "Techno and house with a slice of disco, soul, and love.",
  avatar: "/images/diskoheinz-avatar.jpg",
  socials: [
    { platform: "email", url: "mailto:booking@diskoheinz.de", icon: "Mail" },
    { platform: "soundcloud", url: "https://soundcloud.com/diskoheinz", icon: "SoundCloud" },
    { platform: "spotify", url: "https://open.spotify.com/artist/...", icon: "Spotify" },
    { platform: "instagram", url: "https://instagram.com/diskoheinz", icon: "Instagram" },
    { platform: "youtube", url: "https://youtube.com/playlist?list=PLu_PhkI5ea5sS2SCakYONpxvsPmWJH1vq", icon: "Youtube" },
  ]
};
Admin: Tagline und Social-URLs editierbar über Settings-Seite.

2. Link-Buttons (Linktree-Ersatz)
Zweck: Zentrale Verlinkung zu allen Kanälen und Projekten.
Aktuelle Links von der Linktree-Seite:
1. Diskoheinz Press Kit → Google Drive Folder
2. Join the Diskoverse → linktr.ee/diskoverse
3. Livemixes on YouTube → YouTube Playlist
4. Diskoheinz SoundCloud → SoundCloud Profil
5. Diskologne → diskologne.de
6. Disko Dynamite → Instagram @diskodynamite
7. Weekly Favorites → Spotify Playlist
Einbindung:
// Daten aus DB-Tabelle `links`
interface LinkButton {
  id: string;
  label: string;
  url: string;
  description?: string;   // Optionale Kurzbeschreibung unter dem Label
  sort_order: number;
  is_active: boolean;
}

// Rendering als gestapelte Buttons
{links.map(link => (
  <a href={link.url} target="_blank" rel="noopener noreferrer"
     className="link-button">
    <span className="link-label">{link.label}</span>
    {link.description && <span className="link-desc">{link.description}</span>}
  </a>
))}
Styling: Glassmorphism-Buttons (semi-transparent, backdrop-blur, Glow-Border on Hover).
Admin: CRUD-Interface – Links hinzufügen, bearbeiten, sortieren (Drag & Drop), aktivieren/deaktivieren.

3. SoundCloud Player
Zweck: Featured Track oder aktuellste Veröffentlichung direkt auf der Seite abspielen.
Methode: SoundCloud iframe Widget mit URL-Parametern.
Embed-Code:
// SoundCloud Widget – Track oder Playlist
// URL-Format: https://w.soundcloud.com/player/?url={TRACK_URL}&{PARAMS}

interface SoundCloudEmbed {
  url: string;      // z.B. "https://soundcloud.com/diskoheinz/sheryl-crow-all-i-wanna-do-diskoheinzs-aint-no-disko-extended-edit"
  title?: string;
}

const SoundCloudPlayer = ({ url, title }: SoundCloudEmbed) => (
  <div className="soundcloud-embed">
    {title && <h3>{title}</h3>}
    <iframe
      width="100%"
      height="166"
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff00aa&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`}
    />
  </div>
);
Parameter-Optionen:
Parameter	Wert	Effekt
color	%23ff00aa	Akzentfarbe (Neon-Magenta, passend zum Theme)
auto_play	false	Kein Auto-Play
hide_related	true	Keine fremden Tracks am Ende
show_comments	false	Kommentare ausblenden (cleaner Look)
show_user	true	"Diskoheinz" anzeigen
show_teaser	false	Kein Teaser für nicht eingeloggte User
visual	false	Kompakter Player (nicht Waveform-Fullsize)
Varianten:
* height="166" → Kompakter Single-Track-Player
* height="300" → Visual Player mit Artwork
* height="450" → Playlist-Player
Für Profil-Embed:
src="https://w.soundcloud.com/player/?url=https://soundcloud.com/diskoheinz&color=%23ff00aa&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
Admin: URL und Anzeige-Variante (Track / Playlist / Profil) über Media-Verwaltung änderbar. Es können mehrere SoundCloud-Embeds konfiguriert werden.

4. Spotify Embed
Zweck: Track oder Playlist direkt abspielen (30-Sekunden-Preview ohne Login, voller Zugriff für Spotify-User).
Methode: Spotify iframe Embed – keine API-Keys nötig.
URL-Schema:
Basis-URL: https://open.spotify.com/embed/{type}/{id}

Typen:
- /embed/track/{TRACK_ID}     → Einzelner Song
- /embed/playlist/{PLAYLIST_ID} → Playlist
- /embed/artist/{ARTIST_ID}    → Künstlerprofil
- /embed/album/{ALBUM_ID}      → Album
Embed-Code:
interface SpotifyEmbed {
  spotifyUrl: string;  // z.B. "https://open.spotify.com/track/3R42zAhyyVUCEyx1STqiFj"
  title?: string;
  height?: number;     // 152 (kompakt), 352 (standard), 80 (mini)
}

const SpotifyPlayer = ({ spotifyUrl, title, height = 152 }: SpotifyEmbed) => {
  // open.spotify.com/track/ID → open.spotify.com/embed/track/ID
  const embedUrl = spotifyUrl.replace("open.spotify.com/", "open.spotify.com/embed/");
  
  return (
    <div className="spotify-embed">
      {title && <h3>{title}</h3>}
      <iframe
        src={`${embedUrl}?utm_source=generator&theme=0`}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: "12px" }}
      />
    </div>
  );
};
Parameter:
Parameter	Wert	Effekt
theme	0	Dark Mode (passt zum Site-Theme)
utm_source	generator	Standard-Attribution
Höhen-Guide:
* 80px → Mini-Player (nur Play-Button + Titel)
* 152px → Kompakt (Standard für einzelne Tracks)
* 352px → Voll (Cover + Tracklist, ideal für Playlists)
Konkrete Einbindungen für Diskoheinz:
Track (Infuusio):
https://open.spotify.com/embed/track/3R42zAhyyVUCEyx1STqiFj?theme=0

Weekly Favorites Playlist:
https://open.spotify.com/embed/playlist/51FjTDkg5rs203WX1GiQ5p?theme=0
Admin: Spotify-URL eingeben, Embed-Typ (Track/Playlist) und Höhe wählen.

5. YouTube Player
Zweck: Livemixes und DJ-Sets direkt auf der Seite schauen.
Methode: YouTube iframe Embed (Standard). Player verwendet automatisch Dark Theme.
Embed-Code:
interface YouTubeEmbed {
  videoId?: string;     // Einzelnes Video: z.B. "dQw4w9WgXcQ"
  playlistId?: string;  // Playlist: z.B. "PLu_PhkI5ea5sS2SCakYONpxvsPmWJH1vq"
  title?: string;
}

const YouTubePlayer = ({ videoId, playlistId, title }: YouTubeEmbed) => {
  let src: string;
  
  if (playlistId) {
    // Playlist-Embed: Zeigt erstes Video + Playlist-Navigation
    src = `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1`;
  } else if (videoId) {
    // Einzelnes Video
    src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
  }
  
  return (
    <div className="youtube-embed">
      {title && <h3>{title}</h3>}
      <div className="aspect-video">
        <iframe
          src={src}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};
Wichtige Hinweise:
* youtube-nocookie.com statt youtube.com → DSGVO-freundlicher (keine Tracking-Cookies vor dem Abspielen)
* rel=0 → Keine empfohlenen Videos von Dritten am Ende
* modestbranding=1 → Minimales YouTube-Branding
* YouTube verwendet automatisch Dark Theme für alle HTML5-Player
Konkrete Einbindung für Diskoheinz:
Livemixes Playlist:
https://www.youtube-nocookie.com/embed/videoseries?list=PLu_PhkI5ea5sS2SCakYONpxvsPmWJH1vq&rel=0&modestbranding=1
Responsive Container:
.aspect-video {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
}
.aspect-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
Admin: YouTube-URL oder Video-ID / Playlist-ID eingeben. System erkennt automatisch ob Playlist oder Einzelvideo.

6. Instagram
Zweck: Verlinkung zum Instagram-Profil + visueller Teaser.
Option A: Einfacher Link (Empfohlen für MVP)
Kein Embed nötig – stattdessen ein ansprechend gestalteter Link-Button mit Instagram-Icon und Profilname.
const InstagramTeaser = () => (
  <a href="https://instagram.com/diskoheinz" 
     target="_blank" rel="noopener noreferrer"
     className="instagram-link">
    <InstagramIcon />
    <span>@diskoheinz</span>
    <span className="subtext">Follow on Instagram</span>
  </a>
);
Option B: Statische Bild-Preview (Nice-to-have)
Manuell gepflegte Bilder (3-6 Stück) in einem Grid, die zum Instagram-Profil verlinken. Bilder werden als Assets hinterlegt oder über Admin hochgeladen.
const InstagramGrid = ({ images }: { images: string[] }) => (
  <div className="instagram-section">
    <h2>Instagram</h2>
    <div className="grid grid-cols-3 gap-1">
      {images.map((src, i) => (
        <a key={i} href="https://instagram.com/diskoheinz" target="_blank">
          <img src={src} alt="Instagram Post" className="aspect-square object-cover" />
        </a>
      ))}
    </div>
    <a href="https://instagram.com/diskoheinz" className="follow-link">
      @diskoheinz auf Instagram
    </a>
  </div>
);
Option C: Instagram oEmbed API (Aufwändig)
Die Instagram oEmbed API (jetzt "Meta oEmbed Read") erfordert eine registrierte Facebook-App, App-Review und einen gültigen Access Token. Das ist für eine einfache DJ-Website unverhältnismäßig aufwändig.
Empfehlung: Option A (Link) für den Start, Option B (statische Bilder) als Upgrade. Option C nur, wenn ein automatischer Feed wirklich gewünscht ist.

7. Gigs Section
Zweck: Zeige kommende und vergangene Auftritte.
Datenmodell:
interface Gig {
  id: string;
  title: string;        // z.B. "Diskologne Night"
  venue: string;        // z.B. "Club Subway"
  city: string;         // z.B. "Cologne"
  date: string;         // ISO Date: "2026-04-12"
  time?: string;        // z.B. "23:00"
  event_url?: string;   // Link zu Event-Seite / Tickets
  flyer_url?: string;   // Optional: Flyer-Bild
}
Anzeige-Logik:
const today = new Date();
const upcoming = gigs.filter(g => new Date(g.date) >= today).sort((a, b) => +new Date(a.date) - +new Date(b.date));
const past = gigs.filter(g => new Date(g.date) < today).sort((a, b) => +new Date(b.date) - +new Date(a.date));
Rendering:
// Upcoming: Prominent, immer sichtbar
<section className="upcoming-gigs">
  <h2>Upcoming Gigs</h2>
  {upcoming.length === 0 
    ? <p>No upcoming gigs – stay tuned!</p>
    : upcoming.map(gig => <GigCard key={gig.id} gig={gig} variant="upcoming" />)
  }
</section>

// Past: Aufklappbar, standardmäßig eingeklappt
<details className="past-gigs">
  <summary>Past Gigs ({past.length})</summary>
  {past.map(gig => <GigCard key={gig.id} gig={gig} variant="past" />)}
</details>
GigCard-Varianten:
* Upcoming: Auffällig, mit Datum groß, Glow-Akzent, optional Link zu Tickets
* Past: Dezent, grau/transparent, kompakter
Datenquelle:
* DB-Tabelle mit Admin-CRUD
Admin: Gigs anlegen/bearbeiten/löschen. Felder: Titel, Venue, Stadt, Datum, Uhrzeit, Event-URL, Flyer-Upload. Status (upcoming/past) wird automatisch anhand des Datums bestimmt.

8. Booking-Formular (Formspree)
Zweck: Veranstalter können Booking-Anfragen einreichen, ohne dass ein eigenes Backend nötig ist.
Methode: Formspree – gehosteter Form-Backend-Service. Kein eigener Server nötig. Submissions werden per E-Mail an Diskoheinz gesendet und sind im Formspree-Dashboard einsehbar.
Setup
1. Account erstellen auf formspree.io (Free Tier: 50 Submissions/Monat)
2. Neues Formular anlegen → Formular-ID erhalten (z.B. xpzvkqwy)
3. Empfänger-E-Mail eintragen
Integration mit @formspree/react
npm install @formspree/react
import { useForm, ValidationError } from "@formspree/react";

const BookingForm = () => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID!);

  if (state.succeeded) {
    return (
      <div className="success-message">
        <h3>Danke für deine Anfrage!</h3>
        <p>Diskoheinz meldet sich bei dir.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Name / Organisation */}
      <input type="text" name="name" placeholder="Name / Organisation" required />
      <ValidationError field="name" errors={state.errors} />

      {/* E-Mail */}
      <input type="email" name="email" placeholder="E-Mail" required />
      <ValidationError field="email" errors={state.errors} />

      {/* Datum + Stadt (nebeneinander) */}
      <div className="grid grid-cols-2 gap-3">
        <input type="date" name="event_date" placeholder="Gewünschtes Datum" />
        <input type="text" name="city" placeholder="Stadt" />
      </div>

      {/* Location */}
      <input type="text" name="location" placeholder="Location / Venue" />

      {/* Event-Typ */}
      <select name="event_type" defaultValue="">
        <option value="" disabled>Art des Events</option>
        <option value="club">Club Night</option>
        <option value="festival">Festival</option>
        <option value="private">Private Event</option>
        <option value="corporate">Corporate Event</option>
        <option value="other">Sonstiges</option>
      </select>

      {/* Nachricht */}
      <textarea name="message" placeholder="Erzähl uns mehr über dein Event..." rows={4} />

      {/* Honeypot (Spam-Schutz) */}
      <input type="text" name="_gotcha" style={{ display: "none" }} />

      {/* Submit */}
      <button type="submit" disabled={state.submitting}>
        {state.submitting ? "Wird gesendet..." : "Anfrage senden"}
      </button>
    </form>
  );
};
.env.local
NEXT_PUBLIC_FORMSPREE_ID=xpzvkqwy

9. Press Kit
Zweck: Veranstalter und Medien können Profilbilder, Biografien und technische Rider herunterladen.
Aktuelle Lösung: Google Drive Ordner (Link)
Einbindung auf der Website: Externer Link (wie jetzt)
Einfacher Link-Button in der Links-Section, der zum Google Drive Ordner öffnet.

10. Layout-Zusammenfassung: Seitenstruktur
┌─────────────────────────────────────────┐
│  HERO                                   │
│  Avatar + Name + Tagline + Social Icons │
│  [BOOK ME] → scrollt zu #booking       │
├─────────────────────────────────────────┤
│  LINKS                                  │
│  ┌──────────────────────────────────┐   │
│  │ DISKOHEINZ PRESS KIT         →  │   │
│  │ JOIN THE DISKOVERSE          →  │   │
│  │ DISKOLOGNE                   →  │   │
│  │ DISKO DYNAMITE               →  │   │
│  │ WEEKLY FAVORITES (Spotify)   →  │   │
│  └──────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  MEDIA                                  │
│  ┌─────────────────────────────────┐    │
│  │  ▶ YouTube Livemix Playlist     │    │
│  │  (16:9 Responsive iframe)       │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  ♫ SoundCloud: Featured Track   │    │
│  │  (Kompakter Waveform-Player)    │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  ♫ Spotify: Latest Release      │    │
│  │  (Kompakter Player, Dark Theme) │    │
│  └─────────────────────────────────┘    │
├─────────────────────────────────────────┤
│  INSTAGRAM                              │
│  @diskoheinz → Link zum Profil          │
│  (Optional: Statisches Bild-Grid)       │
├─────────────────────────────────────────┤
│  GIGS                                   │
│  ┌─ Upcoming ───────────────────────┐   │
│  │ 12.04.2026 · Diskologne Night    │   │
│  │              Club Subway, Cologne │   │
│  │ 26.04.2026 · Warehouse Sessions  │   │
│  │              Artheater, Cologne   │   │
│  └──────────────────────────────────┘   │
│  ▸ Past Gigs (5) ← aufklappbar         │
├─────────────────────────────────────────┤
│  BOOKING  (id="booking")                │
│  "Wanna book Diskoheinz?"              │
│  [Formspree-Formular]                   │
│  Name · E-Mail · Datum · Stadt ·        │
│  Location · Event-Typ · Nachricht       │
│  [ANFRAGE SENDEN]                       │
├─────────────────────────────────────────┤
│  FOOTER                                 │
│  © 2026 Diskoheinz                      │
│  Impressum · Datenschutz                │
│  Social Icons (repeat)                  │
└─────────────────────────────────────────┘

11. Admin-Backend: Was wird wirklich gebraucht?
Durch den Einsatz von Formspree für das Booking-Formular reduziert sich der Umfang des Admin-Backends erheblich:
Feature	Lösung	Admin nötig?
Booking-Anfragen	Formspree Dashboard + E-Mail	❌ Kein eigenes Admin
Gigs verwalten	DB	✅ Einfaches CRUD
Links verwalten	DB	✅ Einfaches CRUD
Media-Embeds	DB	✅ URL-Felder editieren

Ansatz: DB + Admin-UI
Einfaches Admin-Panel:
/admin
  ├── /gigs       → Gig-Liste + Formular (Add/Edit/Delete)
  ├── /links      → Link-Liste + Sortierung
  ├── /media      → Embed-URLs editieren
  └── /settings   → Tagline, Social URLs
Auth: Nur Passwort, kein User-Management (in .env gesetzt)

12. DSGVO / Datenschutz-Hinweise
Durch die Einbettung externer Inhalte werden Daten an Drittanbieter übertragen:
Embed	Anbieter	DSGVO-Maßnahme
YouTube	Google	youtube-nocookie.com verwenden (reduziert Tracking)
SoundCloud	SoundCloud	Datenschutzhinweis erforderlich
Spotify	Spotify	Datenschutzhinweis erforderlich
Formspree	Formspree Inc.	AV-Vertrag prüfen, Hinweis im Formular
Empfehlung: Cookie-Consent-Banner (z.B. Klaro) einbauen, der vor dem Laden der iframes die Einwilligung einholt. Fallback: Platzhalter-Bild mit "Klick zum Laden"-Button.
Lazy-Loading-Pattern (DSGVO-konform):
const ConsentEmbed = ({ children, platform }) => {
  const [consented, setConsented] = useState(false);
  
  if (!consented) {
    return (
      <div className="consent-placeholder" onClick={() => setConsented(true)}>
        <p>Klick um {platform}-Inhalte zu laden.</p>
        <p className="small">Dabei werden Daten an {platform} übertragen.</p>
      </div>
    );
  }
  
  return children;
};

13. Zusammenfassung: Tech-Stack (aktualisiert)
Framework:       Next.js 15 (App Router, Static Generation)
Styling:         Tailwind CSS
Animationen:     Framer Motion (Laser-Effekte, Scroll-Reveals)
Forms:           Formspree (@formspree/react)
Daten:           DB
Embeds:          YouTube iframe, SoundCloud iframe, Spotify iframe
Instagram:       Einfacher Link (kein API-Aufwand)
Hosting:         Hostinger Containerisiert
Domain:          diskoheinz.de
DSGVO:           youtube-nocookie.com, Consent-Platzhalter, Impressum/Datenschutz

Dokument erstellt am 30.03.2026 – Integrationsdetails für Claude Code.
