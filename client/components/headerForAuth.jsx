import { Fragment } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const { pathname } = useRouter();
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
          <a
            href="/login"
            className={`${pathname === "/login" ? "text-white" : "text-black"}`}
          >
            Login/Register
          </a>
          <a href="/about-us">About</a>
          <div class="dropdown">
            <button class="dropbtn">
              Contact Us
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="mailto:seyramablakwaku@gmail.com">E-mail Us</a>
              <a href="tel:+233200732551">Call Us</a>
            </div>
          </div>
          <div class="dropdown">
            <a href="/cars">Booking</a>
            <a href="/">Home</a>
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
