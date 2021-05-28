import { Button, ThemeProvider } from "@material-ui/core";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary">
        Hola Mundo!
      </Button>
    </ThemeProvider>
  );
}

export default App;
