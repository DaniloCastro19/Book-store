import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./shared/header/Header";
import { lazy, Suspense} from "react";

const BookshelfPage = lazy(() => import("./modules/Bookshelf/components/Bookshelf"));
const UserSectionPage = lazy(() => import("./modules/Auth/UserSection"));
const WishlistPage = lazy(() => import("./modules/Wishlist/Wishlist"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Header />
      <Routes>
        <Route path="/" element={<BookshelfPage />}/>
        <Route path="/user" element={<UserSectionPage />}/>
        <Route path="/wishlist" element={<WishlistPage />}/>
      </Routes>
    </Suspense>
  );
}

export default App;
