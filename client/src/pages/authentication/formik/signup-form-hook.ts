import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { AppDispatch } from '../../../redux/store';
import { signup } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import useCustomToast from '../../../components/toast/useCustomToast';
import { constMsg, path } from '../../../components/constant';


const useSignupForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const toast = useCustomToast();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Name must be at least 2 characters')
                .max(50, 'Name cannot exceed 50 characters')
                .required('Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .max(20, 'Password cannot exceed 20 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            const apiData = {
                ...values,
            }
            try {
                const actionResult = await dispatch(signup(apiData));
                unwrapResult(actionResult);
                toast.success(constMsg.REGESTRATION_MSG);
                navigate(path.SIGNUP_VERIFY_OTP)
            } catch (error:any) {
                const errorMsg = error.message ? error.message : constMsg.COMMON_ERR_MSG;
                toast.error(errorMsg);
            }
        },
    });

    return {
        formik,
    };
};

export default useSignupForm;
