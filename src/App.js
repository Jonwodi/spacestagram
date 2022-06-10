import "./App.css";
import { useNavigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PublicApi from "./pages/PublicApi";

export default function App() {
  // const navigate = useNavigate();
  return (
    // <BrowserRouter history={navigate}>
    <PublicApi />
    // </BrowserRouter>
  );
}
