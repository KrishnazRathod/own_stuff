import "./App.css";
import RouteModule from "./routes/RouteModule";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import theme from "./styles/them/theme";
import store from "./redux/store/store";
function App() {
  return (
    <>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <RouteModule />
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default App;
