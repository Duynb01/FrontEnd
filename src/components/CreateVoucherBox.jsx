import { createVoucher } from "@/lib/api/apiVoucher";
import { validateFormVoucher } from "@/utils/isValidData";
import { set } from "date-fns";
import { Loader, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateVoucherBox({ onClick, fetchVoucher }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    code: "",
    discount: "",
    startDate: "",
    expiryDate: "",
    type: "percent",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errs = validateFormVoucher(form);
    if (errs.length > 0) {
      errs.forEach((error) => toast.error(error));
      return setIsLoading(false);
    }
    try {
      const data = await createVoucher(form);
      fetchVoucher();
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      onClick();
    }
  };
  return (
    <div className=" bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold ">Tạo mã giảm giá</h2>
        <button type="button" onClick={onClick}>
          <XCircle className="w-5 h-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium">Tên</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tên mã giảm giá"
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mã giảm giá</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="VÍ DỤ: SALE50"
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium">
              Giảm (%) hoặc Số tiền
            </label>
            <input
              name="discount"
              value={form.discount}
              onChange={handleChange}
              placeholder="Ví dụ: 20 hoặc 50000"
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Hình thức</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
            >
              <option value="percent">Phần trăm (%)</option>
              <option value="fixed">Số tiền cố định</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium">Ngày bắt đầu</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Ngày kết thúc</label>
            <input
              type="date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
            </>
          ) : (
            "Tạo Voucher"
          )}
        </button>
      </form>
    </div>
  );
}
