import React, { useRef } from "react";
import { Box } from "@material-ui/core";
import { Virus } from "mdi-material-ui";

import { useSketchStyles } from "../../hooks/styleHooks";

import Sketch from "react-p5";
import p5Types from "p5";
// @ts-ignore
import Mappa from "mappa-mundi";

const mapboxToken =
  "pk.eyJ1IjoiaWduYWNpb2lnbGVzaWFzNDMiLCJhIjoiY2twN3h3dDdkMDQ0NjJ1bXV0OHNreWp1NyJ9.C1ii-nMNWdA8AIuwJ_1OZA";

const mappa = new Mappa("Mapbox", mapboxToken);

const options = {
  lat: 19.451054,
  lng: -99.125519,
  zoom: 5,
  studio: true, // false to use non studio styles
  //style: 'mapbox.dark' //streets, outdoors, light, dark, satellite (for nonstudio)
  //   style: "mapbox://styles/mapbox/traffic-night-v2",
};

interface P5SketchProps {
  //Your component props
}

const P5Sketch: React.FC<P5SketchProps> = (props: P5SketchProps) => {
  const canvas = useRef<p5Types.Renderer>();
  const map = useRef<any>();
  const classes = useSketchStyles();
  //See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    canvas.current = p5
      .createCanvas(p5.windowWidth - 85, 500)
      .parent(canvasParentRef);

    // Create a tile map and overlay the canvas on top.
    map.current = mappa.tileMap(options);
    map.current.overlay(canvas.current);

    p5.fill(109, 255, 0);
    p5.stroke(100);
  };

  const draw = (p5: p5Types) => {};

  return (
    <Box boxShadow={2} className={classes.container}>
      <div className={classes.titleContainer}>
        <h2 className={classes.title}>Mapa de Casos Confirmados</h2>
        <Virus color="primary" />
      </div>
      <Sketch setup={setup} draw={draw} />
    </Box>
  );
};

export default P5Sketch;
