// components/home/ProcessSection.tsx
import ProcessStep from "@/components/ui/ProcessStep";

export default function ProcessSection() {
  const steps = [
    {
      number: "1",
      title: "Reserva online",
      description:
        "Selecciona tu habitación y fechas a través de nuestro sistema de reservas.",
    },
    {
      number: "2",
      title: "Check-in digital",
      description:
        "Realiza el check-in digital desde tu móvil, sin necesidad de esperar en la recepción.",
    },
    {
      number: "3",
      title: "Recibe tu código",
      description:
        "Después de hacer el check-in, recibirás un código único para acceder a tu habitación.",
    },
    {
      number: "4",
      title: "Disfruta tu estancia",
      description: "Relájate y disfruta de tu estancia con total privacidad.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Cómo funciona</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
