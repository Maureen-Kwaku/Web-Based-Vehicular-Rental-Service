import { Fragment } from "react";
import { useAuthContext } from "../pages/_app";
import { useRouter } from "next/router";

const Header = () => {
  const { pathname } = useRouter();
  const [{ signOut }, data] = useAuthContext();
  return (
    <Fragment>
      <header>
        <div class="topnav" id="myTopnav">
          <div class="logo">
            <a href="/">
              <img
                src="/images/Hand_Holding_Key-512.webp"
                width="90px"
                height="70px"
              />
            </a>
          </div>
          {data?.userToken ? (
            <Fragment>
              <a
                className="cursor-pointer"
                onClick={() => {
                  signOut();
                  location.href = "/login";
                }}
              >
                Logout
              </a>
            </Fragment>
          ) : (
            <Fragment>
              <a
                href="/login"
                className={`${pathname === "/login" ? "active" : ""}`}
              >
                Login | Register
              </a>
            </Fragment>
          )}
          <a
            href="/about-us"
            className={`${pathname === "/about-us" ? "active" : ""}`}
          >
            About
          </a>
          <div class="dropdown">
            <button class="mt-4 text-white">
              Contact Us
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="mailto:seyramablakwaku@gmail.com">E-mail Us</a>
              <a href="tel:+233200732551">Call Us</a>
            </div>
          </div>
          <div class="dropdown">
            <a
              href="/cars"
              className={`${pathname === "/cars" ? "active" : ""}`}
            >
              Booking
            </a>
            <a href="/" class={`${pathname === "/" ? "active" : ""}`}>
              Home
            </a>
            <a
              href="javascript:void(0);"
              style={{ fontSize: "15px" }}
              class="icon"
              onclick="myFunction()"
            >
              &#9776;
            </a>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
