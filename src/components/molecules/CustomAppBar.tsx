import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useStyles } from "../../hooks/styleHooks";
import clsx from "clsx";
import { Virus } from "mdi-material-ui";

const CustomAppBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="absolute" className={clsx(classes.appBar)}>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Covid-19
        </Typography>
        <Virus color="inherit" className={classes.icon} />
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
