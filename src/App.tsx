import { Route, Routes } from "react-router-dom";
import "./App.css";
import Status from "./routes/Status";
import Home from "./routes/Home";
import Feedback from "./routes/Feedback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/status" element={<Status />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  );
}

export default App;
