import * as React from "react";
import BreadCrumb from "../../components/breadcrumb";
import Rentals from "./components/rentals";
import Cars from "./components/cars";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_STATISTICS } from "../../services/graphql/queries";

const Overview = () => {
  const { data, loading } = useQuery(GET_STATISTICS);
  React.useEffect(() => {
    document.title = "Welcome - Rent-A-Ride Dashboard";
  }, []);
  return (
    <React.Fragment>
      <div className={"h-full w-full"}>
        <div className={"mt-5"}>
          <BreadCrumb name={"Overview And Statistics"} />
        </div>

        {/* cars */}
        <div className={"mt-10"}>
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Pinned Overview
          </h2>
          <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <li className="col-span-1 flex shadow-sm rounded-md">
              <div className="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm font-medium rounded-l-md">
                U
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                  <Link
                    to="/users"
                    className="text-gray-900 font-medium hover:text-gray-600"
                  >
                    Users
                  </Link>
                  <p className="text-gray-500">
                    {loading
                      ? "loading..."
                      : `${data?.statistics?.users} Member(s)`}
                  </p>
                </div>
              </div>
            </li>

            <li className="col-span-1 flex shadow-sm rounded-md">
              <div className="flex-shrink-0 flex items-center justify-center w-16 bg-purple-600 text-white text-sm font-medium rounded-l-md">
                A
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                  <Link
                    to="/admins"
                    className="text-gray-900 font-medium hover:text-gray-600"
                  >
                    Administrators
                  </Link>
                  <p className="text-gray-500">
                    {" "}
                    {loading
                      ? "loading..."
                      : `${data?.statistics?.administrators} Member(s)`}
                  </p>
                </div>
              </div>
            </li>

            <li className="col-span-1 flex shadow-sm rounded-md">
              <div className="flex-shrink-0 flex items-center justify-center w-16 bg-yellow-500 text-white text-sm font-medium rounded-l-md">
                C
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                  <Link
                    to="/cars"
                    className="text-gray-900 font-medium hover:text-gray-600"
                  >
                    Cars
                  </Link>
                  <p className="text-gray-500">
                    {" "}
                    {loading
                      ? "loading..."
                      : `${data?.statistics?.cars} Of them`}
                  </p>
                </div>
              </div>
            </li>

            <li className="col-span-1 flex shadow-sm rounded-md">
              <div className="flex-shrink-0 flex items-center justify-center w-16 bg-green-500 text-white text-sm font-medium rounded-l-md">
                R
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                  <Link
                    to="/rentals"
                    className="text-gray-900 font-medium hover:text-gray-600"
                  >
                    Rentals
                  </Link>
                  <p className="text-gray-500">
                    {" "}
                    {loading
                      ? "loading..."
                      : `${data?.statistics?.rentals} in all`}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className={"mt-10 border-none"}>
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Statistics
          </h2>
          <div className={"w-full grid grid-cols-6 gap-8 mt-5"}>
            <div className={"col-span-2"}>
              <Cars data={data} loading={loading} />
            </div>
            <div className={"col-span-4"}>
              <Rentals data={data} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Overview;
