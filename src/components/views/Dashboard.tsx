import { Container, CssBaseline } from "@material-ui/core";

import { useStyles } from "../../hooks/styleHooks";

import CustomAppBar from "../molecules/CustomAppBar";
import AlertsList from "../organisms/AlertsList";
import P5Sketch from "../organisms/P5Sketch";

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CustomAppBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <AlertsList />
          <P5Sketch />
        </Container>
      </main>
    </div>
  );
}
