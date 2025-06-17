import React from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./scroll-to-top";
import { path } from "../components/constant";
import PrivateRoute from "./private-route";
import SignupVerifyOTPForm from "../pages/authentication/signup-verify-otp";
import LoginPage from "../pages/authentication/login";
import Signup from "../pages/authentication/signup";
import NotFoundPage from "../pages/page-not-found";
import ResetPassword from "../pages/authentication/Reset-password";
import DeleteAccount from "../pages/authentication/delete-account";
import Dashboard from "../pages/dashboard";
import Layout from "../components/layouts";
import HelpPage from "../pages/help";


const AllRoutes = () => {
    return <ScrollToTop>
        <Routes>
            {/* public route */}

            <Route path={path.SIGNUP_VERIFY_OTP} element={<SignupVerifyOTPForm />} />
            <Route path={path.LOGIN_PAGE} element={<LoginPage />} />
            <Route path={path.SIGN_UP} element={<Signup />} />
            <Route path={path.NOT_FOUND} element={<NotFoundPage />} />
            <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
            <Route path={path.DELETE_ACCOUNT} element={<DeleteAccount />} />
            <Route path={path.HELP_PAGE} element={<HelpPage />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                    <Route path={path.LANDING_PAGE} element={<Dashboard />} />
                </Route>
            </Route>
        </Routes>
    </ScrollToTop>
}

export default AllRoutes