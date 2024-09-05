//components
import Home from "./components/Home.jsx";
import DataProvider from "./context/DataProvider.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

function App() {
  return (
    <Provider store={store}>
      <DataProvider>
        <Home />
      </DataProvider>
    </Provider>
  );
}

export default App;
