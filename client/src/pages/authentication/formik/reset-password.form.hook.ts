import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { login, resetPassword, sendResetOtp } from "../../../redux/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import useCustomToast from '../../../components/toast/useCustomToast';
import { useNavigate } from "react-router-dom";
import { constMsg, path } from "../../../components/constant";


const getValidationSchema = (isResetOtp: boolean) =>
    Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),

        newPassword: Yup.string().when([], {
            is: () => !isResetOtp,
            then: (schema) =>
                schema
                    .required("New password is required")
                    .min(6, "Min 6 characters"),
            otherwise: (schema) => schema.notRequired(),
        }),

        confirmPassword: Yup.string().when([], {
            is: () => !isResetOtp,
            then: (schema) =>
                schema
                    .required("Confirm password is required")
                    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
            otherwise: (schema) => schema.notRequired(),
        }),

        otp: Yup.string().when([], {
            is: () => isResetOtp,
            then: (schema) => schema.required("OTP is required"),
            otherwise: (schema) => schema.notRequired(),
        }),
    });

const usePasswordForm = () => {
    const [isResetOtp, setIsResetOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const toast = useCustomToast();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
            confirmPassword: "",
            otp: "",
        },
        validationSchema: getValidationSchema(isResetOtp),
        onSubmit: async (values) => {
            try {
                setLoading(true);
                if (!isResetOtp) {
                    const actionResult = await dispatch(sendResetOtp({ email: values.email }))
                    unwrapResult(actionResult);
                    toast.success('OTP sent to your mail')
                    setIsResetOtp(true);
                } else {
                    const payload = {
                        email: values.email,
                        otp: values.otp,
                        newPassword: values.newPassword,
                    };
                    const actionResult = await dispatch(resetPassword(payload))
                    unwrapResult(actionResult);
                    toast.success('Password has been reset')
                    const loginResult = await dispatch(login({ email: values.email, password: values.newPassword }));
                    unwrapResult(loginResult);
                    navigate(path.LANDING_PAGE)
                    setIsResetOtp(true);
                }
            } catch (error: any) {
                const errorMsg = error ? error : constMsg.COMMON_ERR_MSG;
                toast.error(errorMsg);
            } finally {
                setLoading(false);
            }
        },
    });

    return {
        formik,
        isResetOtp,
        loading,
    };
};

export default usePasswordForm;
