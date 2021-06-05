import { useQuery } from "@apollo/client";
import Head from "next/head";
import { Fragment } from "react";
import FeedBack from "../components/feedback";
import Footer from "../components/footer";
import Header from "../components/header";
import { withApollo } from "../lib/apollo";
import { GET_CARS, GET_FEEDBACKS } from "../lib/graphql/queries";

function Home() {
  const { data, loading } = useQuery(GET_CARS, {
    variables: {
      limit: 9,
      filter: { featured: true, status: "Available" },
    },
  });

  const { data: feedbacks, refetch } = useQuery(GET_FEEDBACKS, {
    variables: {
      limit: 3,
      skip: 0,
    },
  });

  return (
    <Fragment>
      <Head>
        <title>Home | Rent-A-Ride Rental Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Fragment>
        <Header />

        <section class="main">
          <h1 className={"text-5xl font-bold"}>Rent-A-Ride Rental Service</h1>
          <h3 className={"text-3xl mt-2 mb-10"}>
            Find the best luxury and low cost vehicular rentals here
          </h3>
          <p className={"font-light text-lg mt-10"}>
            We offer several types and brandes of car for rents.
          </p>

          <div class="categories" id="category">
            <div class="small-container">
              <button onClick={() => (location.href = "/cars")}>
                Book Car
              </button>
            </div>
          </div>
        </section>

        {/* featured cars */}

        <div class="categories" id="category">
          <div class="small-container">
            <h2 class="title text-4xl font-bold">Featured Vehicles</h2>
            {loading ? (
              <Fragment>
                <div className={"row"}>loading cars ....</div>
              </Fragment>
            ) : (
              <Fragment>
                {data ? (
                  <Fragment>
                    {data?.carsLength === 0 ? (
                      <Fragment>
                        <div className={"row"}>
                          No Featured Cars Available now ....
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div class="row">
                          {data?.cars?.map((car, i) => (
                            <Fragment key={i}>
                              <div
                                onClick={() => {
                                  location.href = `/car/${car?._id}`;
                                }}
                                class="col-4 cursor-pointer"
                              >
                                <img src={car?.images?.[0]} />
                                <h4 className={"mt-1 text-gray-600"}>
                                  {car?.model}
                                </h4>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      </Fragment>
                    )}

                    <a
                      href={"/cars"}
                      className={
                        "flex flex-row items-center text-yellow-400 hover:text-yellow-800"
                      }
                    >
                      <span
                        className={
                          " flex flex-row items-center text-yellow-400 hover:text-yellow-800"
                        }
                      >
                        All Products{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </a>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className={"row"}>
                      Oops, we could not fetch cars ....
                    </div>
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </div>

        <div class="offer">
          <div class="small-container">
            <div class="row">
              <div class="col-2">
                <img src="/images/unnamed.png" class="offer-img" />
              </div>
              <div class="col-2">
                <p> Exclusively Available at Rent-A-Ride Rentals</p>
                <h1 className={"font-bold"}>Discount of 30%</h1>
                <small>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempora id quis ad doloremque ipsa veniam, eius sunt molestiae
                  quam autem tempore ex ut recusandae nam corrupti distinctio
                  illo, cum ratione!
                </small>{" "}
                <br />
                <a href="/cars" class="btn ">
                  <div className={"flex flex-row items-center"}>
                    <div>Rent now</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="categories" id="category">
          <div class="small-container">
            <h2 class="title text-4xl font-bold"> Why Choose Us</h2>
            <div class="row">
              <div class="col-3">
                <p>
                  <div
                    className={
                      "w-full text-white flex justify-center items-center"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat quos tempora esse sed id. Obcaecati omnis voluptas
                  laboriosam, molestiae sed nesciunt dolores cupiditate natus
                  perspiciatis, tempora corporis quae doloribus corrupti.
                </p>
              </div>
              <div class="col-3">
                <p>
                  <div className={"w-full flex justify-center items-center"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                  dolorum, amet praesentium incidunt iusto corporis, eum nobis
                  omnis voluptas explicabo totam sequi illum, quisquam qui
                  veniam perspiciatis velit fuga nemo?
                </p>
              </div>
              <div class="col-3">
                <p>
                  <div className={"w-full flex justify-center items-center"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                  </div>
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente libero reiciendis natus odit? Animi deserunt soluta
                  fuga, distinctio optio culpa reiciendis, hic facilis
                  recusandae debitis magnam nihil provident maxime officia.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="testimonial">
          <div class="small-container">
            <h2 class="title text-4xl font-bold">Leave Your Feedback</h2>

            <div class="comment-box">
              <FeedBack refetch={refetch} />
            </div>
            {feedbacks && feedbacks?.feedBacks?.length > 0 && (
              <Fragment>
                <div class="row">
                  {feedbacks?.feedBacks?.map((feedback, i) => (
                    <Fragment key={i}>
                      <div class="col-7">
                        <i class="fa fa-quote-left"></i>
                        <p>{feedback?.message || "Not Specified"}</p>
                        <div className={"w-full flex flex-col items-center"}>
                          <div class="rating flex flex-row items-center">
                            {[1, 2, 3, 4, 5].map(() => (
                              <Fragment>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </Fragment>
                            ))}
                          </div>
                          <img src="/images/user-2.png" />
                          <h3>{feedback?.name || "Not Specified"}</h3>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </Fragment>
            )}
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d63530.15644903886!2d-0.13010588106652027!3d5.620819476927571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0xfdf8440c2c8021d%3A0x7d94b9ac6149ac75!2sDandinas%20Preparatory%20School%2C%20Accra!3m2!1d5.620817799999999!2d-0.0950919!4m0!5e0!3m2!1sen!2sgh!4v1615680373933!5m2!1sen!2sgh"
          width="100%"
          height="450"
          style={{ border: 0, marginBottom: "-7px" }}
          allowfullscreen=""
          loading="lazy"
        ></iframe>

        <Footer />
      </Fragment>
    </Fragment>
  );
}

export default withApollo({ ssr: true })(Home);
