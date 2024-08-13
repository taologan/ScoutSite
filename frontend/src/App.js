import { BrowserRouter, Routes, Route } from 'react-router-dom';

// page imports
import Home from "./pages/Home";
import Events from "./pages/Events";

// component imports
import NavBar from "./components/NavBar";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="events" element={<Events />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;