import React, { forwardRef, useImperativeHandle, useState } from "react";

const Button = forwardRef((props, ref) => {
  const [toggle, setToggle] = useState(false);

  useImperativeHandle(ref, () => ({
    alterToggle() {
      setToggle(!toggle);
    },
  }));
  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>Button From Child</button>
      {toggle && <p>Toggle</p>}
    </div>
  );
});

export default Button;
