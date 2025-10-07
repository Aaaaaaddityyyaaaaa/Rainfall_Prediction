import { Outlet } from "react-router";

export default function Header()
{
  return <><header className="">
    <h1 className="bg-blue-500 text-white px-4 py-2 rounded-lg">Rain Prediction</h1></header><Outlet/></>
}