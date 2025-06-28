import { BrowserRouter } from "react-router";
import AppRoutes from "./routers/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
