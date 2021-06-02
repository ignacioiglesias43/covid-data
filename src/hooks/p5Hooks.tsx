import { useRef } from "react";
import { useTheme, useMediaQuery } from "@material-ui/core";
import useWindowDimensions from "./dimensionHooks";
import p5Types from "p5";
import mapboxgl from "mapbox-gl";
import PolygonsData from "../api/polygons.json";

export const useMappa = (states: Object) => {
  const mapboxToken =
    "pk.eyJ1IjoiaWduYWNpb2lnbGVzaWFzNDMiLCJhIjoiY2twN3h3dDdkMDQ0NjJ1bXV0OHNreWp1NyJ9.C1ii-nMNWdA8AIuwJ_1OZA";

  const canvas = useRef<p5Types.Renderer>();
  const map = useRef<any>();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between("xs", "lg"));

  const { width } = useWindowDimensions();

  const canvasWidth = matches ? width - 85 : width * 0.5 - 85;

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: "tooltip",
    // closeOnMove: true,
  });

  const preload = (p5: p5Types) => {};

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    canvas.current = p5.createCanvas(canvasWidth, 0).parent(canvasParentRef);
    const mapDiv = document.createElement("div");
    // @ts-ignore
    if (canvas.current?.elt.parentElement) {
      canvas.current?.elt.parentElement.appendChild(mapDiv);
    } else {
      document.body.appendChild(mapDiv);
    }
    mapDiv.setAttribute(
      "style",
      "width:" + canvasWidth + "px;height:" + 500 + "px;"
    );
    mapDiv.setAttribute("id", "map-container");
    mapDiv.setAttribute("data-tip", "");
    mapDiv.setAttribute("data-for", "map-tooltip");
    map.current = new mapboxgl.Map({
      container: "map-container",
      zoom: 4,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-102.552784, 23.634501],
      accessToken: mapboxToken,
    });

    p5.fill(109, 255, 0);
    p5.stroke(100);
  };

  const handleCenterMap = () =>
    map.current.flyTo({ center: [-102.552784, 23.634501], zoom: 4 });

  const draw = (p5: p5Types) => {
    map.current.on("load", function () {
      map.current.addSource("points", {
        type: "geojson",
        data: PolygonsData,
      });
      map.current.addLayer({
        id: "urban-areas-fill",
        type: "fill",
        source: "points",
        layout: {},
        paint: {
          "fill-color": "green",
          "fill-opacity": 0.4,
        },
      });
      map.current.on("mousemove", function (e: any) {
        const features = map.current.queryRenderedFeatures(e?.point);
        features.forEach((f: any) => {
          if (f.properties.entidad_nombre) {
            map.current.getCanvas().style.cursor = "pointer";

            // @ts-ignore
            const txt = `${f.properties.entidad_nombre}: \n (Infectados: ${
              // @ts-ignore
              states[f.properties.entidad_nombre].infected?.toLocaleString()
            })`;
            popup.setLngLat(e.lngLat).setHTML(txt).addTo(map.current);
          }
        });
      });
      map.current.on("mouseout", function (e: any) {
        popup.remove();
      });
    });
    p5.noLoop();
  };

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(canvasWidth, 0, true);
    resizeMap();
  };

  function resizeMap() {
    const mappaDiv = document.getElementById("map-container");
    // @ts-ignore: I don't care that it might not be a HTML Canvas Element
    mappaDiv.style.width = canvas?.current?.width + "px";
    // @ts-ignore: I don't care that it might not be a HTML Canvas Element
    mappaDiv.style.height = 500 + "px";
    map.current.resize();
  }

  return {
    preload,
    setup,
    draw,
    windowResized,
    handleCenterMap,
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
