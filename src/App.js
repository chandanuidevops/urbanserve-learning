import RootApp from "./Containers/RootApp/index";
import { store } from "./Stores/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <Router>
          <RootApp />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
