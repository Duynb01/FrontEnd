import React, { useEffect, useState } from "react";
import {
  Users,
  Search,
  Filter,
  Trash2,
  Phone,
  Mail,
  UserRoundX,
  UserRoundCheck,
} from "lucide-react";
import { formatExpiryDate } from "@/utils/formatData";
import ButtonToggle from "../ButtonToggle";
import { getUser, updateStatus } from "@/lib/api/apiUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { getOrder } from "@/lib/api/apiOrder";
import { searchProduct } from "@/utils/searchHistory";

export default function CustomerTab() {
  const [data, setData] = useState({
    users: [],
    orders: [],
  });

  const fetchData = async () => {
    try {
      const users = await getUser();
      const orders = await getOrder();
      if (users) setData((prev) => ({ ...prev, users: users }));
      if (orders) setData((prev) => ({ ...prev, orders: orders }));
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const { users, orders } = data;

  const quantityOrder = (userId) => {
    return orders.filter((order) => order.user.id === userId).length;
  };
  const activeAccount = users.filter((user) => user.active).length;

  // Filter Status
  const statusOptions = ["Tất cả trạng thái", "Kích hoạt", "Chưa kích hoạt"];
  const [selectedStatus, setSelectedStatus] = useState("Tất cả trạng thái");
  const filteredUsers = users.filter((user) => {
    switch (selectedStatus) {
      case "Kích hoạt":
        return user.active;
      case "Chưa kích hoạt":
        return !user.active;
      default:
        return true;
    }
  });

  // Filter Sort
  const sortOptions = ["Tên A-Z", "Tên Z-A"];
  const [sort, setSort] = useState("Sắp xếp");
  const selectSort = () => {
    const sorted = [...filteredUsers];
    switch (sort) {
      case "Tên A-Z":
        return sorted.sort((a, b) =>
          a.name.localeCompare(b.name, "vi", { sensitivity: "base" })
        );
      case "Tên Z-A":
        return sorted.sort((a, b) =>
          b.name.localeCompare(a.name, "vi", { sensitivity: "base" })
        );
      default:
        return sorted.sort((a, b) =>
          a.name.localeCompare(b.name, "vi", { sensitivity: "base" })
        );
    }
  };

  // Filter Search
  const [keyword, setKeyword] = useState("");
  const [listUser, setListUser] = useState([]);
  const handleInputSearch = (e) => {
    setKeyword(e.target.value);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = searchProduct(keyword, selectSort());
      setListUser(result);
    }, 100);
    return () => clearTimeout(timeout);
  }, [keyword, selectSort()]);

  const roles = ["ADMIN", "USER"];
  const statuses = ["Active", "Inactive"];

  return (
    <div className="flex flex-col gap-6">
      {/* Customers Header */}

      <h2 className="text-2xl font-bold text-slate-800">Quản lý khách hàng</h2>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Tổng khách hàng</p>
              <p className="text-2xl font-bold text-slate-900">
                {users.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Kích hoạt</p>
              <p className="text-2xl font-bold text-green-600">
                {activeAccount}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UserRoundCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Chưa kích hoạt</p>
              <p className="text-2xl font-bold text-orange-600">
                {users.length - activeAccount}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <UserRoundX className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Customers Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-6 ">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 relative">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                fetchData();
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
          <div className="flex items-center gap-2 relative">
            <select
              className="border border-slate-300 rounded-md px-3 py-2 pr-6 appearance-none "
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value={"Sắp xếp"}>Sắp xếp</option>
              {sortOptions.map((option) => (
                <option key={option} value={option}>
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
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng..."
                value={keyword}
                onChange={handleInputSearch}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg "
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
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Ngày tham gia
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Role
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
              {listUser.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 flex items-center">
                      <Mail className="w-4 h-4 mr-1 text-slate-400" />
                      {user.email}
                    </div>
                    <div className="text-sm text-slate-500 flex items-center">
                      <Phone className="w-4 h-4 mr-1 text-slate-400" />
                      {user.phone}
                    </div>
                  </td>
                  {/* Số đơn */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <div className="text-center">{quantityOrder(user.id)}</div>
                  </td>
                  {/* Ngày tạo */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <div className="text-center">
                      {formatExpiryDate(user.createdAt)}
                    </div>
                  </td>
                  {/* Role */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`flex justify-center rounded-full text-xs font-medium`}
                    >
                      {
                        <ButtonToggle
                          data={user}
                          array={roles}
                          label="role"
                          functionApi={updateStatus}
                        />
                      }
                    </div>
                  </td>
                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div
                      className={`flex justify-center rounded-full text-xs font-medium`}
                    >
                      {
                        <ButtonToggle
                          data={user}
                          array={statuses}
                          label="active"
                          functionApi={updateStatus}
                        />
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded-lg hover:bg-red-50 transition-colors"
                        onClick={() => {
                          console.log("Delete user: ", user.id);
                        }}
                      >
                        <Trash2 className="w-5 h-5" />
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
