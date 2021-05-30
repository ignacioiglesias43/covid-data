import {
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { useMainData } from "../../hooks/dataHooks";
import { useStyles } from "../../hooks/styleHooks";

import CustomAppBar from "../molecules/CustomAppBar";
import AlertsList from "../organisms/AlertsList";
import P5Sketch from "../organisms/P5Sketch";

export default function Dashboard() {
  const classes = useStyles();
  const { open, alerts } = useMainData();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CustomAppBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <AlertsList data={alerts} />
          <P5Sketch />
        </Container>
      </main>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}
