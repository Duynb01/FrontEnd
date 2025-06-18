"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCheckLogin } from "@/redux/store/slices/authSlice";
import { reloadUser } from "@/lib/api/apiAuth";
export default function Reload() {
  const dispatch = useDispatch();
  const isLogin =
    typeof window !== "undefined" && localStorage.getItem("isLogin");
  useEffect(() => {
    if (!isLogin) {
      return;
    }

    const fetchReload = async () => {
      try {
        const data = await reloadUser();
        if (data.status === "success") {
          dispatch(setCheckLogin(data));
        } else {
          dispatch(setCheckLogin(null));
        }
      } catch (error) {
        console.error("Error during reload:", error);
        dispatch(setCheckLogin(null));
      }
    };
    fetchReload();
  }, []);
  return <></>;
}
