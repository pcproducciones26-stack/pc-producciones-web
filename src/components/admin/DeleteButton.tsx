"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  endpoint: string;
  confirmMessage: string;
};

export function DeleteButton({ endpoint, confirmMessage }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    if (!confirm(confirmMessage)) return;
    setLoading(true);
    const res = await fetch(endpoint, { method: "DELETE" });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      alert("No se pudo eliminar");
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
