export default function validatePassword(password) {
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  const isLongEnough = /.{8,}/; // At least 8 characters
  const hasUpperCase = /[A-Z]/; // At least one uppercase letter
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
  const hasNumber = /\d/; // At least one number

  // Perform checks
  if (!isLongEnough.test(password)) {
    return {
      error: true,
      message: "Password must be at least 8 characters long",
    };
  }
  if (!hasUpperCase.test(password)) {
    return {
      error: true,
      message: "Password must contain at least one uppercase letter",
    };
  }
  if (!hasSpecialChar.test(password)) {
    return {
      error: true,
      message: "Password must contain at least one special character",
    };
  }
  if (!hasNumber.test(password)) {
    return {
      error: true,
      message: "Password must contain at least one number",
    };
  }

  return false;
}
