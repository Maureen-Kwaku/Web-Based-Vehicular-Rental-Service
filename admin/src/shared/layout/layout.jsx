import * as React from "react";
import { useLocation } from "react-router-dom";
import UserMenu from "../../components/user-menu";
import NavLink from "../../components/navlink";
import { PageLoader } from "../../components/loaders";
import { routes } from "../../navigation";
import { ProtectedRoute as Route } from "../../navigation";
import LogoutRequest from "./signout";

const Layout = () => {
  const { pathname } = useLocation();
  const [logoutRequest, setLogoutRequest] = React.useState(false);

  return (
    <React.Fragment>
      <div
        // style={{ height: "100vh" }}
        className={" h-screen w-screen "}
      >
        <header className="bg-gray-800 z-10 sticky top-0">
          <div className="max-w-7xl mx-auto px-2 py-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
            <div className="relative h-20 flex justify-between">
              <div className="relative z-10 px-2 flex lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className={" font-bold  text-white"}>
                    Rent A Ride Service
                    <br /> Admin Panel
                  </h1>
                </div>
              </div>
              <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg
                        className="h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-white-400 focus:outline-none focus:bg-gray-700 focus:border-white focus:ring-white focus:text-white focus:placeholder-white sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                <button
                  type="button"
                  className="rounded-md p-2 inline-flex items-center justify-center text-yellow-400 hover:bg-yellow-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open menu</span>

                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                {/* <button className="bg-yellow-800 flex-shrink-0 rounded-full p-1 text-yellow-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button> */}
                <div className="flex-shrink-0 relative ml-4">
                  <UserMenu onClickLogout={() => setLogoutRequest(true)} />
                </div>
              </div>
            </div>
            <nav className="hidden lg:py-2 lg:flex lg:border-t lg:border-gray-800">
              <NavLink pathname={pathname} />
            </nav>
          </div>
        </header>
        <div className={""}>
          <main className=" max-w-7xl mx-auto px-2 py-2 sm:px-4 lg:divide-y lg:divide-yellow-600 lg:px-8">
            <React.Suspense fallback={PageLoader()}>
              {routes.map((route, i) => (
                <React.Fragment key={i}>
                  <Route
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                  />
                </React.Fragment>
              ))}
            </React.Suspense>
          </main>
        </div>
      </div>
      <LogoutRequest show={logoutRequest} setShow={setLogoutRequest} />
    </React.Fragment>
  );
};

export default Layout;
