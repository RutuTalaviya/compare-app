import toast from "react-hot-toast";

export const DangerRight = (msg: string) => toast.error(msg);
export const SuccessRight = (msg: string) => toast.success(msg);

export const Centerwarning = (msg: string) =>
  toast(msg, {
    position: "top-center",
    icon: "⚠️",
    style: {
      borderRadius: "12px",
      background: "#313842",
      color: "#ffffff",
      fontFamily: "var(--font-geist-sans), Arial, sans-serif",
      fontWeight: "bold",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
    },
  });