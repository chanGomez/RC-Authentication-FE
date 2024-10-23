import React, { useEffect } from "react";
import setSessionExpirationHandler from "../utils/jwtAuthentication";
import Cookies from "js-cookie";

function Movies() {
  //token authentication check and expiration handling.
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setSessionExpirationHandler(token);
    }
  }, []);

  return <div>MOVIES DATA </div>;
}

export default Movies;
