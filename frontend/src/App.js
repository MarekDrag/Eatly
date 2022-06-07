import style from "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Recipes from "./pages/recipes";
import AddRecipe from "./pages/addRecipe";
import Header from "./components/header/header";
import MealPlanner from "./components/mealPlanner/mealPlanner";
import Footer from "./components/footer";
import Layout from "./components/layout";
import AuthContext from "./contexts/authContext";
import DateContext from "./contexts/dateContext";
import { useEffect, useState } from "react";
import getCurrentWeek from "./helpers/getCurrentWeek";
import DetailRecipePage from "./pages/detailRecipePage";
import PageNotFound from "./pages/pageNotFound";
import ShopList from "./pages/shopList";

function App() {
  const [auth, setAuth] = useState(false);
  const [date, setDate] = useState([]);

  useEffect(() => {
    let week = getCurrentWeek();
    setDate(week);
  }, []);

  

  const content = (
    <Routes>
      <Route path="/planer-posilkow" element={<MealPlanner />} />
      <Route path="/przepisy" element={<Recipes />} />
      <Route path="/przepisy/:id" element={<DetailRecipePage/>}/>
      <Route path="/przepisy/dodaj-przepis" element={<AddRecipe />} />
      <Route path="/zakupy" element={ <ShopList/>} />
      <Route path="/zaloguj-sie" element={<Login />} />
      <Route path="/zarejstruj-sie" element={<Register />} />
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
