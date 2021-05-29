import { Box } from "@material-ui/core";
import { useAlertStyles } from "../../hooks/styleHooks";
import { CustomAlertProps } from "../../interfaces/alert";

const CustomAlert = ({
  title,
  subtitle,
  icon,
  color = "warning",
  textColor,
}: CustomAlertProps) => {
  const classes = useAlertStyles(color, textColor);

  return (
    <Box boxShadow={1} className={classes.main}>
      <div className={classes.content}>
        <span className={classes.title}>
          <strong>{title}</strong>
        </span>
        <span>
          <strong>{subtitle}</strong>
        </span>
      </div>
      {icon}
    </Box>
  );
};

export default CustomAlert;
