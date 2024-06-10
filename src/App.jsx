import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import VehiclesList from './components/VehiclesList/VehiclesList';
import VehicleDetails from './components/VehicleDetails/VehicleDetails';
import PartsList from './components/PartsList/PartsList';
import PartDetails from './components/PartDetails/PartDetails';
import AddVehicle from './components/AddVehicle/AddVehicle';
import AddPart from './components/AddPart/AddPart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/vehicles' element={<VehiclesList />}></Route>
          <Route path='/vehicles/:id' element={<VehicleDetails />}></Route>
          <Route path='/vehicles/add' element={<AddVehicle />}></Route>
          <Route path='/parts' element={<PartsList />}></Route>
          <Route path='/parts/:id' element={<PartDetails />}></Route>
          <Route path='/parts/add' element={<AddPart />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
