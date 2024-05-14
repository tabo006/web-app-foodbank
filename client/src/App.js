import './App.css';
import Nav from './components/Nav'; 
import Home from './components/Home';
import Form from './components/form';
import Sadmin from './components/Sadmin';
import Svolun from './components/Svolun';
import Sclient from './components/Sclient';
import Ordervalid from './components/ordervalid';
import AdminHome from './components/adminHome';
import Prompt from './components/Prompt';
import Allforms from './components/allforms';
import Viewform from './components/viewform';
import Submittedforms from './components/submittedforms';
import Sviewform from './components/Sviewform';
import Approvedforms from './components/approvedforms';
import Aviewform from './components/Aviewform';
import Completedforms from './components/completedforms';
import Cviewform from './components/cviewform';
import Incompleteforms from './components/incompleteforms';
import Iviewform from './components/iviewform';
import Loggedforms from './components/loggedforms';
import Lviewform from './components/lviewfrom';
import Allitems from './components/allitems';
import Itemsin from './components/itemsin';
import Itemsout from './components/itemsout';
import Edititem from './components/edititem';
import Additem from './components/additem';
import Volunhome from './components/volunhome';
import Vsubmittedforms from './components/Vsubmittedforms';
import Vviewform from './components/Vviewform';
import Activeforms from './components/activeforms';
import Acviewform from './components/Acviewform';
import Formfruits from './components/formfruits';
import Formvegetables from './components/formvegetables';
import Formdried from './components/formdried';
import Formmeat from './components/formmeat';
import Formothers from './components/formothers';
import Outofstock from './components/outofstock';
import Fhome from './components/fhome';
import Anav from './components/Anav';
import Policies from './components/policies';
import Searchresult from './components/searchresult';
import Cinstock from './components/Cinstock';
import Climit from './components/climit';
import Editlimit from './components/editlimit';
import { BrowserRouter as Router, Routes, Route,createBrowserRouter,createRoutesFromElements, RouterProvider, } from 'react-router-dom';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Home />} />

    <Route path='/Sadmin' element={<Sadmin/>} />
      <Route path='/Svolun' element={<Svolun/>} />
      <Route path='/form' element={<Form/>} />
      <Route path='/Sclient' element={<Sclient/>} />
      <Route path='/ordervalid' element={<Ordervalid/>} />
      <Route path= '/adminHome' element={<AdminHome/>} />
      <Route path= '/allforms' element={<Allforms/>} />
      <Route path= '/allitems' element={<Allitems/>} />
      <Route path= '/viewform' element={<Viewform/>} />
      <Route path= '/submittedforms' element={<Submittedforms/>} />
      <Route path= '/sviewform' element={<Sviewform/>} />
      <Route path= '/aviewform' element={<Aviewform/>} />
      <Route path= '/approvedforms' element={<Approvedforms/>} />
      <Route path= '/completedforms' element={<Completedforms/>} />
      <Route path= '/cviewform' element={<Cviewform/>} />
      <Route path= '/iviewform' element={<Iviewform/>} />
      <Route path= '/incompleteforms' element={<Incompleteforms/>} />
      <Route path= '/loggedforms' element={<Loggedforms/>} />
      <Route path= '/lviewform' element={<Lviewform/>} />
      <Route path= '/itemsin' element={<Itemsin/>} />
      <Route path= '/itemsout' element={<Itemsout/>} />
      <Route path= '/edititem' element={<Edititem/>} />
      <Route path= '/additem' element={<Additem/>} />
      <Route path= '/volunhome' element={<Volunhome/>} />
      <Route path= '/vsubmittedforms' element={<Vsubmittedforms/>} />
      <Route path= '/vviewform' element={<Vviewform/>} />
      <Route path= '/activeforms' element={<Activeforms/>} />
      <Route path= '/acviewform' element={<Acviewform/>} />
      <Route path= '/formfruits' element={<Formfruits/>} />
      <Route path= '/formvegetables' element={<Formvegetables/>} />
      <Route path= '/formdried' element={<Formdried/>} />
      <Route path= '/formmeat' element={<Formmeat/>} />
      <Route path= '/formothers' element={<Formothers/>} />
      <Route path= '/outofstock' element={<Outofstock/>} />
      <Route path= '/fhome' element={<Fhome/>} />
      <Route path= '/anav' element={<Anav/>} />
      <Route path= '/policies' element={<Policies/>} />
      <Route path= '/searchresult' element={<Searchresult/>} />
      <Route path= '/cinstock' element={<Cinstock/>} />
      <Route path= '/climit' element={<Climit/>} />
      <Route path= '/editlimit' element={<Editlimit/>} />
      </>

  )
);

function App() {
  return (
    <body>
    <RouterProvider router={router} />
    </body>

  );
}
export default App;
