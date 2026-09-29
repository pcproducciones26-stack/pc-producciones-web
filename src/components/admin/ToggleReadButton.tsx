"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ToggleReadButton({ id, read }: { id: string; read: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onToggle = async () => {
    setLoading(true);
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !read }),
    });
    setLoading(false);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={loading}
      className="text-sm font-medium text-neutral-950 hover:opacity-70 disabled:opacity-50"
    >
      {read ? "Marcar como no leído" : "Marcar como leído"}
    </button>
  );
}
