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
export default function AnalyticTab() {
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
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Thống kê & Báo cáo
        </h2>
        <div className="flex items-center space-x-3">
          <select className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>7 ngày qua</option>
            <option>30 ngày qua</option>
            <option>3 tháng qua</option>
            <option>1 năm qua</option>
          </select>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">
            Doanh thu theo thời gian
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
              <span className="text-sm text-slate-600">Doanh thu</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-slate-600">Lợi nhuận</span>
            </div>
          </div>
        </div>
        <div className="h-80 bg-slate-50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">
              Biểu đồ doanh thu sẽ được hiển thị ở đây
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Tỷ lệ chuyển đổi</p>
              <p className="text-2xl font-bold text-slate-900">3.2%</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +0.5%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Đơn hàng trung bình</p>
              <p className="text-2xl font-bold text-slate-900">₫18.5M</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +2.1M
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Tỷ lệ trả hàng</p>
              <p className="text-2xl font-bold text-slate-900">2.1%</p>
              <div className="flex items-center mt-2">
                <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-600">+0.3%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Khách hàng mới</p>
              <p className="text-2xl font-bold text-slate-900">156</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +15.3%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">
            Hiệu suất theo danh mục
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "Sofa",
                revenue: "₫180M",
                percentage: 85,
                color: "bg-blue-500",
              },
              {
                name: "Bàn",
                revenue: "₫120M",
                percentage: 70,
                color: "bg-green-500",
              },
              {
                name: "Tủ",
                revenue: "₫95M",
                percentage: 60,
                color: "bg-purple-500",
              },
              {
                name: "Giường",
                revenue: "₫147M",
                percentage: 80,
                color: "bg-orange-500",
              },
            ].map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {category.name}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {category.revenue}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">
            Thống kê đơn hàng
          </h3>
          <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">
                Biểu đồ tròn sẽ được hiển thị ở đây
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">
          Hoạt động gần đây
        </h3>
        <div className="space-y-4">
          {[
            {
              action: "Đơn hàng mới",
              detail: "Đơn hàng #12349 từ Nguyễn Văn A",
              time: "2 phút trước",
              icon: ShoppingCart,
              color: "bg-blue-100 text-blue-600",
            },
            {
              action: "Sản phẩm mới",
              detail: 'Đã thêm "Bàn Sofa Hiện Đại"',
              time: "15 phút trước",
              icon: Package,
              color: "bg-green-100 text-green-600",
            },
            {
              action: "Khách hàng mới",
              detail: "Trần Thị C đã đăng ký",
              time: "1 giờ trước",
              icon: Users,
              color: "bg-purple-100 text-purple-600",
            },
            {
              action: "Đơn hàng hoàn thành",
              detail: "Đơn hàng #12340 đã được giao",
              time: "2 giờ trước",
              icon: CheckCircle,
              color: "bg-green-100 text-green-600",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-slate-50 rounded-xl"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.color}`}
              >
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="ml-4 flex-1">
                <div className="text-sm font-medium text-slate-900">
                  {activity.action}
                </div>
                <div className="text-sm text-slate-600">{activity.detail}</div>
              </div>
              <div className="text-xs text-slate-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
