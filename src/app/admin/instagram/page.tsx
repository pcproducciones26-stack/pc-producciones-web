import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { InstagramConnectionPanel } from "@/components/admin/InstagramConnectionPanel";
import { AddInstagramPostForm } from "@/components/admin/AddInstagramPostForm";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function InstagramAdminPage() {
  const posts = await prisma.instagramPost.findMany({
    orderBy: { postedAt: "desc" },
  });

  return (
    <div>
      <AdminHeader active="instagram" />

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Instagram</h1>
          <p className="text-sm text-neutral-500">
            Estas fotos son las que se muestran en la home, en la sección
            &quot;Eventos pasados&quot;. Conectá tu cuenta para que se
            carguen solas todos los días, o agregalas a mano abajo (la
            descripción que pongas aparece arriba de la foto).
          </p>
        </div>

        <div className="mt-6">
          <Suspense fallback={null}>
            <InstagramConnectionPanel />
          </Suspense>
        </div>

        <h2 className="mt-10 text-lg font-semibold text-neutral-950">
          Agregar foto manualmente
        </h2>
        <div className="mt-3">
          <AddInstagramPostForm />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <div className="relative aspect-square bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt={post.caption ?? ""}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-2">
                {post.postUrl ? (
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-xs font-medium text-neutral-500 hover:text-neutral-950"
                  >
                    Ver post
                  </a>
                ) : (
                  <span />
                )}
                <DeleteButton
                  endpoint={`/api/admin/instagram-posts/${post.id}`}
                  confirmMessage="¿Eliminar esta foto de la galería?"
                />
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <p className="col-span-full py-10 text-center text-neutral-400">
              Todavía no hay fotos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
