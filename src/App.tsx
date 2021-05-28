import { ThemeProvider } from "@material-ui/core";
import P5Sketch from "./components/organisms/P5Sketch";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/*  <Button variant="contained" color="primary">
        Hola Mundo!
      </Button> */}
      <P5Sketch />
    </ThemeProvider>
  );
}

export default App;
