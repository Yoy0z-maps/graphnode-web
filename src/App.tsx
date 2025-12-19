import { Route, Routes } from "react-router-dom";
import "./App.css";
import Status from "./routes/Status";
import Home from "./routes/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/status" element={<Status />} />
    </Routes>
  );
}

export default App;
