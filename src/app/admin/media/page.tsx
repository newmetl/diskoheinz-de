import MediaForm from "@/components/admin/MediaForm";
import { getSetting } from "@/lib/db";
import { SETTING_YT_THUMBNAIL } from "@/lib/settings";
import { updateYoutubeThumbnailAction } from "../actions";

export default function MediaAdminPage() {
  const currentVideoId = getSetting(SETTING_YT_THUMBNAIL) ?? undefined;

  return (
    <div>
      <h1 className="text-3xl font-headline font-black uppercase tracking-tighter text-white mb-8">
        Media
      </h1>

      <section className="mb-4">
        <h2 className="text-xs uppercase tracking-widest text-on-surface-variant mb-4">
          YouTube Thumbnail
        </h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Bestimmt das Vorschaubild, das im YouTube-Consent-Overlay auf der Startseite
          angezeigt wird, bevor der User dem Einbetten zustimmt.
        </p>
        <MediaForm
          action={updateYoutubeThumbnailAction}
          currentVideoId={currentVideoId}
        />
      </section>
    </div>
  );
}
