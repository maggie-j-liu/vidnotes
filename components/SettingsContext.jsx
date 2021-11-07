import { createContext, useContext, useEffect, useState } from "react";
const SettingsContext = createContext();

export const colorClasses = [
  "bg-white",
  "bg-primary",
  "bg-secondary",
  "bg-gradient-to-br from-primary to-secondary",
  "bg-gradient-to-br from-primary to-white",
  "bg-gradient-to-br from-secondary to-white",
];
export const SettingsContextProvider = ({ children }) => {
  const [opacity, setOpacity] = useState(50);
  const [color, setColor] = useState(colorClasses[0]);
  const stickySetOpacity = (opacity) => {
    setOpacity(opacity);
    localStorage.setItem("opacity", opacity);
  };
  const stickySetColor = (color) => {
    setColor(color);
    localStorage.setItem("color", color);
  };
  useEffect(() => {
    const opacity = localStorage.getItem("opacity");
    if (opacity) {
      setOpacity(opacity);
    }
    const color = localStorage.getItem("color");
    if (color) {
      setColor(color);
    }
  }, []);
  return (
    <SettingsContext.Provider
      value={{
        opacity,
        setOpacity: stickySetOpacity,
        color,
        setColor: stickySetColor,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);
export default useSettings;
