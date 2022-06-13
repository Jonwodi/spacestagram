import "./App.css";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import NasaPublicApis from "./pages/NasaPublicApis";

export default function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<NasaPublicApis />}
        render={(props) => <NasaPublicApis {...props} />}
      />
    </Routes>
  );
}
