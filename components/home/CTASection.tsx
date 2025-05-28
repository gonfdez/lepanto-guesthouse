// components/home/CTASection.tsx
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-16 bg-primary-600 text-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          ¿Listo para vivir la experiencia?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Reserva ahora y disfruta de una estancia inolvidable.
        </p>
        <Link
          href="/booking"
          className="inline-block border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-6 py-2 rounded-md transition-colors"
        >
          Reservar ahora
        </Link>
      </div>
    </section>
  );
}
