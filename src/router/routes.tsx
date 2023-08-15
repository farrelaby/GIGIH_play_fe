import Home from ".";
import Video from "./[id]";

export const appRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/:id",
    component: <Video />,
  },
];
