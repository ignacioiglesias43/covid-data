import CustomAlert from "../atoms/CustomAlert";
import {
  EmoticonSick,
  PlusCircle,
  EmoticonDead,
  EmoticonHappy,
  HelpCircle,
} from "mdi-material-ui";
import { CustomAlertProps } from "../../interfaces/alert";

const AlertsList = () => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        flexShrink: 2,
        gap: 20,
        marginBottom: 20,
      }}
    >
      {alerts.map((a, index: number) => (
        <CustomAlert
          icon={a.icon}
          subtitle={a.subtitle}
          color={a.color}
          title={a.title}
          textColor={a.textColor}
          key={index}
        />
      ))}
    </div>
  );
};

export default AlertsList;

const alerts: CustomAlertProps[] = [
  {
    title: "Confirmados",
    subtitle: "2,595,027",
    color: "error",
    icon: <PlusCircle />,
    textColor: "white",
  },
  {
    title: "Defunciones",
    subtitle: "240,046",
    color: "primary",
    icon: <EmoticonDead />,
    textColor: "white",
  },
  {
    title: "Activos",
    subtitle: "19,425",
    color: "success",
    icon: <EmoticonSick />,
    textColor: "white",
  },
  {
    title: "Negativos",
    subtitle: "956,251",
    color: "secondary",
    icon: <EmoticonHappy />,
    textColor: "white",
  },
  {
    title: "Sospechosos",
    subtitle: "302,645",
    color: "warning",
    icon: <HelpCircle />,
    textColor: "white",
  },
];
