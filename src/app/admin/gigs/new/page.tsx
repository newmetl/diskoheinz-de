import GigForm from "@/components/admin/GigForm";
import { createGigAction } from "../../actions";

export default function NewGigPage() {
  return (
    <div>
      <h1 className="text-3xl font-headline font-black uppercase tracking-tighter text-white mb-8">
        New gig
      </h1>
      <GigForm action={createGigAction} submitLabel="Create" />
    </div>
  );
}
