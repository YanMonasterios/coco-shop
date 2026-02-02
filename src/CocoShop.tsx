import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"

 
export const CocoShop = () => {
  return (
    <RouterProvider router={appRouter} />
  )
}
