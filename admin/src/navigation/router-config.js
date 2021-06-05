import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CenterLoader } from "../components/loaders";
import { LOGIN, MAIN_LAYOUT, NOT_FOUND } from "./constants";
import HandleNotFound from "./handle-not-found";

const LoginPage = React.lazy(() => import("../pages/login"));
const Layout = React.lazy(() => import("../shared/layout"));

const RouterConfig = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <React.Suspense fallback={CenterLoader()}>
          <Switch>
            <Route exact={true} component={LoginPage} path={LOGIN} />
            {/* handle 404s */}
            <Route component={Layout} path={MAIN_LAYOUT} />
            <Route exact={true} component={HandleNotFound} path={NOT_FOUND} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default RouterConfig;
