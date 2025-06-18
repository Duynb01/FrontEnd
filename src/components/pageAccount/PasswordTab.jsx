import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

export default function PasswordTab() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Đổi mật khẩu</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu hiện tại
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              //   value={passwordData.currentPassword}
              //   onChange={(e) =>
              //     setPasswordData({
              //       ...passwordData,
              //       currentPassword: e.target.value,
              //     })
              //   }
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              //   value={passwordData.newPassword}
              //   onChange={(e) =>
              //     setPasswordData({
              //       ...passwordData,
              //       newPassword: e.target.value,
              //     })
              //   }
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Xác nhận mật khẩu mới
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              //   value={passwordData.confirmPassword}
              //   onChange={(e) =>
              //     setPasswordData({
              //       ...passwordData,
              //       confirmPassword: e.target.value,
              //     })
              //   }
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-4">
          <button
            // onClick={handlePasswordChange}
            type="button"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Cập nhật mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
}
