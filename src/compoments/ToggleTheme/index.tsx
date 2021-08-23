import { useContext, FormEvent } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles.scss";
import Toggle from "react-toggle";
import { useEffect } from "react";
export const ToggleTheme = () => {
  const context = useContext(ThemeContext);

  function toggle(event: FormEvent) {
    context.toggleThemeMode();
  }


  return (
    <>
    <label>
        <Toggle
          defaultChecked={false}
          icons={{
            checked: "🌞",
            unchecked: "🌙",
          }}
          onChange={toggle}
        />
      </label>
    </>
  );
};
