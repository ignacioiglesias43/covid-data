import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const useStyles = makeStyles((theme) => ({
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
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const useAlertStyles = (
  color: "primary" | "secondary" | "warning" | "error" | "success" = "warning",
  textColor?: string
) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between("sm", "lg"));

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