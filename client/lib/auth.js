import Cookies from "js-cookie";

export const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL + "/graphql";

class Auth {
  getCipher() {
    return Cookies.get("rent-a-ride-cipher");
  }

  setCipher(token) {
    Cookies.set("rent-a-ride-cipher", token);
  }

  clearCipher() {
    Cookies.remove("rent-a-ride-cipher");
  }
}

export default new Auth();
