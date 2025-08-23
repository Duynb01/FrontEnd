import { toast } from "react-toastify";

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
};

const isValidName = (name) => {
  return /^[A-Za-zÀ-ỹ][A-Za-zÀ-ỹ0-9\s]{1,}$/.test(name);
};

const isValidAddress = (name) => {
  return /^[a-zA-ZÀ-ỹ0-9\s]+$/.test(name);
};

const isValidPhone = (phone) => {
  return /^(0|\+84)(3|5|7|8|9)\d{8}$/.test(phone);
};

const hasEmptyValue = (obj) => {
  return Object.values(obj).some(
    (value) => value === "" || value === null || value === undefined
  );
};

export const validFormDataProfile = (formData) => {
  const errors = [];
  if (!isValidPhone(formData.phone)) {
    errors.push("Số điện thoại không hợp lệ!");
  }
  if (!isValidName(formData.name)) {
    errors.push("Tên phải bắt đầu bằng chữ và không có ký tự đặc biệt!");
  } else if (formData.name.trim().length < 2) {
    errors.push("Tên phải phải có ít nhất 2 ký tự!");
  }
  return errors;
};

export const validFormDataShipping = (formData) => {
  const errors = [];
  if (!isValidPhone(formData.phone)) {
    errors.push("Số điện thoại không hợp lệ!");
  }
  if (!isValidName(formData.name)) {
    errors.push("Tên phải bắt đầu bằng chữ và không có ký tự đặc biệt!");
  } else if (formData.name.trim().length < 2) {
    errors.push("Tên phải có ít nhất 2 ký tự!");
  }
  if (!isValidAddress(formData.address)) {
    errors.push("Địa chỉ không được chứa ký tự đặc biệt");
  } else if (formData.address.trim().length < 5) {
    errors.push("Địa chỉ phải có ít nhất 5 ký tự!");
  }

  return errors;
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

export { isValidPhone };
