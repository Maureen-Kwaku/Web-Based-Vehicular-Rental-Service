import Cookies from "js-cookie";

export const BASE_URL =
  process.env.REACT_APP_SERVER_URL ||
  "https://car-rental-final-project.herokuapp.com/graphql";

class Auth {
  getCipher() {
    return Cookies.get("rent-a-ride-admin-cipher") || null;
  }

  setCipher(token) {
    Cookies.set("rent-a-ride-admin-cipher", token);
  }

  clearCipher() {
    Cookies.remove("rent-a-ride-admin-cipher");
  }
}

export default new Auth();
