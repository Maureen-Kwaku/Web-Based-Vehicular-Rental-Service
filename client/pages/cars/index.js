import Head from "next/head";
import { Fragment } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { GET_CARS } from "../../lib/graphql/queries";
import { withApollo } from "../../lib/apollo";
import { useQuery } from "@apollo/client";

const Cars = () => {
  const { data, loading } = useQuery(GET_CARS, {
    variables: {
      filter: {
        status: "Available",
      },
    },
  });
  return (
    <Fragment>
      <Head>
        <title>Cars | Rent-A-Ride Rental Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Fragment>
        <Header />

        <section class="mainCar">
          <h1 className={"text-white font-bold text-5xl"}>
            Find The Right Car For You
          </h1>

          <div className={"mt-10"}>
            <div class="small-container">
              <p className={"font-light"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                doloribus quasi incidunt quas quisquam itaque nemo aut quia ut
                dolorem aliquid magni provident repellendus, dicta ipsa modi,
                animi sed! A!
              </p>
            </div>
          </div>
        </section>

        <section>
          <div class="my-20">
            <div class="small-container">
              <h2 class="title text-4xl font-semibold">Available Vehicles</h2>
              <div class="row">
                {/* <div class="col-md-4 text-center">
                  <ul id="filter-list">
                    <li class="list active" data-filter="all">
                      ALL
                    </li>
                    <li class="list" data-filter="sedan">
                      SEDAN
                    </li>
                    <li class="list" data-filter="coupe">
                      COUPE
                    </li>
                    <li class="list" data-filter="suv">
                      SUV
                    </li>
                    <li class="list" data-filter="van">
                      VAN
                    </li>
                  </ul>
                </div> */}

                <div class="product">
                  {loading ? (
                    <Fragment>loading cars...</Fragment>
                  ) : (
                    <Fragment>
                      {data ? (
                        <Fragment>
                          {data?.carsLength === 0 ? (
                            <Fragment>No Cars Available now ....</Fragment>
                          ) : (
                            <Fragment>
                              {data?.cars?.map((car, i) => (
                                <Fragment key={i}>
                                  <div class="itembox van">
                                    <a href={`/car/${car?._id}`}>
                                      <img src={car?.images?.[0]} />
                                    </a>
                                  </div>
                                </Fragment>
                              ))}
                            </Fragment>
                          )}
                        </Fragment>
                      ) : (
                        <Fragment>Oops, could not fetch cars ...</Fragment>
                      )}
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </Fragment>
    </Fragment>
  );
};
export default withApollo({ ssr: true })(Cars);
