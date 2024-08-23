import { BrowserRouter, Routes, Route } from 'react-router-dom';

// page imports
import Home from "./pages/Home";
import Events from "./pages/Events";
import Teams from "./pages/Teams";
import Forms from "./pages/Forms";
import NavBar from "./components/NavBar";
import Fields from "./pages/Fields";
import EventInput from "./pages/EventInput"
import Data from "./pages/Data"


function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="events" element={<Events />} />
              <Route path="teams" element={<Teams/>} />
              <Route path="forms" element={<Forms/>} />
              <Route path="forms/:formId" element={<Fields/>} />
              <Route path = "events/:formId" element={<EventInput/>}/>
              <Route path = "data/:eventId" element = {<Data/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;