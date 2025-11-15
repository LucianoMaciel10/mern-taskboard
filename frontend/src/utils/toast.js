import { toast } from "react-hot-toast";

export const themeToastError = (text, theme) =>
  theme === "lemonade"
    ? toast.error(text)
    : toast.error(text, {
        style: { background: "#2E3B45", color: "#9FB9D0" },
      });
export const themeToastSuccess = (text, theme) =>
  theme === "lemonade"
    ? toast.success(text)
    : toast.success(text, {
        style: { background: "#2E3B45", color: "#9FB9D0" },
      });
