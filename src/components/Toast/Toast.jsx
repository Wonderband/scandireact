import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import { MdCheckCircle, MdError } from "react-icons/md";

export default function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      transition={Slide}
      closeOnClick
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={true}
    />
  );
}

export function toastSuccess(message) {
  toast.success(message, {
    icon: <MdCheckCircle color="green" size="30" />,
  });
}

export function toastError(message) {
  toast.error(message, {
    icon: <MdError color="red" size="30" />,
  });
}
