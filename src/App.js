import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login.js";
import Browse from "./components/Browse";
import { RouterProvider } from "react-router-dom";
function App() {
  const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  
  ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
    
  );
}

export default App;
