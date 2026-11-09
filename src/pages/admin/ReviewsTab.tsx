import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { Star, CheckCircle2, MessageSquare, ThumbsUp, User } from 'lucide-react';

export const ReviewsTab: React.FC = () => {
  const { reviews } = useProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-sans text-[#18181B] tracking-tight">
            Customer Reviews & Ratings
          </h2>
          <p className="text-xs text-[#71717A] mt-0.5">
            Verified opinions and satisfaction ratings from architects, designers, and clients
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= rev.rating ? 'fill-current text-amber-400' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]">
                {rev.status}
              </span>
            </div>

            <div>
              <h4 className="font-sans font-bold text-sm text-[#18181B]">
                {rev.title || 'Calificación del producto'}
              </h4>
              <p className="text-xs text-[#71717A] mt-1 leading-relaxed">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-2 border-t border-[#F4F4F5] flex items-center justify-between text-xs text-[#71717A]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center text-[10px] font-bold text-black">
                  {rev.user_name.charAt(0)}
                </div>
                <span className="font-medium text-[#18181B]">{rev.user_name}</span>
              </div>
              <span className="font-mono text-[10px] text-[#A1A1AA]">
                {new Date(rev.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
