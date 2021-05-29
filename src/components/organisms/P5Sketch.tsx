import React, { useRef } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between("sm", "md"));
  //See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    canvas.current = p5
      .createCanvas(matches ? p5.windowWidth - 40 : 800, 500)
      .parent(canvasParentRef);

    // Create a tile map and overlay the canvas on top.
    map.current = mappa.tileMap(options);
    map.current.overlay(canvas.current);

    p5.fill(109, 255, 0);
    p5.stroke(100);
  };

  const draw = (p5: p5Types) => {};

  return <Sketch setup={setup} draw={draw} />;
};

export default P5Sketch;
