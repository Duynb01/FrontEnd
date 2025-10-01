"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCheckLogin, setLogout } from "@/redux/store/slices/authSlice";
import { reloadUser } from "@/lib/api/apiAuth";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteProfile, setProfile } from "@/redux/store/slices/userSlice";
export default function Reload({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const isLogin =
    typeof window !== "undefined" && localStorage.getItem("isLogin");
  useEffect(() => {
    if (!isLogin) {
      dispatch(setLogout());
      // setLoading(false);
      return;
    }
    const fetchReload = async () => {
      try {
        const data = await reloadUser();
        if (data.status === "success") {
          dispatch(setCheckLogin());
          dispatch(setProfile(data));
        } else {
          dispatch(setLogout());
          dispatch(deleteProfile());
        }
      } catch (error) {
        toast.error(error.message);
        localStorage.removeItem("isLogin");
        dispatch(setLogout());
        dispatch(deleteProfile());
        router.push("/");
      } finally {
        // setLoading(false);
      }
    };
    fetchReload();
  }, [dispatch]);

  // if (loading) {
  //   return (
  //     <div className="w-screen h-screen flex items-center justify-center">
  //       <Loader className="w-6 h-6 animate-spin text-main" />
  //     </div>
  //   );
  // }

  return <>{children}</>;
}
