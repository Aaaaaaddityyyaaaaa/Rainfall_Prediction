import { createBrowserRouter, createRoutesFromElements, Link, Route, RouterProvider } from "react-router";
import Header from "./components/Header";
import Home from "./page/home";
import { action } from "./components/Form";

export default function App() {
  const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element = {<Header/>}>
    <Route index element={<Home/>} action={action} errorElement={<><h1>Server Error</h1>
    <Link to={"/"}>Back</Link>
    </>}/>
  </Route>
  )
)
  return <RouterProvider router={router} />
}
