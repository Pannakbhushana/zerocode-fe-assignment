import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { AppDispatch } from '../../../redux/store';
import { login } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import useCustomToast from '../../../components/toast/useCustomToast';
import { constMsg, path } from '../../../components/constant';
import { useLocation } from 'react-router-dom';

const useLoginForm = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const toast = useCustomToast();
    const location = useLocation();
    const from = (location.state as any)?.from?.pathname || path.LANDING_PAGE;

    const formik = useFormik({
        initialValues: {
            email: '',
            password:'',
        },
        validationSchema: Yup.object({
            password: Yup.string().required('password is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required signup first'),
        }),
        onSubmit: async (values) => {
            const apiData = {
                ...values,
            }
            try {
                const actionResult = await dispatch(login(apiData));
                unwrapResult(actionResult);
                
                toast.success('Welcome back! You are now logged in. 🎉');
                navigate(from, { replace: true });
            } catch (error:any) {
                const msg = error?.error?.message ? error?.error?.message :  constMsg.COMMON_ERR_MSG
                toast.error(msg);
            }
        },
    });

    return {
        formik,
    };
};

export default useLoginForm;
