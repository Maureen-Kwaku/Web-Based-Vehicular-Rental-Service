import { Route, Redirect } from "react-router-dom";
import Auth from "../services/cookie.config";

const PrivateRoute = ({ component: Component, path, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        let token = Auth.getCipher();
        if (!token) {
          return <Redirect to={{ pathname: "/login" }} />;
        }
        return <Component />;
      }}
    />
  );
};

export default PrivateRoute;
