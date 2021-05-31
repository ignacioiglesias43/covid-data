import { useRef } from "react";
import p5Types from "p5";
// @ts-ignore
import Mappa from "mappa-mundi";

export const useMappa = () => {
  const mapboxToken =
    "pk.eyJ1IjoiaWduYWNpb2lnbGVzaWFzNDMiLCJhIjoiY2twN3h3dDdkMDQ0NjJ1bXV0OHNreWp1NyJ9.C1ii-nMNWdA8AIuwJ_1OZA";
  const options = {
    lat: 23.634501,
    lng: -102.552784,
    zoom: 5,
    style: "mapbox://styles/mapbox/light-v10",
    studio: true,
  };

  const mappa = new Mappa("Mapbox", mapboxToken);

  const canvas = useRef<p5Types.Renderer>();
  const map = useRef<any>();

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

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth - 85, 500, true);
    // map.current.overlay(canvas.current);
    resizeMap();
  };

  function resizeMap() {
    // @ts-ignore: I don't care that it might not be a HTML Canvas Element
    map.current.mappaDiv.style.width = canvas?.current?.width + "px";
    // @ts-ignore: I don't care that it might not be a HTML Canvas Element
    map.current.mappaDiv.style.height = canvas?.current?.height + "px";
  }

  return {
    setup,
    draw,
    windowResized,
  };
};

export const useChart = () => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth - 85, 500).parent(canvasParentRef);
    p5.fill(109, 255, 0);
    p5.stroke(100);
  };

  const draw = (p5: p5Types) => {};

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth - 85, 500, true);
  };

  return { setup, draw, windowResized };
};
