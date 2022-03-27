import style from './App.module.css';
import Header from './components/header/header';
import Login from './components/login/login';
import Register from './components/register/register';
import DishMenu from './components/dishMenu/dishMenu';

function App() {
  return (
    <div className="App">
      <Header/>
      <DishMenu/>
    </div>
  );
}

export default App;
