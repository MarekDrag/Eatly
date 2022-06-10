import Login from "./pages/login";
import Register from "./pages/register";
import Recipes from "./pages/recipes";
import AddRecipe from "./pages/addRecipe";
import DetailRecipePage from "./pages/detailRecipePage";
import PageNotFound from "./pages/pageNotFound";
import ShopList from "./pages/shopList";
import useAuth from "./hooks/useAuth";
import MealPlanner from "./components/mealPlanner/mealPlanner";
import { BrowserRouter as Route, Routes, Navigate, Outlet } from "react-router-dom";

function PrivateRoute(){
  const auth=useAuth();

  return auth?<Outlet/>: <Navigate to="/zaloguj-sie"/>
}

function PublicRoute(){
  const auth=useAuth();

  return auth? <Navigate to="/planer-posilkow"/>:<Outlet/>
}

const Routing = () => (
    <Routes>
      {/* Public Routes */}
      {/* Wrap all Route under PublicRoutes element */}
      <Route path="/" element={<PublicRoute/>}>
        <Route path="/zaloguj-sie" element={<Login />} />
        <Route path="/zarejstruj-sie" element={<Register />} />
      </Route>
      {/* Private Routes */}
      {/* Wrap all Route under PrivateRoutes element */}
      <Route path='/' element={<PrivateRoute/>}>
        <Route path="/planer-posilkow" element={<MealPlanner/>}/>
        <Route path="/zakupy" element={<ShopList/>}/>
        <Route path="/przepisy" element={<Recipes/>}/>
        <Route path="/przepisy/:id" element={<DetailRecipePage/>}/>
        <Route path="/przepisy/dodaj-przepis" element={<AddRecipe/>}/>
      </Route>
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
)

export default Routing;