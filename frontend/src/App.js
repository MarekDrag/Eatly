import style from "./App.module.css";
import Header from "./components/header/header";
import Login from "./pages/login";
import Register from "./pages/register";
import MealPlanner from "./components/mealPlanner/mealPlanner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/footer";
import Layout from "./components/layout/layout";
import AddRecipe from "./pages/addRecipe";
import AuthContext from "./contexts/authContext";
import DateContext from "./contexts/dateContext";
import LoadingContext from "./contexts/loadingContext";
import { useEffect, useState } from "react";
import getCurrentWeek from "./helpers/getCurrentWeek";

function App() {
  const [auth, setAuth] = useState(false);
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let week = getCurrentWeek();
    setDate(week);
  },[])

  const header = <Header />;
  const content = (
    <Routes>
      <Route exact path="/" element={<MealPlanner />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
    </Routes>
  );
  const footer = <Footer />;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <DateContext.Provider value={{ date, setDate }}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <Router>
            <Layout header={header} content={content} footer={footer} />
          </Router>
        </LoadingContext.Provider>
      </DateContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
