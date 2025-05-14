import { useState, useEffect } from "react";

export default function useModal() {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing((prev) => !prev);
  }

  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isShowing]);

  return [isShowing, toggle];
}
