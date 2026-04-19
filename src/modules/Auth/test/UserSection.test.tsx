import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserSection from "../components/UserSection";
import { AuthProvider } from "../context/AuthContext";
import { useAuth } from "../context/UseAuthContext";

const mockLogout = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../context/UseAuthContext", () => ({
  ...jest.requireActual("../context/UseAuthContext"),
  useAuth: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe("UserSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user info when authenticated", () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { sub: "user-123", email: "test@example.com", name: "Test User", access_token: "token" },
      logout: mockLogout,
      login: jest.fn(),
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <UserSection />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/hello, test user!/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("redirects to login when not authenticated", () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: mockLogout,
      login: jest.fn(),
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <UserSection />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("calls logout and navigates to login when logout button is clicked", async () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { sub: "user-123", email: "test@example.com", name: "Test User", access_token: "token" },
      logout: mockLogout,
      login: jest.fn(),
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <UserSection />
        </AuthProvider>
      </BrowserRouter>
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
