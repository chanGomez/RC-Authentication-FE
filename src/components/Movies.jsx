import React, { useEffect } from "react";
import setSessionExpirationHandler from "../utils/jwtAuthentication";
import Cookies from "js-cookie";

//movies route works like home or dashboard the place a user goes when they log in so 
//do initial token auth here
function Movies() {

    useEffect(() => {
      const token = Cookies.get("authToken");
      if (token) {
        setSessionExpirationHandler(token);
      }
    }, []);

  return <div>MOVIES DATA </div>;
}

export default Movies;
