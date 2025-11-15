import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

function ThemeButton() {
  const { toggleTheme, theme } = useTheme();

  return (
    <button className="btn" onClick={toggleTheme}>
      {
        theme === 'sunset'
          ? <SunIcon className="size-6" />
          : <MoonIcon className="size-6" />
      }
    </button>
  );
}

export default ThemeButton;
