// app/not-found.tsx
'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-16">
      <h1 className="text-4xl font-semibold mb-4">Estamos trabajando en ello 🛠️</h1>
      <p className="text-lg text-gray-600 mb-6">
        Esta página aún no está disponible. Vuelve más tarde.
      </p>
      <Link href="/" className="text-blue-500 underline">
        Volver al inicio
      </Link>
    </section>
  );
}
