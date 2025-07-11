import { toast } from "react-toastify";

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
};

const hasEmptyValue = (obj) => {
  return Object.values(obj).some(
    (value) => value === "" || value === null || value === undefined
  );
};

export const validFormData = (formData) => {
  const errors = [];
  if (hasEmptyValue(formData)) {
    errors.push("Vui lòng điền đầy đủ thông tin!");
    return errors;
  }
  if (!isValidEmail(formData.email)) {
    errors.push("Email không hợp lệ!");
  }
  if (!isValidPassword(formData.password)) {
    errors.push("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số!");
  }
  return errors;
};

export const validateFormVoucher = (form) => {
  const { name, code, discount, startDate, expiryDate, type } = form;

  if (!name || !code || !discount || !startDate || !expiryDate) {
    toast.error("Vui lòng điền đầy đủ thông tin.");
    return false;
  }

  if (new Date(startDate) > new Date(expiryDate)) {
    toast.error("Ngày bắt đầu phải trước ngày kết thúc.");
    return false;
  }

  const numericValue = Number(discount);
  if (type === "percent" && (numericValue <= 0 || numericValue > 100)) {
    toast.error("Giảm theo % phải nằm trong khoảng 1 đến 100.");
    return false;
  }

  if (type === "fixed" && numericValue <= 0) {
    toast.error("Số tiền giảm phải lớn hơn 0.");
    return false;
  }
  return true;
};
