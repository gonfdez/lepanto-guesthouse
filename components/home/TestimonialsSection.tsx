import TestimonialCard from "@/components/ui/TestimonialCard";
import { useTranslations } from 'next-intl';

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');

  const testimonials = [
    {
      text: t('reviews.maria.text'),
      author: t('reviews.maria.author'),
      location: t('reviews.maria.location'),
    },
    {
      text: t('reviews.john.text'),
      author: t('reviews.john.author'),
      location: t('reviews.john.location'),
    },
    {
      text: t('reviews.laura.text'),
      author: t('reviews.laura.author'),
      location: t('reviews.laura.location'),
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center pb-12">
          {t('sectionTitle')}
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