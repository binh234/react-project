import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
