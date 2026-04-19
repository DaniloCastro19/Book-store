import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { AuthProvider } from "../context/AuthContext";
import { authService } from "../services/AuthService";

jest.mock("../services/AuthService");
jest.mock("../context/UseAuthContext");

const mockAuthService = authService as jest.Mocked<typeof authService>;
const mockLogin = jest.fn();

jest.mock("../context/UseAuthContext", () => ({
  ...jest.requireActual("../context/UseAuthContext"),
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false,
    user: null,
  }),
}));


const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  );
};

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form with title and inputs", () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    renderWithProviders(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email", async () => {
    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { name: "email", value: "invalid-email" } });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  it("calls login API on successful submission", async () => {
    mockAuthService.login.mockResolvedValue({
      access_token: "mock-token",
      message: "Login successful",
      payload: {
        sub: "user-123",
        email: "test@example.com",
        name: "Test User",
        role: "user",
      },
    });

    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { name: "email", value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { name: "password", value: "password123" } });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(mockAuthService.login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("shows error message when login fails", async () => {
    mockAuthService.login.mockRejectedValue(new Error("Invalid credentials"));

    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { name: "email", value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { name: "password", value: "wrong-password" } });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it("clears validation error when user types", async () => {
    renderWithProviders(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { name: "email", value: "test" } });

    await waitFor(() => {
      expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
    });
  });
});
