import { getProfileUser, updateProfile } from "@/lib/api/apiUser";
import { Edit2, Save, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfileTab() {
  const [isLoad, setIsLoad] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProfileUser();
      if (data) {
        setDataUser(data);
        setIsLoad(true);
      }
    };
    fetchData();
  }, []);

  const handleSaveProfile = async () => {
    if (isValidPhone(dataUser.phone)) {
      const data = await updateProfile(dataUser);
      if (data) {
        toast.success("Cập nhật thành công");
      }
      setIsEditing(false);
    } else {
      toast.error("Vui lòng số điện thoại");
    }
  };

  const isValidPhone = (phone) => {
    const check = /^(0|\+84)(3|5|7|8|9)\d{8}$/.test(phone);
    return check;
  };

  return isLoad ? (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Thông tin cá nhân
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Chỉnh sửa
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Lưu
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Họ và tên
          </label>
          <input
            type="text"
            value={dataUser.name ?? userInfo.name}
            onChange={(e) => setDataUser({ ...dataUser, name: e.target.value })}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg  disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={dataUser.email ?? userInfo.email}
            onChange={(e) =>
              setDataUser({ ...dataUser, email: e.target.value })
            }
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg  disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại
          </label>
          <input
            type="text"
            value={dataUser.phone || ""}
            onChange={(e) =>
              setDataUser({ ...dataUser, phone: e.target.value })
            }
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg  disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Địa chỉ
          </label>
          <textarea
            value={dataUser.address || ""}
            onChange={(e) =>
              setDataUser({ ...dataUser, address: e.target.value })
            }
            disabled={!isEditing}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg  disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
      </div>
    </div>
  ) : (
    <Loader className="w-4 h-4 animate-spin text-main" />
  );
}
