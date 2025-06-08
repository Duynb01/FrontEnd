"use client";
import { useState } from "react";

export default function Review({ productId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = () => {
    if (!comment.trim()) return;

    const newReview = {
      productId,
      rating,
      comment,
      createdAt: new Date(),
    };

    // Tạm thời thêm vào local
    setReviews((prev) => [...prev, newReview]);

    // Reset form
    setComment("");
    setRating(5);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Gửi đánh giá cho sản phẩm</h3>

      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-xl ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-2 rounded-sm text-sm mb-2"
        placeholder="Viết đánh giá của bạn..."
        rows={3}
      />

      <button
        onClick={handleSubmit}
        className="bg-main text-white px-4 py-2 rounded-sm hover:bg-[#67031c]"
      >
        Gửi đánh giá
      </button>

      {reviews.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-1">Đánh giá gần đây:</h4>
          {reviews.map((r, i) => (
            <div key={i} className="mb-2 p-2 border rounded-sm bg-gray-50">
              <div className="text-yellow-500 text-sm">
                {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
              </div>
              <p className="text-sm text-gray-700">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
