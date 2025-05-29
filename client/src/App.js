import {Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Aboutpage from './pages/Aboutpage';
import Policypage from './pages/Policypage';
import Pagenotfound from './pages/Pagenotfound';
import Newblogs from './pages/Newblogs';
import Detailpage from './pages/detailpage';
import Updateblogs from './pages/updateblog'
import Search from './pages/search';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PrivateRoute from './components/Routes/Private';




function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='' element={<PrivateRoute/>}>
      <Route path='/newblogs' element={<Newblogs/>}/>
      </Route> 
      <Route path='/blogs/:slug' element={<Detailpage/>}/>
      <Route path='/blog/:slug' element={<Updateblogs/>}/>
      <Route path='/about' element={<Aboutpage/>}/>
      <Route path='/policy' element={<Policypage/>}/>
      <Route path='/*' element={<Pagenotfound/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
     
    </>
  );
}

export default App;
