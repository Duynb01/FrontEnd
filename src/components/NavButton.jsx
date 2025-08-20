import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function NavButton({ back, classProp = "", data }) {
  const { Icon, path, title } = data || {};
  const router = useRouter();
  return (
    <div className={`${classProp} flex items-center gap-4`}>
      <button
        onClick={() => {
          if (back) {
            router.back();
          } else {
            router.replace("/");
          }
        }}
        className="flex  items-center gap-1 border rounded-full px-3 py-2 hover:bg-gray-300"
      >
        <Undo2 className="text-main" />
        Quay lại
      </button>
      {data && (
        <button
          onClick={() => {
            router.replace(path);
          }}
          className="flex  items-center gap-1 border rounded-full px-3 py-2 hover:bg-gray-300"
        >
          <Icon className="text-main" />
          {title}
        </button>
      )}
    </div>
  );
}
