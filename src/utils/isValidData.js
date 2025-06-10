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
