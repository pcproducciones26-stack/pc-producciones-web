"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ConfigResponse =
  | { connected: false }
  | {
      connected: true;
      businessAccountId: string;
      tokenExpiresAt: string | null;
      lastSyncedAt: string | null;
    };

export function InstagramConnectionPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<ConfigResponse | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const status = searchParams.get("status");

  const loadConfig = () => {
    fetch("/api/admin/instagram/config")
      .then((res) => res.json())
      .then(setConfig);
  };

  useEffect(loadConfig, []);

  const onSync = async () => {
    setSyncing(true);
    setSyncMessage(null);
    const res = await fetch("/api/admin/instagram/sync", { method: "POST" });
    const body = await res.json();
    setSyncing(false);
    if (res.ok) {
      setSyncMessage(`Listo, se sincronizaron ${body.synced} fotos.`);
      loadConfig();
      router.refresh();
    } else {
      setSyncMessage(body.error ?? "No se pudo sincronizar");
    }
  };

  const onDisconnect = async () => {
    if (!confirm("¿Desconectar la cuenta de Instagram?")) return;
    await fetch("/api/admin/instagram/config", { method: "DELETE" });
    loadConfig();
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      {status === "connected" && (
        <p className="mb-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
          Cuenta de Instagram conectada correctamente.
        </p>
      )}
      {status === "error" && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          No se pudo conectar la cuenta. Probá de nuevo.
        </p>
      )}

      {!config && <p className="text-sm text-neutral-400">Cargando...</p>}

      {config && !config.connected && (
        <div>
          <p className="text-sm text-neutral-500">
            Todavía no conectaste una cuenta de Instagram. Una vez conectada,
            el feed se sincroniza automáticamente todos los días.
          </p>
          <a
            href="/api/admin/instagram/connect"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Conectar cuenta de Instagram
          </a>
        </div>
      )}

      {config && config.connected && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-neutral-500">
            Conectado (cuenta ID {config.businessAccountId}).
            {config.lastSyncedAt && (
              <>
                {" "}
                Última sincronización:{" "}
                {new Date(config.lastSyncedAt).toLocaleString("es-AR")}.
              </>
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onSync}
              disabled={syncing}
              className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
            >
              {syncing ? "Sincronizando..." : "Sincronizar ahora"}
            </button>
            <button
              type="button"
              onClick={onDisconnect}
              className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-500 hover:text-neutral-950"
            >
              Desconectar
            </button>
          </div>
          {syncMessage && (
            <p className="text-sm text-neutral-500">{syncMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}
