"use client";
import { loginGoogle } from "@/lib/api/apiAuth";
import { setCheckLogin } from "@/redux/store/slices/authSlice";
import { setProfile } from "@/redux/store/slices/userSlice";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
export default function SocialAccount() {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleGoogleLogin = async (response) => {
    const { credential } = response;
    try {
      const data = await loginGoogle(credential);
      dispatch(setCheckLogin());
      dispatch(setProfile(data.user));
      localStorage.setItem("isLogin", "true");
      router.push("/");
      toast.success("Đăng nhập thành công!");
    } catch (err) {
      toast.error(err.message);
      console.error("Lỗi login", err);
    }
  };
  return (
    <div className="p-10 flex justify-center">
      <GoogleLogin onSuccess={handleGoogleLogin} />
    </div>
  );
}
