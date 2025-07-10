import { formatDateType, formatExpiryDate } from "@/utils/formatData";
import {
  Edit,
  Filter,
  Plus,
  Trash2,
  Search,
  Gift,
  CheckCircle,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import ButtonToggle from "../ButtonToggle";
import { getVoucher, updateVoucher } from "@/lib/api/apiVoucher";
import { toast } from "react-toastify";

export default function VoucherTab() {
  // Call Api Full Voucher
  const [vouchers, setVouchers] = useState([]);
  const fetchVoucher = async () => {
    try {
      const data = await getVoucher();
      setVouchers(data);
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchVoucher();
  }, []);

  // Button Toggle
  const statuses = ["Active", "Inactive"];

  // Fix Edit Date
  const [editingId, setEditingId] = useState(null);
  const [date, setDate] = useState("");

  const handleEdit = (voucher) => {
    setEditingId(voucher.id);
    setDate(formatDateType(voucher.expiryDate));
  };
  const handleSave = async (voucher) => {
    const payload = {
      id: voucher.id,
      edit: { expiryDate: formatDateType(date) },
    };
    try {
      await updateVoucher(payload);
      toast.success("Cập nhật Voucher thành công");
      fetchVoucher();
    } catch (error) {
      toast.error(error.message || "Cập nhật Voucher thất bại");
    } finally {
      setEditingId("");
      setDate("");
    }
  };
  return (
    <div className="space-y-6 ">
      {/* Products Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Quản lý Voucher</h2>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Thêm Voucher
        </button>
      </div>

      {/* Products Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Tất cả trạng thái</option>
              <option>Kích hoạt</option>
              <option>Chưa kích hoạt</option>
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
                  Voucher
                </th>
                {/* <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Mã
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Ngày tạo
                </th> */}
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Hạn
                </th>
                {/* <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider ">
                  Trạng thái
                </th> */}
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider ">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {vouchers.map((voucher) => (
                <tr
                  key={voucher.id}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Gift className="w-8 h-8 text-white" />
                      </div>

                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">
                          {voucher.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center py-0.5 text-sm font-medium">
                      {voucher.code}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    <div className="flex items-center justify-center">
                      {formatExpiryDate(voucher.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    <div className="flex items-center justify-center">
                      <input
                        type="date"
                        value={
                          editingId === voucher.id
                            ? date
                            : formatDateType(voucher.expiryDate)
                        }
                        min={formatDateType(voucher.createdAt)}
                        onChange={(e) => setDate(e.target.value)}
                        disabled={editingId !== voucher.id}
                        className={`w-[7rem] p-1  ${
                          editingId === voucher.id && "border border-slate-300"
                        }`}
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`flex justify-center rounded-full text-xs font-medium`}
                    >
                      <ButtonToggle
                        data={voucher}
                        array={statuses}
                        label="active"
                        functionApi={updateVoucher}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center justify-center gap-2">
                      {editingId !== voucher.id ? (
                        <>
                          <button
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-lg hover:bg-indigo-50 transition-colors"
                            onClick={() => handleEdit(voucher)}
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-1 rounded-lg hover:bg-red-50 transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleSave(voucher)}
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
