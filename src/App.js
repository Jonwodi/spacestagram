import "./App.css";
import { useNavigate } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicApiApod from "./pages/PublciApiApod";
import PublicApiMars from "./pages/PublicApiMars";

export default function App() {
  const navigate = useNavigate();
  return (
    // <BrowserRouter history={navigate}>
    <Routes>
      <Route
        exact
        path="/apod"
        element={<PublicApiApod />}
        render={(props) => <PublicApiApod {...props} />}
      />
      <Route
        exact
        path="/mars"
        element={<PublicApiMars />}
        render={(props) => <PublicApiMars {...props} />}
      />
    </Routes>
    // </BrowserRouter>
  );
}
