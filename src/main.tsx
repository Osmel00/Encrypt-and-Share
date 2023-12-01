
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ShowText from './components/ShowText.tsx';
import Form from './components/Form.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:  <App />,
    children:[
      {
        path: "/text/:key",
        element:  <ShowText/>,
      },
      {
        path: "/",
        element:  <Form/>,
      },
    ]
  },
  
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
       <RouterProvider router={router} />
  //</React.StrictMode>,
)
