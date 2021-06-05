import Head from "next/head";
import { Fragment, useState } from "react";
import Footer from "../../components/footer";
import { withApollo } from "../../lib/apollo";
import Header from "../../components/headerForProduct";
import { GET_CAR, GET_CARS } from "../../lib/graphql/queries";
import { CREATE_RENTAL } from "../../lib/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useAuthContext } from "../_app";
import { isPast, isBefore } from "date-fns";
import { toaster } from "evergreen-ui";

const Car = () => {
  const [, userData] = useAuthContext();
  const { data: cars } = useQuery(GET_CARS, {
    variables: { limit: 4, filter: { featured: true, status: "Available" } },
  });
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery(GET_CAR, {
    variables: { id },
  });

  //variables for creating rental
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setdropoffAddress] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");

  const [invokeRental, { loading: loadCreateRental }] = useMutation(
    CREATE_RENTAL
  );

  const HandleSubmit = (e) => {
    e.preventDefault();
    let pickup = new Date(`${pickupDate}T${pickupTime}`);
    let dropoff = new Date(`${dropoffDate}T${dropoffTime}`);
    //check to see if they are past
    if (isPast(pickup)) return toaster.notify("Pickup Date is past");
    if (isPast(dropoff)) return toaster.notify("Return Date is past");

    //compare them makinsg sure dropoff is after pickup
    if (isBefore(dropoff, pickup))
      return toaster.notify("Make sure dropoff date comes after pickup date");
    invokeRental({
      variables: {
        carId: id,
        pickupAddress,
        dropoffAddress,
        pickupTime: pickup,
        dropoffTime: dropoff,
      },
    })
      .then(({ data }) => {
        location.href = data?.createRental?.authorizationUrl;
      })
      .catch((e) => {
        console.log(e);
        toaster.warning(e?.graphQLErrors?.[0]?.message);
      });
  };

  return (
    <Fragment>
      <Head>
        <title>Car | Rent-A-Ride Rental Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Fragment>
        <Header />

        <div class="small-container single-product">
          {loading ? (
            <Fragment>
              <div className={"row"}>loading...</div>
            </Fragment>
          ) : (
            <Fragment>
              <div class="row">
                <div class="col-2">
                  <img src={data?.car?.images?.[0]} width="100%" />
                </div>
                <div class="col-2">
                  <p>
                    <a href="/cars" style={{ color: "rgb(233, 174, 64)" }}>
                      Home
                    </a>
                    / {data?.car?.make}
                  </p>
                  <h3 className="font-bold text-3xl text-gray-700 my-5">
                    {data?.car?.model}
                  </h3>
                  <h3 className={"font-medium"}>
                    GH&cent; {(data?.car?.price / 100).toFixed(2)} per hour
                  </h3>

                  <h3 className={"flex flex-row mt-5"}>
                    Make{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </h3>
                  <p className={"font-light text-sm -ml-1"}>
                    {data?.car?.make}
                  </p>

                  <h3 className={"flex flex-row mt-5"}>
                    Plate Number{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </h3>
                  <p className={"font-light text-sm -ml-1"}>
                    {data?.car?.plateNumber}
                  </p>

                  {data?.car?.vin && (
                    <Fragment>
                      <h3 className={"flex flex-row mt-5"}>
                        VIN{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </h3>
                      <p className={"font-light text-sm -ml-1"}>
                        {data?.car?.vin}
                      </p>
                    </Fragment>
                  )}

                  {data?.car?.chassis && (
                    <Fragment>
                      <h3 className={"flex flex-row mt-5"}>
                        Chassis{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </h3>
                      <p className={"font-light text-sm -ml-1"}>
                        {data?.car?.chassis}
                      </p>
                    </Fragment>
                  )}

                  {data?.car?.description && (
                    <Fragment>
                      <h3 className={"flex flex-row mt-3"}>
                        Description{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </h3>
                      <p className={"font-light text-sm -ml-1"}>
                        {data?.car?.description}
                      </p>
                    </Fragment>
                  )}
                </div>
              </div>
            </Fragment>
          )}{" "}
        </div>

        <section class="mainForBook">
          <form onSubmit={HandleSubmit} class="small-container">
            <h2 class="title text-3xl font-medium">Fill Form To Rent</h2>
            <div className={"grid grid-cols-2 gap-6 mb-10"}>
              <div>
                <label htmlFor="email-address" className="">
                  Pickup Location
                </label>
                <input
                  type="text"
                  required
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e?.target?.value)}
                  className="appearance-none mt-3 relative block w-full px-3 py-4 border border-gray-500 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Location here eg. Accra Mall"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="">
                  Return Location
                </label>
                <input
                  type="text"
                  value={dropoffAddress}
                  onChange={(e) => setdropoffAddress(e?.target?.value)}
                  required
                  className="appearance-none mt-3 relative block w-full px-3 py-4 border border-gray-500 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Location here eg. Accra Mall"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="">
                  Pickup Date
                </label>
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e?.target?.value)}
                  className="appearance-none mt-3 relative block w-full px-3 py-4 border border-gray-500 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="">
                  Return Date
                </label>
                <input
                  type="date"
                  required
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e?.target?.value)}
                  className="appearance-none mt-3 relative block w-full px-3 py-4 border border-gray-500 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="">
                  Pickup Time
                </label>
                <input
                  type="time"
                  required
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e?.target?.value)}
                  className="appearance-none mt-3 relative block w-full px-3 py-4 border border-gray-500 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="">
                  Return Time
                </label>
                <input
                  type="time"
                  required
                  value={dropoffTime}
                  onChange={(e) => setDropoffTime(e?.target?.value)}
                  className="appearance-none mt-3 relative block w-full px-3 py-4 border border-gray-500 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
            <hr />

            <div class="flex justify-center">
              {userData?.userToken ? (
                <Fragment>
                  <button
                    disabled={loadCreateRental}
                    type="submit"
                    className={"btn"}
                  >
                    {loadCreateRental ? "Loading..." : "Rent Now"}
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <span className={"my-5 text-blue-400"}>
                    Please login before you make a request to rent this car
                  </span>
                </Fragment>
              )}
            </div>
          </form>
        </section>

        {cars && cars?.carsLength > 0 && (
          <Fragment>
            <div className={"small-container "}>
              <div
                className={
                  "w-full flex flex-row justify-between items-center my-10"
                }
              >
                <div>
                  <h2 className={"text-2xl font-medium"}>Featured Vehicles</h2>
                </div>
                <div>
                  <a
                    href={"/cars"}
                    className={"text-gray-600 hover:text-yellow-600"}
                  >
                    View More
                  </a>
                </div>
              </div>
            </div>

            <div class="small-container">
              <div class="row">
                <Fragment>
                  {cars?.cars?.map((car, i) => (
                    <Fragment key={i}>
                      <div class="col-4">
                        <a href={`/car/${car?._id}`}>
                          <img src={car?.images?.[0]} />
                          <h4>{car?.model}</h4>
                        </a>
                        <a href={`/car/${car?._id}`} class="add-cart">
                          <button type="button" name="cart" class="btn">
                            View Car
                          </button>
                        </a>
                      </div>
                    </Fragment>
                  ))}
                </Fragment>
              </div>
            </div>
          </Fragment>
        )}

        <Footer />
      </Fragment>
    </Fragment>
  );
};

export default withApollo({ ssr: true })(Car);
