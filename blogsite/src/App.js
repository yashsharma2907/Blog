import logo from './logo.svg';
import Header from './header';
import Post from './posts';
import Loginpage from './pages/Loginpage';
import Page from './pages/Page';
import Layout from './Layout';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {UserContextProvider} from "./UserContext";
import Register from './pages/Register';
import PostCreate from './pages/PostCreate';
import PagePost from './pages/PagePost';
function App() {
  return (
    <UserContextProvider>
    <Routes>
       <Route path="/" element={<Layout />}>
       <Route index element={<Page />} />
       <Route path="/login" element={<Loginpage />} />
       <Route path="/Register" element={<Register />} />
       <Route path="/create" element={<PostCreate/>}/>
       <Route path="/post/:id" element={<PagePost/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
