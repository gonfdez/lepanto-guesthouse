// components/ui/TestimonialCard.tsx
import { FaStar } from "react-icons/fa";

interface TestimonialCardProps {
  text: string;
  author: string;
  location: string;
}

export default function TestimonialCard({
  text,
  author,
  location,
}: TestimonialCardProps) {
  return (
    <div className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-xl">
      <div className="text-yellow-400 flex mb-4">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
      <p className="text-gray-600 mb-4 italic">"{text}"</p>
      <div>
        <span className="font-semibold me-4">{author}</span>
        <span className="text-gray-500 text-sm">{location}</span>
      </div>
    </div>
  );
}
