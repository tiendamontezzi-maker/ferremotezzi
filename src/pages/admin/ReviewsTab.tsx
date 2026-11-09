import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { Star, CheckCircle2, MessageSquare, ThumbsUp } from 'lucide-react';

export const ReviewsTab: React.FC = () => {
  const { reviews, products } = useProducts();

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  return (
    <div className="space-y-6 font-sans">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Average Customer Rating</span>
            <div className="w-8 h-8 rounded-full bg-[#FFF6E9] text-[#B45309] flex items-center justify-center">
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {avgRating} <span className="text-sm font-normal text-[#71717A]">/ 5.0</span>
          </div>
          <div className="text-[11px] font-medium text-[#10B981]">
            100% verified architectural clients
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Total Reviews</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF4FF] text-[#0284C7] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18181B] tracking-tight my-1">
            {reviews.length}
          </div>
          <div className="text-[11px] font-medium text-[#71717A]">
            Published product evaluations
          </div>
        </div>

        <div className="bg-white border border-[#EAE7E1] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#18181B]">Satisfaction Score</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF8F0] text-[#059669] flex items-center justify-center">
              <ThumbsUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#10B981] tracking-tight my-1">
            98.4%
          </div>
          <div className="text-[11px] font-medium text-[#71717A]">
            Would recommend Montezzi hardware
          </div>
        </div>
      </div>

      {/* Reviews Grid with Product Thumbnail Photo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((rev, idx) => {
          const reviewedProduct =
            products.find(p => p.id === rev.product_id) ||
            products[idx % Math.max(products.length, 1)];

          return (
            <div
              key={rev.id}
              className="bg-white border border-[#EAE7E1] rounded-2xl p-5 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Reviewed Product Strip with Thumbnail Photo */}
                {reviewedProduct && (
                  <div className="flex items-center justify-between gap-3 bg-[#FAF9F7] border border-[#EAE7E1] rounded-xl p-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={reviewedProduct.image_url || '/images/products/kdj-60.jpg'}
                        alt={reviewedProduct.name}
                        className="w-10 h-10 rounded-lg object-contain bg-white border border-[#EAE7E1] p-1 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80';
                        }}
                      />
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] font-semibold text-[#18181B] bg-white px-2 py-0.5 rounded border border-black/5">
                          {reviewedProduct.code}
                        </span>
                        <div className="text-xs font-semibold text-[#18181B] truncate mt-0.5">
                          {reviewedProduct.name}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold capitalize px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#10B981] shrink-0 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {rev.status}
                    </span>
                  </div>
                )}

                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= rev.rating ? 'fill-current text-amber-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-[#18181B] ml-1.5">
                    {rev.rating}.0
                  </span>
                </div>

                {/* Review Content */}
                <div>
                  <h4 className="font-sans font-bold text-sm text-[#18181B] normal-case">
                    {rev.title || 'Excelente acabado y mecanismo silencioso'}
                  </h4>
                  <p className="text-xs text-[#71717A] mt-1 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F4F4F5] flex items-center justify-between text-xs text-[#71717A]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center text-[10px] font-bold text-[#18181B]">
                    {rev.user_name.charAt(0)}
                  </div>
                  <span className="font-semibold text-[#18181B]">{rev.user_name}</span>
                </div>
                <span className="font-sans text-[11px] text-[#A1A1AA]">
                  {new Date(rev.created_at).toLocaleDateString('es-CO', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
