import { Home } from "../pages/Home";
import { NewRoom } from "../pages/NewRoom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Room } from "../pages/Room";
import { AdminRoom } from "../pages/AdminRoom";
import { SearchRoom } from "../pages/SearchRoom";
import { ToggleTheme } from "../compoments/ToggleTheme";
export const Routes = () => {
  return (
    <BrowserRouter>
      <ToggleTheme/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
        <Route path="/admin/rooms/:id" component={AdminRoom} />
        <Route path="/search/rooms/:id" component={SearchRoom} />
      </Switch>
    </BrowserRouter>
  );
};
