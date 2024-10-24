import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { createNewUser } from "../API/API";
import { useNavigate } from "react-router-dom";
import QRCodeComponent from "./QRCodeComponent";
import { enable2FactorAuth } from "../API/API";
import { verify2FactorAuth } from "../API/API";
import Spinner from "./Spinner/Spinner";

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
  const [isLoading, setIsLoading] = React.useState();
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const [qrCode, setQrCode] = React.useState(""); // For displaying the QR code
  const [manualKey, setManualKey] = React.useState(""); // Manual key fallback
  const [otpauthURL, setOtpauthURL] = React.useState(""); // Manual key fallback

  const [credentialsTaken, setCredentialsTaken] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [totp_token, setTotp_token] = React.useState("");

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const username = document.getElementById("username");
    let isValid = true;
    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }
    if (!password.value || password.value.length < 9) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 8 characters long.");
      isValid = false;
    } else if (!/[A-Z]/.test(password.value)) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "Password must contain at least one uppercase letter"
      );
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "Password must contain at least one special character"
      );
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
    if (!username.value || username.value.length < 5) {
      setUsernameError(true);
      setUsernameErrorMessage("Name must be at least 6 chars long.");
      isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(username.value)) {
      setUsernameError(true);
      setUsernameErrorMessage(
        "Username can only contain letters and numbers with no spaces or special characters"
      );
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }
    return isValid;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (usernameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }

    const data = new FormData(event.currentTarget);
    let userData = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };

    setIsLoading(true);
    const resultUser = await createNewUser(userData);
    setEmail(userData.email);
    console.log(resultUser);

    if (resultUser.status == 200) {
      setCredentialsTaken(true);
      // alert("Enable 2 factor auth");
    } else {
      setIsLoading(false);
      alert("Error: Credentials not taken.");
    }

    console.log(data.get("email"));
    const resultQRcode = await enable2FactorAuth({ email: data.get("email") });
    console.log(resultQRcode.qrCode);

    if (resultQRcode.status == 201) {
      console.log(resultQRcode); // Check what is being returned
      setQrCode(resultQRcode.data.qrCode); // Make sure this is correct
      setManualKey(resultQRcode.data.manualKey);
      setOtpauthURL(resultQRcode.data.otpauthURL);
      setIsLoading(false);
    } else {
      console.log(resultQRcode); // Check what is being returned
    }
  }

  async function handleVerifyTotp(event) {
    event.preventDefault();
    console.log("line 45", totp_token, email);

    try {
      setIsLoading(true);
      const isValid = await verify2FactorAuth({ totp_token, email });

      if (isValid.status == 200) {
        setIsLoading(false);
        // alert("Logged in after 2fa");
        navigate(`/get-movies`);
      } else {
        alert(`Invalid token.`);
      }

      //should the user be promoted to login or straight in?
    } catch (error) {
      console.error("Login failed:", error);
      alert("Error during Login.");
    }
  }

  // user submits info set loading to true
  //if the qrcode comes in set loading to false
  //user submits token set loading to true
  //user token comes back valid set loading to false

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
            {credentialsTaken ? "Enable 2 Factor Authentication" : "Sign Up"}
          </Typography>

          {isLoading ? (
            <Spinner/>
          ) : credentialsTaken && !isLoading ? (
            <div>
              <h3>Scan this QR code with your authenticator app:</h3>
              <QRCodeComponent qrCode={qrCode} otpauthURL={otpauthURL} />
              <p>Manual Key: {manualKey}</p>
              <input
                type="text"
                id="totp_token"
                name="totp_token"
                value={totp_token}
                onChange={(e) => setTotp_token(e.target.value)}
                placeholder="Enter TOTP"
              />
              <button onClick={handleVerifyTotp}>Verify TOTP</button>
            </div>
          ) : (
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Sign up
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                <span>
                  <Link
                    onClick={() => {
                      navigate("/sign-in");
                    }}
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
