import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Bookshelf from "./modules/Bookshelf/components/Bookshelf";
import Header from "./shared/header/Header";
import UserSection from "./modules/Auth/UserSection";
import Wishlist from "./modules/Wishlist/Wishlist";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Bookshelf />}/>
        <Route path="/user" element={<UserSection />}/>
        <Route path="/wishlist" element={<Wishlist />}/>
      </Routes>
    </>
  );
}

export default App;
