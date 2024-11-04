import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// token expiration log out
function handleTokenExpiration() {
  const navigate = useNavigate();
  alert("Session expired, logging out...");
  Cookies.remove("authToken"); 
  navigate("/sign-in"); 
}

// Function to handle session expiration
 export default function setSessionExpirationHandler(token) {
   const decodedToken = jwtDecode(token);
   const expirationTime = decodedToken.exp * 1000;
   const timeLeft = expirationTime - Date.now();
   if (timeLeft > 0) {
     setTimeout(() => {
       handleTokenExpiration();
     }, timeLeft);
   } else {
     handleTokenExpiration();
   }
 };