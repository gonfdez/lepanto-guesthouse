// components/home/TestimonialsSection.tsx
import TestimonialCard from "@/components/ui/TestimonialCard";

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "La experiencia con las cerraduras inteligentes fue perfecta. Llegamos tarde y pudimos entrar sin problemas.",
      author: "María García",
      location: "España",
    },
    {
      text: "Habitaciones muy limpias y modernas. La ubicación es perfecta para explorar la isla.",
      author: "John Smith",
      location: "Reino Unido",
    },
    {
      text: "El sistema automatizado hizo que nuestra estancia fuera muy cómoda. Definitivamente volveremos.",
      author: "Laura Bianchi",
      location: "Italia",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Lo que dicen nuestros huéspedes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              text={testimonial.text}
              author={testimonial.author}
              location={testimonial.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
