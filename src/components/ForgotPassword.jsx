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
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <button onClick={handleForgotPassword}>Send Email</button>
      </DialogActions>
    </Dialog>
  );
}

export default ForgotPassword;
