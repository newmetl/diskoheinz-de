import { notFound } from "next/navigation";
import GigForm from "@/components/admin/GigForm";
import { getGig } from "@/lib/db";
import { updateGigAction } from "../../actions";

export default async function EditGigPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gig = getGig(id);
  if (!gig) notFound();

  const boundAction = updateGigAction.bind(null, id);

  return (
    <div>
      <h1 className="text-3xl font-headline font-black uppercase tracking-tighter text-white mb-8">
        Edit gig
      </h1>
      <GigForm gig={gig} action={boundAction} submitLabel="Save" />
    </div>
  );
}
