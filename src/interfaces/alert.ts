export interface CustomAlertProps {
  title: string;
  searchKey: string;
  subtitle: string;
  icon: JSX.Element;
  color?: AlertColor;
  textColor?: string;
}

export type AlertColor =
  | "primary"
  | "secondary"
  | "warning"
  | "error"
  | "success";
