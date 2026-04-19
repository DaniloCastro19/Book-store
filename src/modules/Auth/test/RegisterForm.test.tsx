import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { AuthProvider } from "../context/AuthContext";
import { authService } from "../services/AuthService";

jest.mock("../services/AuthService");

const mockAuthService = authService as jest.Mocked<typeof authService>;

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  );
};

describe("RegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders register form with all inputs", () => {
    renderWithProviders(<RegisterForm />);

    expect(screen.getByRole("heading", { name: "Create Account" })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    renderWithProviders(<RegisterForm />);

    const submitButton = screen.getByRole("button", { name: /register/i });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email", async () => {
    renderWithProviders(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Password");
    const confirmInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: /register/i });

    fireEvent.change(usernameInput, { target: { name: "username", value: "testuser" } });
    fireEvent.change(emailInput, { target: { name: "email", value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { name: "password", value: "password123" } });
    fireEvent.change(confirmInput, { target: { name: "confirmPassword", value: "password123" } });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  it("shows error when password confirmation doesn't match", async () => {
    renderWithProviders(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Password");
    const confirmInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: /register/i });

    fireEvent.change(usernameInput, { target: { name: "username", value: "testuser" } });
    fireEvent.change(emailInput, { target: { name: "email", value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { name: "password", value: "password123" } });
    fireEvent.change(confirmInput, { target: { name: "confirmPassword", value: "different" } });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it("calls register API on successful submission", async () => {
    mockAuthService.register.mockResolvedValue({
      message: "Registration successful",
      user: {
        email: "test@example.com",
        name: "Test User",
      },
    });

    renderWithProviders(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Password");
    const confirmInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: /register/i });

    fireEvent.change(usernameInput, { target: { name: "username", value: "testuser" } });
    fireEvent.change(emailInput, { target: { name: "email", value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { name: "password", value: "password123" } });
    fireEvent.change(confirmInput, { target: { name: "confirmPassword", value: "password123" } });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(mockAuthService.register).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        name: "testuser",
      });
    });
  });

  it("shows error message when registration fails", async () => {
    mockAuthService.register.mockRejectedValue(new Error("Email already exists"));

    renderWithProviders(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Password");
    const confirmInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: /register/i });

    fireEvent.change(usernameInput, { target: { name: "username", value: "testuser" } });
    fireEvent.change(emailInput, { target: { name: "email", value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { name: "password", value: "password123" } });
    fireEvent.change(confirmInput, { target: { name: "confirmPassword", value: "password123" } });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
    });
  });
});
