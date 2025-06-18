import { Edit2, Save } from "lucide-react";
import React, { useState } from "react";

export default function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  return (
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
            // value={userInfo.name}
            // onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            // value={userInfo.email}
            // onChange={(e) =>
            //   setUserInfo({ ...userInfo, email: e.target.value })
            // }
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại
          </label>
          <input
            type="tel"
            // value={userInfo.phone}
            // onChange={(e) =>
            //   setUserInfo({ ...userInfo, phone: e.target.value })
            // }
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngày sinh
          </label>
          <input
            type="date"
            // value={userInfo.birthDate}
            // onChange={(e) =>
            //   setUserInfo({ ...userInfo, birthDate: e.target.value })
            // }
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Địa chỉ
          </label>
          <textarea
            // value={userInfo.address}
            // onChange={(e) =>
            //   setUserInfo({ ...userInfo, address: e.target.value })
            // }
            disabled={!isEditing}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
      </div>
    </div>
  );
}
