import React from 'react';
import { AppRouter } from "./router";
import { Authenticated } from "./components";

function App() {
  return (
    <Authenticated>
      <AppRouter />
    </Authenticated>
  );
}
export default App;
