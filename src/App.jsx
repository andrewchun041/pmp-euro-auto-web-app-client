import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path='/' element={< />}></Route> */}
          {/* <Route path='/' element={< />}></Route> */}
          {/* <Route path='/' element={< />}></Route> */}
          {/* <Route path='/' element={< />}></Route> */}
          {/* <Route path='/' element={< />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
