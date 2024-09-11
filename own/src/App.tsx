import "./App.css";
import RouteModule from "./routes/RouteModule";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/them/theme";
function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <RouteModule />
      </ChakraProvider>
    </>
  );
}

export default App;
