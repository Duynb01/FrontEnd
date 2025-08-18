import { formatDateType, formatExpiryDate } from "@/utils/formatData";
import {
  Edit,
  Filter,
  Plus,
  Trash2,
  Gift,
  CheckCircle,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import ButtonToggle from "../ButtonToggle";
import { deleteVoucher, updateVoucher } from "@/lib/api/apiVoucher";
import { toast } from "react-toastify";
import CreateVoucherBox from "../CreateVoucherBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function VoucherTab({ fetchVoucher }) {
  const fetchData = async () => {
    try {
      const data = await fetchVoucher();
      setVouchers(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  const [vouchers, setVouchers] = useState([]);
  useEffect(() => {
    fetchData();
  }, [fetchVoucher]);

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
      fetchData();
    } catch (error) {
      toast.error(error.message || "Cập nhật Voucher thất bại");
    } finally {
      setEditingId("");
      setDate("");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVoucher(id);
      toast.success("Xóa thành công!");
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // UI Box Create
  const [isOpen, setIsOpen] = useState(false);
  const handleOffBox = () => {
    setIsOpen(false);
  };

  // Filter Status
  const statusOptions = ["Tất cả trạng thái", "Kích hoạt", "Chưa kích hoạt"];
  const [selectedStatus, setSelectedStatus] = useState("Tất cả trạng thái");
  const filteredVoucher = vouchers.filter((voucher) => {
    switch (selectedStatus) {
      case "Kích hoạt":
        return voucher.active;
      case "Chưa kích hoạt":
        return !voucher.active;
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6 relative">
      {/* Products Header */}
      <div className="relative">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Quản lý Voucher</h2>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="gradient text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Thêm Voucher
          </button>
        </div>
        {/* <div className="absolute z-50 left-1/2 transform -translate-x-1/2 w-full"> */}
        {isOpen && (
          <div className="flex justify-center ">
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={handleOffBox}
            ></div>
            <div className="absolute z-50 w-[60%]">
              {
                <CreateVoucherBox
                  onClick={handleOffBox}
                  fetchVoucher={fetchVoucher}
                />
              }
            </div>
          </div>
        )}
      </div>

      {/* Products Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 relative">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                fetchVoucher();
              }}
              className="border border-slate-300 rounded-md px-3 py-2 pr-6 appearance-none"
            >
              {statusOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="block border border-slate-300"
                >
                  {option}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faAngleDown}
              className="w-3 h-3 absolute right-1.5"
            />
          </div>
          <div className="flex-1 max-w-md">
            {/* <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div> */}
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
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Mã
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Ngày hiệu lực
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Hạn
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider ">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider ">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredVoucher.map((voucher) => (
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
                      {formatExpiryDate(voucher.startDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-900">
                    <input
                      type="date"
                      value={
                        editingId === voucher.id
                          ? date
                          : formatDateType(voucher.expiryDate)
                      }
                      min={formatDateType(voucher.startDate)}
                      onChange={(e) => setDate(e.target.value)}
                      disabled={editingId !== voucher.id}
                      className={`w-[7rem] p-1 text-center ${
                        editingId === voucher.id && "border border-slate-300"
                      }`}
                    />
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
                          <button
                            className="text-red-600 hover:text-red-900 p-1 rounded-lg hover:bg-red-50 transition-colors"
                            onClick={() => {
                              handleDelete(voucher.id);
                            }}
                          >
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
