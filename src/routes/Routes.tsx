import Configurator from "../pages/Configurator";
import Homepage from "../pages/Homepage";

export const routes = [
  {
    path: "/",
    element: <Homepage />,
    label: "Home",
  },
  {
    path: "/configurator",
    element: <Configurator />,
    label: "Configurator",
  },
];
