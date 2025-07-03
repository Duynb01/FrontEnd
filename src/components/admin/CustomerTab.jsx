import React from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Bell,
  Search,
  Menu,
  X,
  DollarSign,
  TrendingUp,
  Eye,
  Plus,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  MoreVertical,
  Star,
  MapPin,
  Phone,
  Mail,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
} from "lucide-react";

export default function CustomerTab() {
  const customers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      orders: 8,
      spent: "₫125,000,000",
      joined: "2023-03-15",
      status: "VIP",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0987654321",
      orders: 5,
      spent: "₫75,000,000",
      joined: "2023-06-20",
      status: "Thường",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0456789123",
      orders: 12,
      spent: "₫200,000,000",
      joined: "2023-01-10",
      status: "VIP",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0789123456",
      orders: 3,
      spent: "₫45,000,000",
      joined: "2023-09-05",
      status: "Thường",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane@email.com",
      phone: "0321654987",
      orders: 15,
      spent: "₫300,000,000",
      joined: "2022-12-01",
      status: "VIP",
    },
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case "Đã giao":
        return "bg-green-100 text-green-700";
      case "Đang giao":
        return "bg-blue-100 text-blue-700";
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-700";
      case "Đã hủy":
        return "bg-red-100 text-red-700";
      case "Đang bán":
        return "bg-green-100 text-green-700";
      case "Sắp hết":
        return "bg-orange-100 text-orange-700";
      case "VIP":
        return "bg-purple-100 text-purple-700";
      case "Thường":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Đã giao":
        return <CheckCircle className="w-4 h-4" />;
      case "Đang giao":
        return <Truck className="w-4 h-4" />;
      case "Đang xử lý":
        return <Clock className="w-4 h-4" />;
      case "Đã hủy":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };
  return (
    <div className="space-y-6">
      {/* Customers Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Quản lý khách hàng
        </h2>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm mới
          </button>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Xuất danh sách
          </button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Tổng khách hàng</p>
              <p className="text-2xl font-bold text-slate-900">2,847</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Khách VIP</p>
              <p className="text-2xl font-bold text-purple-600">284</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Khách mới (tháng)</p>
              <p className="text-2xl font-bold text-green-600">156</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Giá trị trung bình</p>
              <p className="text-2xl font-bold text-orange-600">₫85M</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Customers Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Tất cả khách hàng</option>
              <option>Khách VIP</option>
              <option>Khách thường</option>
              <option>Khách mới</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <select className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Sắp xếp theo</option>
              <option>Tên A-Z</option>
              <option>Tên Z-A</option>
              <option>Mới nhất</option>
              <option>Cũ nhất</option>
            </select>
          </div>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Đã chi tiêu
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Ngày tham gia
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          ID: {customer.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 flex items-center">
                      <Mail className="w-4 h-4 mr-1 text-slate-400" />
                      {customer.email}
                    </div>
                    <div className="text-sm text-slate-500 flex items-center">
                      <Phone className="w-4 h-4 mr-1 text-slate-400" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {customer.spent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {customer.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        customer.status
                      )}`}
                    >
                      {customer.status === "VIP" && (
                        <Star className="w-3 h-3 mr-1" />
                      )}
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-lg hover:bg-indigo-50 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1 rounded-lg hover:bg-green-50 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-slate-600 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-50 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
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
