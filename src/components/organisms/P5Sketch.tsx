import React from "react";
import { Box, Divider } from "@material-ui/core";
import { Virus } from "mdi-material-ui";

import { useSketchStyles } from "../../hooks/styleHooks";

import Sketch from "react-p5";
import { P5SketchProps } from "../../interfaces/p5";

const P5Sketch: React.FC<P5SketchProps> = ({
  title = "",
  id = "sketch",
  preload = () => {},
  setup = () => {},
  draw = () => {},
  windowResized = () => {},
  mouseWheel = () => {},
}: P5SketchProps) => {
  const classes = useSketchStyles();

  return (
    <Box boxShadow={2} className={classes.container} id={id}>
      <div className={classes.titleContainer}>
        <h2 className={classes.title}>{title}</h2>
        <Virus color="primary" />
      </div>
      <Divider className={classes.divider} />
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        windowResized={windowResized}
        mouseWheel={mouseWheel}
      />
    </Box>
  );
};

export default P5Sketch;
