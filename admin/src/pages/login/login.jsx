import { useMutation } from "@apollo/client";
import * as React from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import { useAuthProvider } from "../../services/context";
import { LOGIN } from "../../services/graphql/mutations";

const Login = () => {
  const { push } = useHistory();
  const [{ signOut, signIn }] = useAuthProvider();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    document.title = "Login - Rent A Ride Dashboard";
    signOut();
  }, [signOut]);

  const [login, { loading }] = useMutation(LOGIN);

  const HandleSubmit = (e) => {
    e.preventDefault();
    toast.remove();
    login({
      variables: {
        email,
        password,
      },
    })
      .then(async ({ data }) => {
        if (data) {
          await signIn(data?.loginAdmin);
          push("/");
        }
      })
      .catch((e) => {
        return toast.error("Your email and/or password is incorrect");
      });
  };

  return (
    <React.Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Rent-A-Ride Dashboard
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Information Access - Admin Sign In
            </p>
          </div>
          <form onSubmit={HandleSubmit} className="mt-8 space-y-4">
            <input type="hidden" name="remember" value="true" />
            {/* <div className="rounded-md shadow-sm -space-y-px"> */}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none  relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Email address eg. johndoe@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Password eg. **********"
              />
            </div>
            {/* </div> */}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm"></div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-yellow-200 group-hover:text-yellow-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                {loading ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>
          <div className={"flex flex-col items-center"}>
            <span className={"italic"}>Engineered by Me</span>
            <span className={"text-center text-gray-500"}>
              Copyright {new Date().getFullYear()}. All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
