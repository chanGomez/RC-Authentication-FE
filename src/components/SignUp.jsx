import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import getSignUpTheme from "../../theme/getSignUpTheme";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "../../CustomIcons";
import TemplateFrame from "../../TemplateFrame";
import { validateEmail, validatePassword, validateUsername} from "../utils/validate"
import { createNewUser } from "../API/API"
import { useNavigate } from "react-router-dom";
import QRCodeComponent from "./QRCodeComponent";
import { enable2FactorAuth } from "../API/API";
import { verify2FactorAuth } from "../API/API";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function SignUp() {
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameMessage] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [qrCode, setQrCode] = React.useState(null); // For displaying the QR code
  const [manualKey, setManualKey] = React.useState(""); // Manual key fallback
  const [userRegistered, setUserRegistered] = React.useState(false);
  const [totp, setTotp] = React.useState("");

  // const validateInputs = () => {
  //   const email = document.getElementById("email");
  //   const password = document.getElementById("password");
  //   const username = document.getElementById("username");

  //   let isValid = true;

  //   let isEmailValid = validateEmail(email)
  //   if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
  //     setEmailError(true);
  //     setEmailErrorMessage("Please enter a valid email address.");
  //     isValid = false;
  //   } else if (isEmailValid.error == true) {
  //     setEmailError(false);
  //     setEmailErrorMessage(`${isEmailValid.message}`);
  //   }

  //   let isPasswordValid = validatePassword(password);
  //   if (!password.value || password.value.length < 1) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage("A username is required.");
  //   }else if (isPasswordValid.error == true) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage(`${isPasswordValid.message}`);
  //   }

  //  let  isUserNameValid = validateUsername(username)
  //   if (!username.value || username.value.length < 1) {
  //     setUsernameError(true);
  //     setUsernameMessage("A username is required.");
  //     isValid = false;
  //   } else if (isUserNameValid.error == true) {
  //     setUsernameError(false);
  //     setUsernameMessage(isUserNameValid.message);
  //   }

  //   return isValid;
  // };

  async function handleSubmit(event) {
    event.preventDefault();
    if (usernameError || emailError || passwordError) return;

    const data = new FormData(event.currentTarget);
    let userData = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };

    const resultUser = await createNewUser(userData);
    setEmail(resultUser.email);
    console.log(resultUser);
    if (resultUser){
      setUserRegistered(true);
    } else{
      alert("account not made");
    }

    let emailFromForm = data.get("email");
      console.log(emailFromForm); 

      const emailData = { email: emailFromForm };

    const resultQRcode = await enable2FactorAuth(emailData);
      console.log(resultQRcode); 

    if (resultQRcode) {
      console.log(resultQRcode); // Check what is being returned
      setQrCode(resultQRcode.data.qrCode); // Make sure this is correct
      setManualKey(resultQRcode.data.manualKey);
    } else {
      console.log(resultQRcode); // Check what is being returned
      alert("WTFFFFFFFF");
    }
  }


  async function handleVerifyTotp(event) {
    event.preventDefault();

    try {
      const isValid = await verify2FactorAuth(totp, email);

      if (isValid) {
        alert("Logged in after 2fa");
        navigate(`/movies`);
      } else {
        alert("Logged 2fa failed");
      }

      //should the user be promoted to login or straight in?
    } catch (error) {
      console.error("Login failed:", error);
      alert("Error during Login.");
    }
  }

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {userRegistered ? "Enable 2 Factor Authentication" : "Sign Up"}
          </Typography>
          {userRegistered ? (
            <div>
              <h3>Scan this QR code with your authenticator app:</h3>
              <QRCodeComponent qrCode={qrCode} />
              <p>manualKey: {manualKey}</p>
              <input
                type="text"
                id="totp"
                name="totp"
                value={totp}
                onChange={(e) => setTotp(e.target.value)}
                placeholder="Enter TOTP"
              />
              <button onClick={handleVerifyTotp}>Verify TOTP</button>
            </div>
          ) : (
            // Sign Up form JSX
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  placeholder="JamesBond"
                  error={usernameError}
                  helperText={usernameErrorMessage}
                  color={usernameError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
                  color={emailError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                // onClick={validateInputs}
              >
                Sign up
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                <span>
                  <Link
                    href="/sign-in"
                    variant="body2"
                    sx={{ alignSelf: "center" }}
                  >
                    Sign in
                  </Link>
                </span>
              </Typography>
            </Box>
          )}
        </Card>
      </SignUpContainer>
    </>
  );
}
