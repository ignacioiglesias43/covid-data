// TODO: Añadir colores aqui

interface PaletteColor {
  primary: MainColor;
  secondary: MainColor;
}

interface MainColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

const colors: PaletteColor = {
  primary: {
    light: "#7986cb",
    main: "#3f51b5",
    dark: "#303f9f",
    contrastText: "#fff",
  },
  secondary: {
    light: "#ff4081",
    main: "#f50057",
    dark: "#c51162",
    contrastText: "#fff",
  },
};

export default colors;
