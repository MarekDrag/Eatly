import style from './App.module.css';
import Header from './components/header/header';
import Login from './pages/login';
import Register from './pages/register';
import MealPlanner from './components/mealPlanner/mealPlanner';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './components/footer/footer';
import Layout from './components/layout/layout';
import AddDish from './pages/addDish';
import AuthContext from './contexts/authContext';
import { useEffect, useState } from 'react';


function App(){
  const [auth, setAuth] = useState(false)
  


  const header = (
    <Header/>
  )
  const content = (
    <Routes>
      <Route exact path="/" element={<MealPlanner/>}/>
      <Route path='/logowanie' element={<Login/>}/>
      <Route path='/rejestracja' element={<Register/>}/>
      <Route path='/dodaj-potrawe' element={<AddDish/>}/>
    </Routes>
  )
  const footer = (
    <Footer/>
  )

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      <Router>
          <Layout
            header={header}
            content={content}
            footer={footer}
          />
      </Router>
    </AuthContext.Provider>
    
  );
}

export default App;
