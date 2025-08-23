"use client";

import { getProfileUser, updateProfile } from "@/lib/api/apiUser";
import { validFormDataProfile } from "@/utils/isValidData";
import { Edit2, Save, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProfileTab() {
  const { id, name, email } = useSelector((state) => state.user.userInfo) ?? {};
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [flagData, setFlagData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    let timeout;
    const fetchDataProfile = async () => {
      try {
        setLoading(true);
        const response = await getProfileUser(id);
        setDataUser(response);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        timeout = setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };
    fetchDataProfile();
    return () => clearTimeout(timeout);
  }, [id]);

  const handleSaveProfile = async () => {
    const errs = validFormDataProfile(flagData);
    if (errs.length === 0) {
      try {
        await updateProfile(flagData);
        toast.success("Cập nhật thành công");
        setDataUser((prev) => ({ ...prev, ...flagData }));
        setIsEditing(false);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      errs.forEach((err) => toast.warning(err));
    }
  };
  const handleCancel = () => {
    setFlagData(dataUser);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader className="w-4 h-4 animate-spin text-main" />
      </div>
    );
  }

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
              onClick={handleCancel}
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
            value={flagData.name ?? dataUser.name ?? name}
            onChange={(e) => setFlagData({ ...flagData, name: e.target.value })}
            disabled={!isEditing}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg  disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={flagData.email ?? dataUser.email ?? email}
            onChange={(e) =>
              setFlagData({ ...flagData, email: e.target.value })
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
            value={flagData.phone ?? dataUser.phone ?? ""}
            onChange={(e) =>
              setFlagData({ ...flagData, phone: e.target.value })
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
            value={flagData.address ?? dataUser.address ?? ""}
            onChange={(e) =>
              setFlagData({ ...flagData, address: e.target.value })
            }
            disabled={!isEditing}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg  disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
      </div>
    </div>
  );
}
