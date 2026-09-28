"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteEventButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    if (!confirm(`¿Eliminar el evento "${title}"? Esta acción no se puede deshacer.`)) {
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      alert("No se pudo eliminar el evento");
    }
  };

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={loading}
      className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      {loading ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
