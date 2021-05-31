import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const useStyles = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between("xs", "lg"));
  const styles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: theme.palette.primary.dark,
    },
    title: {
      flexGrow: 1,
      fontWeight: "bold",
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
      overflowX: "hidden",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    icon: {
      alignSelf: "center",
    },
    sketches: {
      display: "flex",
      flexDirection: matches ? "column" : "row",
      gap: 20,
      marginRight: matches ? 0 : 20,
    },
  }));
  return styles();
};

export const useAlertStyles = (
  color: "primary" | "secondary" | "warning" | "error" | "success" = "warning",
  textColor?: string
) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between("xs", "lg"));

  const styles = makeStyles((theme) => ({
    main: {
      backgroundColor: theme.palette[color].dark,
      padding: 20,
      borderRadius: 5,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      color: textColor || theme.palette[color].contrastText,
      textTransform: "uppercase",
      minWidth: matches ? "100%" : "30rem",
      flexBasis: "30%",
    },
    content: { display: "flex", flexDirection: "column" },
    title: { marginBottom: 5 },
  }));

  return styles();
};

export const useSketchStyles = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between("xs", "lg"));

  const styles = makeStyles((theme) => ({
    container: {
      padding: 20,
      width: matches ? "100%" : "50%",
    },
    titleContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.primary.dark,
    },
    title: {
      marginRight: 10,
    },
    divider: { marginBottom: 20 },
  }));
  return styles();
};
