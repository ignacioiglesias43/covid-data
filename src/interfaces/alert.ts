export interface CustomAlertProps {
  title: String;
  subtitle: String;
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
