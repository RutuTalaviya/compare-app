import toast from "react-hot-toast";

export const DangerRight = (msg: string) => toast.error(msg);
export const SuccessRight = (msg: string) => toast.success(msg);