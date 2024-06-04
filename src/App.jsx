import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          {/* <Route path='/' element={< />}></Route> */}
          {/* <Route path='/' element={< />}></Route> */}
          {/* <Route path='/' element={< />}></Route> */}
          {/* <Route path='/' element={< />}></Route> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
