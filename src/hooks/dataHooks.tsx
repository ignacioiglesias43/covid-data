import { useEffect, useState } from "react";
import { getMainData } from "../api/api";
import {
  EmoticonSick,
  PlusCircle,
  EmoticonDead,
  EmoticonHappy,
  HelpCircle,
} from "mdi-material-ui";
import { CustomAlertProps } from "../interfaces/alert";
import { MainData } from "../interfaces/mainData";

export const useMainData = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<MainData>({});
  const [states, setStates] = useState({});
  const [alerts, setAlerts] = useState<CustomAlertProps[]>([
    {
      title: "Confirmados",
      searchKey: "confirmed",
      subtitle: "\n",
      color: "error",
      icon: <PlusCircle />,
      textColor: "white",
    },
    {
      title: "Defunciones",
      searchKey: "deceased",
      subtitle: "\n",
      color: "primary",
      icon: <EmoticonDead />,
      textColor: "white",
    },
    {
      title: "Activos",
      searchKey: "infected",
      subtitle: "\n",
      color: "success",
      icon: <EmoticonSick />,
      textColor: "white",
    },
    {
      title: "Negativos",
      subtitle: "\n",
      searchKey: "negative",
      color: "secondary",
      icon: <EmoticonHappy />,
      textColor: "white",
    },
    {
      title: "Sospechosos",
      searchKey: "suspected",
      subtitle: "\n",
      color: "warning",
      icon: <HelpCircle />,
      textColor: "white",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      try {
        setOpen(true);
        const response = await getMainData();
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData().finally(() => setOpen(false));
  }, []);

  useEffect(() => {
    if (Object.entries(data).length > 0) {
      const newAlerts: CustomAlertProps[] = [...alerts];
      const keys = Object.keys(data);

      keys.forEach((k) => {
        newAlerts.forEach((a) => {
          if (a.searchKey === k) {
            a.subtitle = data[
              k as keyof MainData
            ]?.toLocaleString() as keyof CustomAlertProps;
          } else {
            if (a.searchKey === "confirmed") {
              const infected = data?.infected || 0;
              const deceased = data?.deceased || 0;
              a.subtitle = Number(
                `${infected + deceased}`
              ).toLocaleString() as keyof CustomAlertProps;
            }
          }
        });
      });
      setAlerts([...newAlerts]);
      setStates({ ...data.State });
    }
  }, [alerts, data]);

  return {
    open,
    data,
    states,
    alerts,
  };
};
