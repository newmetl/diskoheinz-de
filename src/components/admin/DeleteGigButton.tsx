"use client";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  gigTitle: string;
};

export function DeleteGigButton({ action, gigTitle }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (
          !confirm(
            `Gig „${gigTitle}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`,
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="px-4 py-2 border border-error/40 text-error text-[10px] font-bold uppercase tracking-widest hover:bg-error hover:text-white transition-all"
      >
        Delete
      </button>
    </form>
  );
}
