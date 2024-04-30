import React from 'react';
import { AppRouter } from "./router";
import AuthProvider from "react-auth-kit";
import {store} from "./helpers";

function App() {
  return (
    <AuthProvider store={store}>
        <AppRouter/>
    </AuthProvider>
  );
}
export default App;
