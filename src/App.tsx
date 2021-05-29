import { ThemeProvider } from "@material-ui/core";
import Dashboard from "./components/views/Dashboard";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
