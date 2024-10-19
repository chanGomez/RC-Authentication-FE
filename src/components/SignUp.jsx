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
import validatePassword from "../utils/validate"
import { createNewUser } from "../API/API";
import { useNavigate } from "react-router-dom";
import QRCodeComponent from "./QRCodeComponent";


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

  const [mode, setMode] = React.useState("light");
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameMessage] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [qrCode, setQrCode] = React.useState(null); // For displaying the QR code
  const [manualKey, setManualKey] = React.useState(""); // Manual key fallback

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const username = document.getElementById("username");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    let isPasswordValid = validatePassword(password);
    if (isPasswordValid === true) {
      passwordError(true);
      setPasswordErrorMessage(isPasswordValid.message);
    }

    if (!username.value || username.value.length < 1) {
      setUsernameError(true);
      setUsernameMessage("A username is required.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameMessage("");
    }

    return isValid;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (usernameError || emailError || passwordError) return;

        try {
          const data = new FormData(event.currentTarget);
          let userData = {
            username: data.get("username"),
            email: data.get("email"),
            password: data.get("password"),
          };
          console.log("line 116");
          
          const res = await createNewUser(userData);
          console.log("line 116", res);

          setQrCode(res.data.qrCode);
          setManualKey(res.data.manualKey); // Set manual key for fallback
          // alert("Please scan the QR code with your authenticator app.");

          //should the user be promoted to login or straight in?
          navigate(`/verify`);


        } catch (error) {
          console.error("Registration failed:", error);
          alert("Error during registration.");
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
                       {qrCode ? ("Enable Second Auth") : ("Sign Up")}
          </Typography>
          {qrCode ? (
            <div>
              <h3>Scan this QR code with your authenticator app:</h3>
              <QRCodeComponent value={qrCode} />
              <p>Manual Key: {manualKey}</p>
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
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              /> */}
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
