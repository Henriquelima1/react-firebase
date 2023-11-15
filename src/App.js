import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuPrincipal from './componentes/MenuPrincipal';
import Sobre from './componentes/Sobre';
import NotFound from './componentes/NotFound';
import Home from './componentes/telas/home/Home';
import Login from './componentes/telas/login/Login';
import Manutencao from './componentes/telas/manutencao/Manutencao';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPrincipal/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sobre",
        element: <Sobre />,
      },  
      {
        path: "Login",
        element: <Login />,
      },     
      {
        path: "manutencao",
        element: <Manutencao />,
      },       
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;