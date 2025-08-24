import { createVoucher } from "@/lib/api/apiVoucher";
import {
  validateFormVoucher,
  validFormCreateProduct,
} from "@/utils/isValidData";
// import { set } from "date-fns";
import { Loader, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductDescription from "./ProductDescription";
import { createProduct, createUrlImage } from "@/lib/api/apiProduct";
import { useSelector } from "react-redux";

export default function CreateProductBox({ onClick, fetchProduct }) {
  const categories = useSelector((state) => state.category);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: null,
    description: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      const file = e.target.files[0];
      if (file) {
        if (preview) URL.revokeObjectURL(preview);
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        setForm((prev) => ({ ...prev, image: file }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      name: form.name,
      price: parseInt(form.price, 10),
      stock: parseInt(form.stock, 10),
      category: form.category,
      description: form.description,
    };
    const errs = validFormCreateProduct(formData);
    if (errs.length > 0) {
      errs.forEach((error) => toast.error(error));
      return setIsLoading(false);
    }
    try {
      const urlImage = await createUrlImage(form.image);
      const payload = {
        ...formData,
        url: urlImage.url,
      };
      await createProduct(payload);
      fetchProduct();
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      onClick();
    }
  };
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className=" bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold ">Thêm sản phẩm</h2>
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
              placeholder="Tên sản phẩm"
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Danh mục</label>
            <select
              className="mt-1 w-full p-2 border rounded"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="" hidden disabled></option>
              {categories.map((category) => (
                <option key={category.name} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium">Giá</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Ví dụ: 20 hoặc 50000"
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Số lượng</label>
            <input
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="VÍ DỤ: 10"
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1">
          <label className="block text-sm font-medium">Mô tả</label>

          <ProductDescription
            value={form.description}
            onChange={(value) => setForm({ ...form, description: value })}
          />
        </div>

        <div className="grid grid-cols-1">
          <label className="block text-sm font-medium">Hình ảnh</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="border p-1 rounded-sm"
          />
          {preview && (
            <div className="mt-4 relative inline-block">
              <img
                src={preview}
                alt="preview"
                className="w-48 h-48 object-cover rounded-lg shadow"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 mx-auto w-[20%] text-center bg-main text-white py-2 rounded hover:bg-discount"
        >
          {isLoading ? (
            <div className="flex justify-center ">
              <Loader className="w-4 h-4 animate-spin text-white" />
            </div>
          ) : (
            "Thêm sản phẩm"
          )}
        </button>
      </form>
    </div>
  );
}
