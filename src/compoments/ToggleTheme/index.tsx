import { useContext, FormEvent } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles.scss";
import Toggle from "react-toggle";
import { useEffect } from "react";
export const ToggleTheme = () => {
  const context = useContext(ThemeContext);

  function toggle(event: FormEvent) {
    event.preventDefault();
    console.log(context.isClicked);
    context.toggleThemeMode();
  }

  useEffect(() => {
    console.log(context.isClicked);
  },[])

  return (
    <>
    <label>
        <Toggle
          defaultChecked={context.isClicked}
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
