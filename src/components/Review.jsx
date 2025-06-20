"use client";
import { createReview, getReview } from "@/lib/api/apiReview";
import { User } from "lucide-react";
import { formatDate } from "@/utils/formatData";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Review({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [data, setData] = useState({
    content: "",
    rating: 5,
  });

  const fetchData = async () => {
    try {
      const data = await getReview(productId);
      setReviews(data);
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!data.content.trim()) return;
    const newReview = {
      ...data,
      productId,
    };
    try {
      await createReview(newReview);
      fetchData();
    } catch (err) {
      toast.warning(err.message);
    }
    setData({
      content: "",
      rating: 5,
    });
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Gửi đánh giá cho sản phẩm</h3>

      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setData({ ...data, rating: star })}
            className={`text-xl ${
              star <= data.rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={data.content}
        onChange={(e) => setData({ ...data, content: e.target.value })}
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

      {reviews.length > 0 ? (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-1">Đánh giá gần đây:</h4>
          {reviews.map((r, i) => (
            <div key={i} className="mb-2 p-2 border rounded-sm bg-gray-50">
              <div className="flex justify-between">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <User />
                    {r.user}
                  </div>
                  <div className="text-yellow-500 text-sm">
                    {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
                  </div>
                </div>
                <div>{formatDate(r.createdAt)}</div>
              </div>
              <p className="text-sm text-gray-700">{r.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <h4 className="text-md font-medium mb-1">Chưa có đánh giá nào</h4>
        </div>
      )}
    </div>
  );
}
