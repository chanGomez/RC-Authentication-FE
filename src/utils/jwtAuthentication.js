import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// token expiration log out
function handleTokenExpiration() {
  const navigate = useNavigate();
  console.log("Session expired, logging out...");
  alert("Session expired, logging out...");
  Cookies.remove("authToken"); // Remove token from cookies
  navigate("/sign-in"); // Redirect to login page
}

// Function to handle session expiration
 export default function setSessionExpirationHandler(token) {
   const decodedToken = jwtDecode(token);
   const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
   const timeLeft = expirationTime - Date.now();

   if (timeLeft > 0) {
     setTimeout(() => {
       handleTokenExpiration(); // Call the expiration handler
     }, timeLeft);
   } else {
     handleTokenExpiration(); // Token already expired
   }
 };