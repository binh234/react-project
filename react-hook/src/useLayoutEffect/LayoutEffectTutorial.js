import React, { useEffect, useLayoutEffect, useRef } from "react";

const LayoutEffectTutorial = () => {
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    console.log(inputRef.current.value);
  }, []);

  useEffect(() => {
    inputRef.current.value = "Second";
  }, []);

  return (
    <div>
      <input value="First" ref={inputRef} readOnly />
    </div>
  );
};

export default LayoutEffectTutorial;
