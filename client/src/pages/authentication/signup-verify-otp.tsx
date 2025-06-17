import { Input, Button, VStack, FormControl, FormLabel, Box, useToast, FormErrorMessage } from "@chakra-ui/react";
import useVerifyOtpForm from "./formik/verify-otp-form.hook";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loader from "../../components/loader";

const SignupVerifyOTPForm = () => {
 
    const { formik } = useVerifyOtpForm();
    const { loading } = useSelector((state: RootState) => state.auth);

    if (loading) {
       return <Loader />
    }
    return (
        <Box className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Box className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <Box className="text-2xl font-bold text-teal-600 text-center">Verify OTP</Box>
                <form onSubmit={formik.handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isRequired isInvalid={!!formik.errors.email && formik.touched.email}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={!!formik.errors.otp && formik.touched.otp}>
                            <FormLabel>OTP</FormLabel>
                            <Input
                                type="text"
                                name="otp"
                                placeholder="Enter your code"
                                maxLength={6}
                                value={formik.values.otp}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>{formik.errors.otp}</FormErrorMessage>
                        </FormControl>
                        <p className="text-sm text-blue-600">We’ve sent a 6-digit code to your email. Please check your inbox (and spam folder)</p>
                        <Button type="submit" colorScheme="teal" size="lg" w="full">
                            Verify OTP
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Box>
    );
};

export default SignupVerifyOTPForm;
