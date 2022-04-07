import style from './App.module.css';
import Header from './components/header/header';
import Login from './pages/login';
import Register from './pages/register';
import DishMenu from './components/dishMenu/dishMenu';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './components/footer/footer';
import Layout from './components/layout/layout';
import AddDish from './pages/addDish';


function App(){
  


  const header = (
    <Header/>
  )
  const content = (
    <Routes>
      <Route path="/" element={<DishMenu/>}/>
      <Route path='/logowanie' element={<Login/>}/>
      <Route path='/rejestracja' element={<Register/>}/>
      <Route path='/dodaj-potrawe' element={<AddDish/>}/>
    </Routes>
  )
  const footer = (
    <Footer/>
  )
          
          


  return (
    <Router>
        <Layout
          header={header}
          content={content}
          footer={footer}
        />
    </Router>
    
  );
}

export default App;
