import {
  Edit,
  Filter,
  Plus,
  Trash2,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import ButtonToggle from "../ButtonToggle";
import Image from "next/image";
import CreateProductBox from "../CreateProductBox";
import { updateProduct, deleteProduct } from "@/lib/api/apiProduct";
import { toast } from "react-toastify";

export default function ProductTab({ fetchProduct }) {
  const [products, setProducts] = useState([]);
  const statuses = ["Active", "Inactive"];
  const fetchData = async () => {
    try {
      const data = await fetchProduct();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fetchProduct]);

  const [editingId, setEditingId] = useState(null);
  const [data, setData] = useState({
    price: "0",
    stock: "0",
  });

  const handleEdit = (product) => {
    setEditingId(product.id);
    setData((prev) => ({
      ...prev,
      price: product.price.toString(),
      stock: product.stock.toString(),
    }));
  };
  const handleSave = async (product) => {
    const params = {
      id: product.id,
      edit: data,
    };
    try {
      await updateProduct(params);
      toast.success("Cập nhật thành công");
      fetchData();
    } catch (err) {
      toast.error(err.message || "Cập nhật thất bại");
    } finally {
      setEditingId("");
      setData({});
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Xóa thành công!");
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleOffBox = () => {
    setIsOpen(false);
  };
  return (
    <div className="space-y-6">
      {/* Products Header */}
      <div className="relative">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            Quản lý sản phẩm
          </h2>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Thêm sản phẩm
          </button>
        </div>
        {isOpen && (
          <div className="flex justify-center">
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={handleOffBox}
            ></div>
            <div className="absolute z-50 w-[80%] -top-10">
              {
                <CreateProductBox
                  onClick={handleOffBox}
                  fetchProduct={fetchProduct}
                />
              }
            </div>
          </div>
        )}
      </div>

      {/* Products Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Tất cả danh mục</option>
              <option>Sofa</option>
              <option>Bàn</option>
              <option>Tủ</option>
              <option>Giường</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <select className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Tất cả trạng thái</option>
              <option>Đang bán</option>
              <option>Sắp hết</option>
              <option>Hết hàng</option>
            </select>
          </div>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Số lượng
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 ">
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">
                        <Image
                          src={product.url}
                          alt={product.name}
                          width={480}
                          height={480}
                          className=" object-contain max-w-14 max-h-14"
                        />
                      </div>
                      <div className="ml-4 ">
                        <div className="text-md font-medium text-slate-900 max-w-sm">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="block text-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 text-center">
                    <input
                      type="text"
                      value={
                        editingId === product.id ? data.price : product.price
                      }
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          price: e.target.value.replace(/[^0-9]/g, ""), // chỉ giữ số
                        }))
                      }
                      disabled={editingId !== product.id}
                      className={`w-[6rem] p-1 text-center ${
                        editingId === product.id && "border border-slate-300 "
                      }`}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-900">
                    <input
                      type="text"
                      value={
                        editingId === product.id ? data.stock : product.stock
                      }
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                        const num = parseInt(onlyNums || "0", 10);
                        setData((prev) => ({
                          ...prev,
                          stock: num < 0 ? "0" : num.toString(), // ép về min 0
                        }));
                      }}
                      disabled={editingId !== product.id}
                      className={`w-10 p-1 text-center ${
                        editingId === product.id && "border border-slate-300 "
                      }`}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div
                      className={`flex justify-center rounded-full text-xs font-medium`}
                    >
                      {
                        <ButtonToggle
                          data={product}
                          array={statuses}
                          label="active"
                          functionApi={updateProduct}
                        />
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center justify-center gap-2">
                      {editingId !== product.id ? (
                        <>
                          <button
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-lg hover:bg-indigo-50 transition-colors"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 p-1 rounded-lg hover:bg-red-50 transition-colors"
                            onClick={() => {
                              handleDelete(product.id);
                            }}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleSave(product)}
                            className="text-green-600 hover:text-green-900 p-1 rounded-lg hover:bg-green-50 transition-colors"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                            }}
                            className="text-gray-600 hover:text-gray-900 p-1 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/*
 */
