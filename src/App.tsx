import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./shared/header/Header";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./modules/Auth/context/AuthContext";
import { ProtectedRoute } from "./modules/Auth/components/ProtectedRoute";

const BookshelfPage = lazy(
  () => import("./modules/Bookshelf/components/Bookshelf"),
);
const UserSectionPage = lazy(
  () => import("./modules/Auth/components/UserSection"),
);
const WishlistPage = lazy(() => import("./modules/Wishlist/Wishlist"));
const RegisterForm = lazy(
  () => import("./modules/Auth/components/RegisterForm"),
);
const LoginForm = lazy(() => import("./modules/Auth/components/LoginForm"));
const BookDetailsPage = lazy(
  () => import("./modules/BookDetails/components/BooksDetails"),
);

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<BookshelfPage />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserSectionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/book-details/:id" element={<BookDetailsPage />} />
        </Routes>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
