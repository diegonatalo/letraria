"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorScreenProps = {
  error: unknown;
  retry: () => void;
};

export const ErrorScreen = ({ error, retry }: ErrorScreenProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-screen place-items-center px-5">
      <main className="flex flex-col items-center text-center">
        <h1 className="font-display text-2xl text-slate-100 sm:text-3xl">Algo deu errado por aqui.</h1>
        <p className="mt-3 max-w-md text-slate-400">
          Esta obra encontrou um erro inesperado. Tente de novo ou volte à galeria.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-full border border-gold bg-gold/10 px-5 py-2 font-mono text-sm text-gold transition hover:bg-gold/20"
          >
            Tentar de novo
          </button>
          <Link
            href="/"
            className="rounded-full border border-gold/40 px-5 py-2 font-mono text-sm text-gold transition hover:border-gold hover:bg-gold/10"
          >
            ← Galeria
          </Link>
        </div>
      </main>
    </div>
  );
};
