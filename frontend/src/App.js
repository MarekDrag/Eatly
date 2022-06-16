import style from "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Recipes from "./pages/recipes";
import AddRecipe from "./pages/addRecipe";
import Header from "./components/header/header";
import MealPlanner from "./pages/mealPlanner";
import Footer from "./components/footer";
import Layout from "./components/layout";
import AuthContext from "./contexts/authContext";
import DateContext from "./contexts/dateContext";
import {  useEffect, useState } from "react";
import DetailRecipePage from "./pages/detailRecipePage";
import PageNotFound from "./pages/pageNotFound";
import ShopList from "./pages/shopList";
import useDate from "./hooks/useDate";
import useAuth from "./hooks/useAuth";
import MyAccount from "./pages/myAccount";

function App() {
  const [auth , setAuth] = useState(false);
  const [date, setDate] = useDate();
  const user = useAuth();

  useEffect(() => {
    if(user){
      setAuth(true);
    }
  },[])

  function PrivateRoute(){
  
    return auth?<Outlet/>: <Navigate to="/zaloguj-sie"/>
  }

  function PublicRoute(){
  
    return auth? <Navigate to="/planer-posilkow"/>:<Outlet/>
  }

  const content = (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute/>}>
        <Route exact path="/zaloguj-sie" element={<Login />} />
        <Route path="/zarejstruj-sie" element={<Register />} />
      </Route>
      {/* Private Routes */}
      <Route path='/' element={<PrivateRoute/>}>
        <Route path="/planer-posilkow" element={<MealPlanner/>}/>
        <Route path="/zakupy" element={<ShopList/>}/>
        <Route path="/przepisy" element={<Recipes/>}/>
        <Route path="/przepisy/:id" element={<DetailRecipePage/>}/>
        <Route path="/przepisy/dodaj-przepis" element={<AddRecipe/>}/>
        <Route path="/moje-konto" element={<MyAccount/>}/>
      </Route>
      {/* 404 Page */}
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <DateContext.Provider value={{ date, setDate }}>
        <Router>
          <Layout 
          header={ <Header />} 
          content={content} 
          footer={<Footer />} />
        </Router>
      </DateContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
