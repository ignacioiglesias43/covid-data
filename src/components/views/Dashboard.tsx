import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { MapMarker } from "mdi-material-ui";

import { useMainData } from "../../hooks/dataHooks";
import { useMappa, useChart } from "../../hooks/p5Hooks";
import { useStyles } from "../../hooks/styleHooks";

import CustomAppBar from "../molecules/CustomAppBar";
import AlertsList from "../organisms/AlertsList";
import P5Sketch from "../organisms/P5Sketch";

export default function Dashboard() {
  const classes = useStyles();
  const { open, alerts, states } = useMainData();

  const { preload, draw, setup, windowResized, handleCenterMap } =
    useMappa(states);

  const {
    draw: chartDraw,
    setup: setupChart,
    windowResized: windowResizedChart,
  } = useChart();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CustomAppBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <AlertsList data={alerts} />
          <div className={classes.sketches}>
            <P5Sketch
              title="Mapa de Casos Confirmados"
              draw={draw}
              setup={setup}
              preload={preload}
              windowResized={windowResized}
              id="mappa"
            />
            <Button
              color="primary"
              startIcon={<MapMarker />}
              className={classes.centerMapBtn}
              variant="contained"
              onClick={handleCenterMap}
            >
              Centrar mapa
            </Button>
            <P5Sketch
              id="chart"
              title="Gráfica de Casos Confirmados"
              draw={chartDraw}
              setup={setupChart}
              windowResized={windowResizedChart}
            />
          </div>
        </Container>
      </main>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}
