import * as React from "react";
import { Toaster } from "react-hot-toast";
import AppNavigator from "./services/context";

function App() {
  return (
    <React.Fragment>
      <AppNavigator />
      <Toaster position={"bottom-center"} />
    </React.Fragment>
  );
}

export default App;
