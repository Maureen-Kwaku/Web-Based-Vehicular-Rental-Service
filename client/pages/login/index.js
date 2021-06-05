import { Fragment, useState } from "react";
import Head from "next/head";
import Footer from "../../components/footer";
import Header from "../../components/headerForProduct";
import { withApollo } from "../../lib/apollo";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../lib/graphql/mutations";
import { useAuthContext } from "../_app";
import { toaster } from "evergreen-ui";

const Login = () => {
  const [{ signIn }] = useAuthContext();
  const [invokeLogin, { loading }] = useMutation(LOGIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();

    invokeLogin({
      variables: {
        email,
        password,
      },
    })
      .then(async ({ data }) => {
        await signIn(data?.loginUser);
        location.href = "/";
      })
      .catch((e) => {
        toaster.warning(e?.graphQLErrors[0]?.message);
      });
  };
  return (
    <Fragment>
      <Head>
        <title>Login | Rent-A-Ride Rental Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Fragment>
        <div className={"bg-yellow-400"}>
          <Header />

          <section className={"sectionLogin"}>
            <div class="mainLogin">
              <div class="user SignIn">
                <div class="imageBox">
                  <img
                    src="/images/car-rental2.jpg"
                    alt=""
                    style={{ backgroundPosition: "right" }}
                  />
                </div>
                <div class="formBox">
                  <form onSubmit={HandleSubmit}>
                    <h2> Log In </h2>
                    <input
                      value={email}
                      required
                      onChange={(e) => setEmail(e?.target?.value)}
                      type="email"
                      placeholder="Enter E-mail"
                      id="email"
                    />
                    <input
                      type="password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e?.target?.value)}
                      placeholder="Password"
                      id="password"
                    />
                    <input
                      type="submit"
                      class="submit"
                      value={loading ? "Loading..." : "Login"}
                    />
                    <p class="register">
                      {" "}
                      <b>don't have an account ?</b>
                      <a href="/register" onclick="javascript:doToggle();">
                        {" "}
                        Register{" "}
                      </a>
                    </p>
                    <p class="forgot">
                      <a href="#"> forgot password?</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </Fragment>
    </Fragment>
  );
};

export default withApollo({ ssr: true })(Login);
