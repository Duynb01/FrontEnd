"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export default function ProductDescription({ value = "", onChange }) {
  const editorRef = useRef(null);

  return (
    <div>
      <Editor
        apiKey="46m2pwyfqrk9mrxyurdhv6bpwutcsz5zf6izofu7m931e8v9"
        onInit={(_, editor) => (editorRef.current = editor)}
        value={value} // chỉ dùng để set giá trị ban đầu
        onEditorChange={(newValue) => onChange?.(newValue)} // gọi callback khi có thay đổi
        init={{
          height: 300,
          menubar: false,
          statusbar: false,
          promotion: false,
          plugins: "lists link table code",
          toolbar:
            "undo redo | bold italic underline strikethrough | " +
            "bullist numlist | link table | forecolor | removeformat | code",
          placeholder: "Nhập mô tả sản phẩm...",
        }}
      />
    </div>
  );
}
