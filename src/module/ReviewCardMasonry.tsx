import { FaStar } from "react-icons/fa";

interface Review {
  quote: string;
  name: string;
  role: string;
  date: string;
  star: number;
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 relative group cursor-pointer">
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, idx) => (
          <FaStar
            key={idx}
            className={
              idx < review.star
                ? "text-aspac-yellow mr-1"
                : "text-gray-300 mr-1"
            }
          />
        ))}
      </div>


      <div
        className="
        max-h-[90px]
          md:max-h-[120px]
          overflow-hidden
          group-hover:max-h-[600px]
          transition-all
          duration-500
        "
      >
        <p className="text-gray-700 italic md:leading-relaxed text-sm md:text-normal">
          "{review.quote}"
        </p>
      </div>


      <div className="mt-4 md:mt-5 border-t border-gray-200 pt-2 md:pt-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="md:font-semibold text-primary-dark">
              {review.name}
            </p>

            <p className="text-sm text-gray-500">
              {review.role}
            </p>
          </div>

          <span className="text-xs text-gray-500">
            {review.date}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}