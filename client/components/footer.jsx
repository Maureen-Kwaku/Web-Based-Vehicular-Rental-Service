import { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <footer class="footer">
        <div class="container">
          <div class="row1">
            <div class="footer-col">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="/about-us">About Us</a>
                </li>
                <li>
                  <a href="#">Our Services</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Get Help</h4>
              <ul>
                <li>
                  <a href="/cars">Booking</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Payment Options</a>
                </li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/">About Us</a>
                </li>
                <li>
                  <a href="/">Booking</a>
                </li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>follow us</h4>
              <div class="social-links">
                <a href="https://www.facebook.com/">
                  <svg
                    width={15}
                    height={15}
                    class={"mt-3 ml-3"}
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="none"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/seyram_kwaku/">
                  <svg
                    width={15}
                    height={15}
                    class={"mt-3 ml-3"}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-instagram"
                  >
                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <path d="M17.5 6.5L17.51 6.5" />
                  </svg>
                </a>
                <a href="https://www.twitter.com/">
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-twitter mt-3 ml-3"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/maureen-kwaku-569372189/">
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="none"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-linkedin  mt-3 ml-3"
                  >
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <path d="M2 9H6V21H2z" />
                    <circle cx={4} cy={4} r={2} />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
