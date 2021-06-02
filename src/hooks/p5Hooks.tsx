import { useRef } from "react";
import { useTheme, useMediaQuery } from "@material-ui/core";
import useWindowDimensions from "./dimensionHooks";
import p5Types from "p5";
import mapboxgl from "mapbox-gl";
import PolygonsData from "../api/polygons.json";
import { MainData } from "../interfaces/mainData";

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

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between("xs", "lg"));

  const { width } = useWindowDimensions();

  const canvasWidth = matches ? width - 85 : width * 0.5 - 85;

  const leftMargin = 100;
  const topMargin = 50;

  const plotHeight = 350;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(canvasWidth, 500).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    const barWidth = 20;
    const surplus = 30;
    let max = 0,
      min = 0;
    // X axis
    const xLen = canvasWidth;
    p5.line(leftMargin, topMargin + plotHeight, xLen, topMargin + plotHeight);
    // X axis label
    p5.textAlign(p5.LEFT);
    p5.text("Estados", xLen / 2, topMargin + plotHeight + 50);

    // ----------------------------------------------

    // Y axis
    p5.line(leftMargin, topMargin + plotHeight, leftMargin, topMargin);
    // Y axis arrow at the top
    p5.line(leftMargin - 10, topMargin + 10, leftMargin, topMargin);
    p5.line(leftMargin + 10, topMargin + 10, leftMargin, topMargin);
    // Y axis label
    p5.angleMode(p5.DEGREES);
    p5.rotate(-90);
    p5.textAlign(p5.CENTER);
    p5.text("Infectados", 0 - (topMargin + plotHeight / 2), leftMargin - 70);
    p5.rotate(90);

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
          max = total;
        }
      });
    }
    // Y axis ticks
    max = Math.ceil(max / 10) * 10;
    const pixelsPerMpg = (plotHeight - surplus * 2) / (max - min);

    // ticks
    // bottom tick
    p5.textAlign(p5.RIGHT);
    const minMpgY = topMargin + plotHeight - surplus;
    p5.text(min.toLocaleString(), leftMargin - 10, minMpgY + 5); // + 5 to center text vertically
    p5.line(leftMargin - 5, minMpgY, leftMargin + 5, minMpgY);

    // top tick
    const maxMpgY = topMargin + surplus;
    p5.text(max.toLocaleString(), leftMargin - 10, maxMpgY + 5);
    p5.line(leftMargin - 5, maxMpgY, leftMargin + 5, maxMpgY);

    // ticks in between
    // => we'll put this many ticks:
    const numVertTicks = 5;
    // so each tick represents this much mpg:
    const hpDelta = (max - min) / numVertTicks;

    for (let i = 0; i < numVertTicks - 1; i++) {
      const x = leftMargin;
      const y = minMpgY - (i + 1) * hpDelta * pixelsPerMpg;
      p5.text((min + (i + 1) * hpDelta).toLocaleString(), x - 10, y + 5);
      p5.line(x - 5, y, x + 5, y);
    }
    p5.textAlign(p5.LEFT);

    if (Object.entries(data).length > 0) {
      // @ts-ignore
      p5.push();
      STATE_NAMES.forEach((stateName: string, index: number) => {
        const total =
          // @ts-ignore
          data?.State[stateName]?.infected + data?.State[stateName]?.deceased;
        p5.fill(0, 80, 0);
        const rwdHeight = pixelsPerMpg * total;
        const rwdX = leftMargin + 50 * (index + 1);
        p5.rect(rwdX, topMargin + plotHeight - rwdHeight, barWidth, rwdHeight);
        p5.fill(0);
        p5.strokeWeight(0);
        p5.text(
          SHORT_STATE_NAMES[index],
          rwdX - 5,
          topMargin + plotHeight + 20
        );
      });
      p5.pop();
    }

    p5.fill(0);
  };

  const windowResized = (p5: p5Types) =>
    p5.resizeCanvas(canvasWidth, 500, true);

  return { setup, draw, windowResized, STATE_NAMES };
};
