import { useState } from "react";
import useTheme from "@/hooks/useTheme";
import { Label } from "@/components/ui/label";
import { Moon, Sun } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Theme } from "@/context/ThemeContext";

export function ThemePicker() {
  const { setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState("system");

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    setSelectedTheme(theme);
  }

  return (
    <fieldset className="flex items-center">
      <legend>Theme</legend>
      <RadioGroup defaultValue="system" className="flex rounded-full border overflow-hidden mx-auto my-6">
        <Label
          htmlFor="light"
          className={selectedTheme === 'light' ? 'flex items-center justify-center cursor-pointer px-4 py-2 bg-gray-300' : 'flex items-center justify-center cursor-pointer px-4 py-2'}
        >
          <RadioGroupItem
            value="light"
            id="light"
            onClick={() => handleThemeChange("light")}
            className="hidden"
          />
          <Sun />
          Light
        </Label>
        <Label
          htmlFor="dark"
          className={selectedTheme === 'dark' ? 'flex items-center justify-center cursor-pointer px-4 py-2 bg-gray-700' : 'flex items-center justify-center cursor-pointer px-4 py-2'}
        >
          <RadioGroupItem
            value="dark"
            id="dark"
            onClick={() => handleThemeChange("dark")}
            className="hidden"
          />
          <Moon />
          Dark
        </Label>
        <Label
          htmlFor="system"
          className={selectedTheme === 'system' ? 'flex items-center justify-center cursor-pointer px-4 py-2 bg-gray-700' : 'flex items-center justify-center cursor-pointer px-4 py-2'}
        >
          <RadioGroupItem
            value="system"
            id="system"
            onClick={() => handleThemeChange("system")}
            className="hidden"
          />
          System
        </Label>
      </RadioGroup>
    </fieldset>
  );
}

export default ThemePicker;
