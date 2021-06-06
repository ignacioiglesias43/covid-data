/* eslint-disable import/no-webpack-loader-syntax */
import { useRef } from "react";
import { useTheme, useMediaQuery } from "@material-ui/core";
import useWindowDimensions from "./dimensionHooks";
import p5Types from "p5";

import PolygonsData from "../api/polygons.json";
import { MainData } from "../interfaces/mainData";
// @ts-ignore
import mapboxgl from "!mapbox-gl";

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
              states[f.properties.entidad_nombre]?.infected?.toLocaleString()
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

export const useChart = (data: MainData) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between("xs", "lg"));

  const { width } = useWindowDimensions();

  const canvasWidth = matches ? width - 85 : width * 0.5 - 85;

  const GRAPH_ORIGINX = 70;
  const GRAPH_ORIGINY = 0;
  const GRAPHW = canvasWidth - 200;
  const GRAPHH = 450;

  const HASHMARKL = 5;
  const PADDINGX = 20;
  const PADDINGY = 20;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(canvasWidth, 500).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    const { max } = generateYAxis();
    drawBars(p5, max);
    drawHashMarksForXAxes(p5);
  };

  const windowResized = (p5: p5Types) =>
    p5.resizeCanvas(canvasWidth, 500, true);

  const generateYAxis = () => {
    // @ts-ignore
    let max = 0,
      min = 0;
    if (Object.entries(data).length > 0) {
      min =
        // @ts-ignore
        data.State["Ciudad de Mexico"].infected +
        // @ts-ignore
        data?.State["Ciudad de Mexico"]?.deceased;

      STATE_NAMES.forEach((stateName: string) => {
        const total =
          // @ts-ignore
          data?.State[stateName]?.infected + data?.State[stateName]?.deceased;

        if (total < min) {
          min = total;
        }
        if (total > max) {
          max = Math.ceil(total / 10) * 10;
        }
      });
      max = Math.ceil(max / 10) * 10;
    }
    return { max, min };
  };

  const drawBars = (p5: p5Types, avgMax: number) => {
    const distY = (GRAPHH - PADDINGY) / 100;
    const distX = (GRAPHW - 2 * PADDINGX) / STATE_NAMES.length;

    const startX = GRAPH_ORIGINX + PADDINGX;

    if (Object.entries(data).length > 0) {
      // @ts-ignore
      STATE_NAMES.forEach((stateName: string, index: number) => {
        const total =
          // @ts-ignore
          data?.State[stateName]?.infected + data?.State[stateName]?.deceased;
        const height = Math.ceil((total / avgMax) * GRAPHH * distY);
        const x = startX + index * distX;
        const y = GRAPH_ORIGINY + GRAPHH - height;
        p5.fill(getColorForBar(p5, index % 4, x, y, distX, height));
        p5.noStroke();
        p5.rect(x, y, distX, height);
      });
    }
  };

  function getColorForBar(
    p5: p5Types,
    index: number,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    const colors: p5Types.Color[] = [
      p5.color(50, 70, 117),
      p5.color(67, 103, 186),
      p5.color(84, 129, 235),
      p5.color(140, 175, 255),
    ];

    if (
      p5.mouseX > x &&
      p5.mouseX < x + w &&
      p5.mouseY > y &&
      p5.mouseY < y + h
    ) {
      return p5.color(150, 82, 217);
    }
    return colors[index];
  }

  function drawHashMarksForXAxes(p5: p5Types) {
    const numHashMarks = STATE_NAMES.length;
    const dist = GRAPHW - 2 * PADDINGX;
    const unitDist = dist / numHashMarks;
    const startX = GRAPH_ORIGINX + PADDINGX;
    const hashMarkB = GRAPH_ORIGINY + GRAPHH - 1;

    SHORT_STATE_NAMES.forEach((stateName: string, index: number) => {
      const hashMarkX = startX + index * unitDist;
      p5.stroke(51);
      p5.line(hashMarkX, hashMarkB + HASHMARKL, hashMarkX, hashMarkB);
      p5.push();
      const x = hashMarkX;
      const y = hashMarkB + 5;
      p5.translate(x, y);
      p5.rotate(p5.PI / 4);
      drawTextForXHashMark(p5, 0, 0, stateName);
      p5.pop();
    });
  }

  function drawTextForXHashMark(
    p5: p5Types,
    x: number,
    y: number,
    str: string
  ) {
    const len = str.length * 10;
    const height = 15;
    p5.push();
    p5.noStroke();
    p5.fill(51);
    p5.text(str, x, y, len, height);
    p5.pop();
  }

  return { setup, draw, windowResized, STATE_NAMES };
};

const STATE_NAMES = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de Mexico",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de Mexico",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacan",
  "Morelos",
  "Nayarit",
  "Nuevo Leon",
  "Oaxaca",
  "Puebla",
  "Queretaro",
  "Quintana Roo",
  "San Luis Potosi",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatan",
  "Zacatecas",
];

const SHORT_STATE_NAMES = [
  "Ags.",
  "BC",
  "BCS",
  "Camp.",
  "Chis.",
  "Chih.",
  "CDMX",
  "Coah.",
  "Col.",
  "Dgo.",
  "Edo. Mex.",
  "Gto.",
  "Gro.",
  "Hgo.",
  "Jal.",
  "Mich.",
  "Mor.",
  "Nay.",
  "N.L.",
  "Oax.",
  "Pue.",
  "Qro.",
  "Q. Roo.",
  "S.L.P.",
  "Sin.",
  "Son.",
  "Tab.",
  "Tamps.",
  "Tlax.",
  "Ver.",
  "Yuc.",
  "Zac.",
];
