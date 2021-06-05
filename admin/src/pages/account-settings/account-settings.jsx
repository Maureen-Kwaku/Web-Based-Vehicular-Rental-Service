import * as React from "react";
import BreadCrumb from "../../components/breadcrumb";
import cn from "classnames";
import { useQueryStrings } from "../../components/hooks";
import { Link } from "react-router-dom";
import Profile from "./profile";
import { PageLoader } from "../../components/loaders";
import Security from "./security";

const Settings = () => {
  React.useEffect(() => {
    document.title = "Account Settings - Rent-A-Ride Dashboard";
  }, []);
  const [tab, setTab] = React.useState("profile");
  const query = useQueryStrings();

  React.useEffect(() => {
    if (query.get("tab") === undefined || !query.get("tab")) {
      setTab("profile");
    } else setTab(query.get("tab"));
  }, [query]);

  return (
    <React.Fragment>
      <div className={"mt-5"}>
        <BreadCrumb name={"Account Settings"} />
      </div>

      <div className={"border-none"}>
        <main className="max-w-7xl mx-auto pb-10 lg:py-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
              <nav className="space-y-1">
                <Link
                  to="/settings?tab=profile"
                  className={cn(
                    "group rounded-md px-3 py-2 flex items-center text-sm font-medium",
                    {
                      "text-gray-900 bg-gray-200": tab === "profile",
                      "text-gray-900 hover:text-gray-900 hover:bg-gray-50": !(
                        tab === "profile"
                      ),
                    }
                  )}
                >
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
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
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="truncate">Profile</span>
                </Link>

                <Link
                  to="/settings?tab=security"
                  className={cn(
                    "group rounded-md px-3 py-2 flex items-center text-sm font-medium",
                    {
                      "text-gray-900 bg-gray-200": tab === "security",
                      "text-gray-900 hover:text-gray-900 hover:bg-gray-50": !(
                        tab === "security"
                      ),
                    }
                  )}
                >
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="truncate">Security</span>
                </Link>
              </nav>
            </aside>

            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <React.Suspense fallback={PageLoader()}>
                {tab === "profile" ? <Profile /> : <Security />}
              </React.Suspense>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Settings;
