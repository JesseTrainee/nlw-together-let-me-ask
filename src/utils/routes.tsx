import { Home } from "../pages/Home";
import { NewRoom } from "../pages/NewRoom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Room } from "../pages/Room";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
      </Switch>
    </BrowserRouter>
  );
};
