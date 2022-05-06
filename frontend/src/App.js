import style from "./App.module.css";
import Header from "./components/header/header";
import Login from "./pages/login";
import Register from "./pages/register";
import MealPlanner from "./components/mealPlanner/mealPlanner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Layout from "./components/layout";
import AddRecipe from "./pages/addRecipe";
import AuthContext from "./contexts/authContext";
import DateContext from "./contexts/dateContext";
import { useEffect, useState } from "react";
import getCurrentWeek from "./helpers/getCurrentWeek";

function App() {
  const [auth, setAuth] = useState(false);
  const [date, setDate] = useState([]);

  useEffect(() => {
    let week = getCurrentWeek();
    setDate(week);
  },[])

  const header = <Header />;
  const content = (
    <Routes>
      <Route exact path="/planer-posilkow" element={<MealPlanner/>} />
      <Route path="/przepisy/sniadanie" element={<Login />} />
      <Route path="/przepisy/obiad" element={<Login />} />
      <Route path="/przepisy/kolacja" element={<Login />} />
      <Route path="/zaloguj-sie" element={<Login />} />
      <Route path="/zarejstruj-sie" element={<Register />} />
      <Route path="/dodaj-przepis" element={<AddRecipe />} />
    </Routes>
  );
  const footer = <Footer />;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <DateContext.Provider value={{ date, setDate }}>
          <Router>
            <Layout 
              header={header} 
              content={content} 
              footer={footer} />
          </Router>
      </DateContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
