import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Box, Collapse } from "@mui/material";

const Toggable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Box>
      {!visible && (
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      )}

      <Collapse in={visible}>
        <Box mt={2}>
          {props.children}
          <Box mt={1}>
            <Button variant="outlined" onClick={toggleVisibility}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
});

Toggable.displayName = "Toggable";

export default Toggable;
