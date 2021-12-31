// tools
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';

// styles
import './App.css';

function App() {
  // useAuthContext hook
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      { authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={ user ? <Home /> : <Login /> } />
            <Route path='/login' element={ !user ? <Login /> : <Home /> } />
            <Route path='/signup' element={ !user ? <Signup /> : <Home /> } />
          </Routes>
        </BrowserRouter>
      ) }
    </div>
  );
}

export default App;
