import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { AppDispatch, RootState } from '../../../redux/store';
import { verifyOtp } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { constMsg, path } from '../../../components/constant';
import useCustomToast from '../../../components/toast/useCustomToast';
import { useLocation } from 'react-router-dom';

const useVerifyOtpForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const userEmail = user?.email;
    const toast = useCustomToast();
     const location = useLocation();
    const from = (location.state as any)?.from?.pathname || path.LANDING_PAGE;

    const formik = useFormik({
        initialValues: {
            email: userEmail as string,
            otp:'',
        },
        validationSchema: Yup.object({
            otp: Yup.string().required('Otp is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required signup first'),
        }),
        onSubmit: async (values) => {
            const apiData = {
                ...values,
            }
            try {
                const actionResult = await dispatch(verifyOtp(apiData));
                unwrapResult(actionResult);
                toast.success(constMsg.ACCOUNT_CREATED_SUCCESS_MSG);
                navigate(from, { replace: true });
            } catch (error:any) {
                const errorMsg = error ? error : constMsg.COMMON_ERR_MSG;
                toast.error(errorMsg);
            }
        },
    });

    return {
        formik,
    };
};

export default useVerifyOtpForm;
