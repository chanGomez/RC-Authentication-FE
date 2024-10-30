import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import ColorModeSelect from "../../shared-theme/ColorModeSelect";
import { signInUser } from "../API/API";
import { useNavigate } from "react-router-dom";
import { verify2FactorAuth, findUserByEmail } from "../API/API";
import { validateEmail, validatePassword } from "../utils/validateInputs";
import Spinner from "./Spinner/Spinner";
import DOMPurify from "dompurify";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState();

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const [is2FAEnabled, setIs2FAEnabled] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(null);
  const [totp_token, setTotp_token] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (emailError || passwordError) return;

    try {
      const data = new FormData(event.currentTarget);
      let userData = {
        email: DOMPurify.sanitize(data.get("email")),
        password: DOMPurify.sanitize(data.get("password")),
      };

      setIsLoading(true);
      const signedInResult = await signInUser(userData);
      setUserInfo(userData);

      if (signedInResult.status == 200) {
        setIs2FAEnabled(true);
        setIsLoading(false);

        // alert("Verify with 2 factor authentication.");
      } else {
        alert(`${signedInResult.response.data.message}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Sign in failed:", error);
      alert("Error during sign in.");
    }
  }

  async function handle2FAVerification(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await verify2FactorAuth({
        email: userInfo.email,
        totp_token: totp_token,
      });

      if (response.status == 200) {
        alert("2 fact authentication successful.");
        setIsLoading(false);
        navigate("/get-movies");
      } else {
        setIsLoading(false);
        alert("Invalid TOTP code. Please try again.");
      }
    } catch (error) {
      alert("Errror: Error during 2 factor authentication at sign in.");
    }
  }

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    }

    if (!password.value || password.value.length < 1) {
      setPasswordError(true);
      setPasswordErrorMessage("A password is required.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {is2FAEnabled ? "Verify to continue" : "Sign In"}
          </Typography>
          {isLoading ? (
            <Spinner />
          ) : !is2FAEnabled && !isLoading ? (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  data-cy="email-input"
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? "error" : "primary"}
                  sx={{ ariaLabel: "email" }}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Link
                    component="button"
                    type="button"
                    onClick={handleClickOpen}
                    variant="body2"
                    sx={{ alignSelf: "baseline" }}
                  >
                    Forgot your password?
                  </Link>
                </Box>
                <TextField
                  data-cy="password-input"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              <ForgotPassword open={open} handleClose={handleClose} />
              <Button
                type="submit"
                data-cy="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Sign in
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                Don&apos;t have an account?{" "}
                <span>
                  <Link href="/" variant="body2" sx={{ alignSelf: "center" }}>
                    Sign up
                  </Link>
                </span>
              </Typography>
            </Box>
          ) : (
            <>
              <div data-cy="verify-token-component">
                <h3>A code was sent to your authentication app.</h3>
                <div>
                  <label>Code:</label>
                  <input
                    type="text"
                    value={totp_token}
                    onChange={(e) => setTotp_token(e.target.value)}
                    required
                  />
                  <button onClick={handle2FAVerification}>Verify</button>
                </div>
                {/* {errorMessage && <p>{errorMessage}</p>} */}
              </div>
            </>
          )}
        </Card>
      </SignInContainer>
    </>
  );
}
