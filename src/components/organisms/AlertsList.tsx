import CustomAlert from "../atoms/CustomAlert";
import { CustomAlertProps } from "../../interfaces/alert";

interface AlertListProps {
  data: CustomAlertProps[];
}

const AlertsList = ({ data }: AlertListProps) => {
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
      {data.map((a, index: number) => (
        <CustomAlert
          icon={a.icon}
          subtitle={a.subtitle}
          color={a.color}
          title={a.title}
          textColor={a.textColor}
          searchKey={a.searchKey}
          key={index}
        />
      ))}
    </div>
  );
};

export default AlertsList;
