import type { LoginForm, RegisterForm } from "../../../core/models/Auth";

export const validateLogin = (form: LoginForm) => {
  const newErrors: Record<string, string> = {};
  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = "Invalid email format";
  }
  if (!form.password) {
    newErrors.password = "Password is required";
  }
  return newErrors;
};

export const validateRegister = (form: RegisterForm) => {
  const newErrors: Record<string, string> = {};
  if (!form.username.trim()) {
    newErrors.username = "Username is required";
  }
  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = "Invalid email format";
  }
  if (!form.password) {
    newErrors.password = "Password is required";
  } else if (form.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }
  if (form.password !== form.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }
  return newErrors;
};
