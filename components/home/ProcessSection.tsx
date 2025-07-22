import ProcessStep from "@/components/ui/ProcessStep";
import { useTranslations } from 'next-intl';

export default function ProcessSection() {
  const t = useTranslations('process');

  const steps = [
    {
      number: "1",
      title: t('steps.bookOnline.title'),
      description: t('steps.bookOnline.description'),
    },
    {
      number: "2",
      title: t('steps.digitalCheckin.title'),
      description: t('steps.digitalCheckin.description'),
    },
    {
      number: "3",
      title: t('steps.receiveCode.title'),
      description: t('steps.receiveCode.description'),
    },
    {
      number: "4",
      title: t('steps.enjoyStay.title'),
      description: t('steps.enjoyStay.description'),
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center pb-12">
          {t('sectionTitle')}
        </h2>

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