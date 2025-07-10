import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ButtonToggle({ data, array, label, functionApi }) {
  const tranformRole = (role) => {
    if (role === "ADMIN") return 1;
    if (role === "USER") return 2;
    return null;
  };
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    if (label === "active") {
      if (data[label]) {
        return setIsActive(true);
      } else {
        return setIsActive(false);
      }
    } else if (label === "role") {
      if (data[label] === array[0]) {
        return setIsActive(true);
      } else {
        return setIsActive(false);
      }
    }
  }, [data, array, label]);

  const handleToggle = async () => {
    const payload = {};
    if (label === "active") {
      payload.active = !isActive;
    } else if (label === "role") {
      payload.roleId = isActive
        ? tranformRole(array[1])
        : tranformRole(array[0]);
    }
    try {
      await functionApi({
        id: data.id,
        edit: payload,
      });
      setIsActive(!isActive);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      onClick={handleToggle}
      className={`toggle_switch relative overflow-hidden ${
        isActive ? "bg-green-600" : "bg-gray-700"
      }`}
    >
      <span
        className={`absolute pr-4 text-left z-0 transition-all duration-200 ease-in-out ${
          isActive ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        {array[0]}
      </span>
      <span
        className={`absolute pl-4 text-right z-0 transition-all duration-200 ease-in-out ${
          !isActive ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {array[1]}
      </span>
      <div className={`circle z-10 ${isActive && "circleRun"}`}></div>
    </div>
  );
}
