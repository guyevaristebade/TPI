import { AppRouter } from "./router";
import { AuthProvider } from "./contexts";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </div>
  );
}
export default App;
