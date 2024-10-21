import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import { forgotPassword } from "../API/API";

function ForgotPassword({ open, handleClose }) {
  const [email, setEmail] = React.useState("");

  async function handleForgotPassword(event) {
    event.preventDefault();

    console.log({ email: email });
    const result = await forgotPassword({ email: email });
    console.log(result);


    if (result.status == 200) {
      alert("email sent");
    } else {
      alert("Error: email was not sent");
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        // component: "form",
        // onSubmit: (event) => {
        //   event.preventDefault();
          // const data = new FormData(event.currentTarget);
          // let userEmail = {
          //   email: data.get("email"),
          // };

          // console.log({ email: userEmail.email });
          // const result = forgotPassword({ email: userEmail.email });

          // if (result.status == 200) {
          //   alert("email sent");
          // } else {
          //   alert("Error: email was not sent");
          // }
        //   handleClose();
        // },
        // handleClose()
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a
          link to reset your password.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <div>
          <h3>Scan this QR code with your authenticator app:</h3>
          <QRCodeComponent qrCode={qrCode} />
          <p>manualKey: {manualKey}</p>
          <input
            type="text"
            id="totpToken"
            name="totpToken"
            value={totpToken}
            onChange={(e) => setTotpToken(e.target.value)}
            placeholder="Enter TOTP"
          />
          <button onClick={handleVerifyTotp}>Verify TOTP</button>
        </div> */}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <button onClick={handleForgotPassword}>Send Email</button>
      </DialogActions>
    </Dialog>
  );
}

export default ForgotPassword;
