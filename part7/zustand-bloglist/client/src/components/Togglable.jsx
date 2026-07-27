import { useState, useImperativeHandle } from "react";

const Togglable = (props) => {
  const [visiable, setVisible] = useState(false);

  const hideWhenVisible = { display: visiable ? "none" : "" };
  const showWhenVisible = { display: visiable ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visiable);
  };

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
