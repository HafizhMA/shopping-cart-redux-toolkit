import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import DetailProductPage from "./pages/DetailProductPage";
import Header from './components/Header';
import Footer from './components/Footer';
import { ProtectRegisterRoute, ProtectRoutes } from "./utils/ProtectRegisterRoute";
import RegisterPages from "./pages/RegisterPages";
import LoginPages from "./pages/LoginPages";
import ResetPasswordPages from "./pages/ResetPasswordPages";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import { ToastContainer } from "react-toastify";
import CheckoutPage from "./pages/checkout-pages/CheckoutPage";
import SearchProductPages from "./pages/search-product-pages/SearchProductPages";
import CartPages from "./pages/cart-pages/CartPages";
import PaymentCheckPages from "./pages/payment-pages/PaymentCheckPages";
import DetailHistoryPaymentPage from "./pages/payment-pages/DetailHistoryPaymentPage";
import EditProfilePages from "./pages/profile-pages/EditProfilePages";
import FormJualPage from "./pages/profile-pages/FormJualPage";

function App() {
  return (
    <div className="bg-slate-100">
      <ToastContainer />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-product" element={<SearchProductPages />} />
        <Route path="/detail/:id" element={<DetailProductPage />} />

        {/* must login first to access */}
        <Route element={<ProtectRoutes />}>
          <Route path="/sell-product" element={<FormJualPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPages />} />
          <Route path="/order-list" element={<PaymentCheckPages />} />
          <Route path="/order-list/:id" element={<DetailHistoryPaymentPage />} />
          <Route path="/edit-profile" element={<EditProfilePages />} />
        </Route>

        {/* if already login then cant access register and login again, must logout first */}
        <Route element={<ProtectRegisterRoute />}>
          <Route path="/register" element={<RegisterPages />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/forget-password" element={<ResetPasswordPages />} />
          <Route path="/update-password/:token" element={<UpdatePasswordPage />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
