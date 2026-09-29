import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { InstagramPostForm } from "@/components/admin/InstagramPostForm";

function toDateInput(date: Date | null) {
  return date ? date.toISOString().slice(0, 10) : "";
}

export default async function EditInstagramPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.instagramPost.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  return (
    <div>
      <AdminHeader active="instagram" />

      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-bold text-neutral-950">
          Editar foto de Eventos pasados
        </h1>

        <div className="mt-8">
          <InstagramPostForm
            postId={post.id}
            defaultValues={{
              imageUrl: post.imageUrl,
              postUrl: post.postUrl ?? "",
              caption: post.caption ?? "",
              eventDate: toDateInput(post.eventDate),
              venue: post.venue ?? "",
              city: post.city ?? "",
            }}
          />
        </div>
      </div>
    </div>
  );
}
