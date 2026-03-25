import "./App.css";
import { Routes, Route } from "react-router-dom";
import BooksPage from "./modules/BooksPage/components/BooksPage";
import Header from "./shared/components/header/Header";
import UserSection from "./modules/Auth/UserSection";
import Wishlist from "./modules/Wishlist/Wishlist";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<BooksPage />}/>
        <Route path="/user" element={<UserSection />}/>
        <Route path="/wishlist" element={<Wishlist />}/>
      </Routes>
    </>
  );
}

export default App;
