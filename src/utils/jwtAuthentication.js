import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

function decodeToken(token) {
  return jwtDecode(token);
}

// Function to handle session expiration
function setSessionExpirationHandler(token, onExpire) {
  const decodedToken = decodeToken(token);
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  const timeLeft = expirationTime - Date.now();

  if (timeLeft > 0) {
    setTimeout(() => {
      onExpire();
    }, timeLeft);
  } else {
    onExpire(); // Token already expired
  }
}

// token expiration log out
function handleTokenExpiration() {
  console.log("Session expired, logging out...");
  alert("Session expired, logging out...");
  Cookies.remove("authToken"); // Remove token from cookies
  navigate("/sign-in")// Redirect to login page
}

// When the app loads, check if there's a token and handle expiration
useEffect(() => {
  const token = Cookies.get("authToken");
  if (token) {
    setSessionExpirationHandler(token, handleTokenExpiration);
  }
}, []);

export default {
  handleTokenExpiration,
};
