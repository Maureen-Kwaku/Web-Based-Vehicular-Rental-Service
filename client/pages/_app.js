import "../styles/globals.css";
import "../styles/index.css";
import "../styles/about-us.css";
import "../styles/booking.css";
import "../styles/product.css";
import {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useMemo,
  Fragment,
} from "react";
import Auth from "../lib/auth";

export const AuthContext = createContext([]);
export const useAuthContext = () => useContext(AuthContext);

//manipulate context
const Manipulator = (prevState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.userToken,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.userToken,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isLoading: false,
        userToken: null,
        isSignout: true,
      };
    default:
      return prevState;
  }
};

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(Manipulator, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  // listen and set token
  useEffect(() => {
    let userToken = Auth.getCipher();
    let data;
    if (userToken) data = JSON.parse(userToken);
    else data = null;
    dispatch({ type: "RESTORE_TOKEN", userToken: data });
  }, []);

  //control the sign in and sign out of the system
  const authContextController = useMemo(
    () => ({
      signIn: async (token) => {
        return new Promise((resolve, reject) => {
          Auth.setCipher(JSON.stringify(token));
          dispatch({ type: "SIGN_IN", userToken: token });
          resolve(true);
        });
      },
      signOut: () => {
        Auth.clearCipher();
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );

  return (
    <Fragment>
      <AuthContext.Provider value={[authContextController, state]}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </Fragment>
  );
}

export default MyApp;
