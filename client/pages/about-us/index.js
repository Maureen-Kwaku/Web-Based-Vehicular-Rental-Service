import Head from "next/head";
import { Fragment } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";

const AboutUs = () => {
  return (
    <Fragment>
      <Head>
        <title>Rent-A-Ride Rental Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Fragment>
        <Header />

        <section class="mainAbout">
          <div class="categories" id="category">
            <div class="small-container ">
              <h2 class="title font-bold text-4xl"> About Us</h2>
              <div class="row">
                <div class="flex justify-center">
                  <p className={"text-gray-900 w-1/2"}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus impedit molestiae reiciendis enim quaerat ad,
                    pariatur adipisci reprehenderit eum facere necessitatibus
                    ut, laboriosam est ullam doloremque vero, quidem minima cum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint reprehenderit consequatur magnam. Similique in porro
                    rerum consectetur eligendi, ratione nesciunt? Dolores
                    nesciunt earum porro dolorum dignissimos nulla quibusdam in
                    nemo.
                    <br />
                    <br />
                    <i class="sign">Yours, Rent-A-Ride Service</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="small-container team">
          <div className={"mt-10"}>
            <h2 class="title team-title text-4xl font-semibold"> Our Team</h2>
          </div>
          <div class="row">
            <div class="col-4">
              <img src="/images/team1.jpg" />
              <h4> Carlos Lopez</h4>
            </div>
            <div class="col-4">
              <img src="/images/team2.jpg" />
              <h4> Andrew DeLuca</h4>
            </div>
            <div class="col-4">
              <img src="/images/team3.jpg" />
              <h4> Nicole Grey</h4>
            </div>
            <div class="col-4">
              <img src="/images/team4.jpg" />
              <h4> Daniel Smith</h4>
            </div>
          </div>
        </div>

        <div class="testimonial">
          <div class="small-container">
            <h2 class="title text-4xl font-semibold">Testimonials</h2>

            <div class="row">
              <div class="col-7">
                <i class="fa fa-quote-left"></i>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae, deserunt molestiae eligendi assumenda excepturi,
                  accusantium modi a quos ad, quo iste. Dolores veritatis
                  provident unde necessitatibus sint dolore fugit neque.
                </p>
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
                  <img src="/images/user-1.png" />
                  <h3> Alex Parker</h3>
                </div>
              </div>
              <div class="col-7">
                <i class="fa fa-quote-left"></i>
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae, deserunt molestiae eligendi assumenda excepturi,
                  accusantium modi a quos ad, quo iste. Dolores veritatis
                  provident unde necessitatibus sint dolore fugit neque.
                </p>
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
                  <h3> Carlos Rodriguez</h3>
                </div>
              </div>
              <div class="col-7">
                <i class="fa fa-quote-left"></i>
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae, deserunt molestiae eligendi assumenda excepturi,
                  accusantium modi a quos ad, quo iste. Dolores veritatis
                  provident unde necessitatibus sint dolore fugit neque.
                </p>
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
                  <img src="/images/user-3.png" />
                  <h3> Asta Flores</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </Fragment>
    </Fragment>
  );
};

export default AboutUs;
