import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { LoadingScreen } from "./components/shared/LoadingScreen";
import { routes } from "./router/routes";

const router = createBrowserRouter(routes);

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
