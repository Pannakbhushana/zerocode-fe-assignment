import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { AppDispatch } from '../../../redux/store';
import { deleteAccount } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import useCustomToast from '../../../components/toast/useCustomToast';
import { constMsg, path } from '../../../components/constant';

const useDeleteAccountForm = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const toast = useCustomToast();

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
                const actionResult = await dispatch(deleteAccount(apiData));
                unwrapResult(actionResult);
                
                toast.success('Account deleted successfully');
                navigate(path.LANDING_PAGE)
            } catch (error:any) {
                const msg = error?.message ? error?.message :  constMsg.COMMON_ERR_MSG
                toast.error(msg);
            }
        },
    });

    return {
        formik,
    };
};

export default useDeleteAccountForm;
