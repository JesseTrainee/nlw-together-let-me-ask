import { Home } from "../pages/Home";
import { NewRoom } from "../pages/NewRoom";
import { BrowserRouter, Route } from "react-router-dom";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/rooms/new" component={NewRoom} />
    </BrowserRouter>
  );
};
