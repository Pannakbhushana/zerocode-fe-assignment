import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    IconButton,
    Text,
    Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Loader from "../../components/loader";
import usePasswordForm from "./formik/reset-password.form.hook";

const ResetPassword = () => {
    const { formik, isResetOtp, loading } = usePasswordForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    if (loading) return <Loader />;

    return (
        <Box className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Box className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <Text className="text-xl font-semibold">Reset Password</Text>
                <br />
                <form onSubmit={formik.handleSubmit}>
                    <VStack spacing={4}>


                        {!isResetOtp && (
                            <>
                                <FormControl
                                    isRequired
                                    isInvalid={!!formik.errors.email && formik.touched.email}
                                >
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                                </FormControl>

                                <FormControl
                                    isRequired
                                    isInvalid={
                                        !!formik.errors.newPassword && formik.touched.newPassword
                                    }
                                >
                                    <FormLabel>New Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            name="newPassword"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter new password"
                                            value={formik.values.newPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <InputRightElement>
                                            <IconButton
                                                aria-label="Toggle password"
                                                icon={<Icon
                                                    as={(showPassword ? FiEyeOff : FiEye) as React.ElementType}
                                                    boxSize={5}
                                                />}
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => setShowPassword(!showPassword)}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{formik.errors.newPassword}</FormErrorMessage>
                                </FormControl>

                                <FormControl
                                    isRequired
                                    isInvalid={
                                        !!formik.errors.confirmPassword &&
                                        formik.touched.confirmPassword
                                    }
                                >
                                    <FormLabel>Confirm Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm new password"
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <InputRightElement>
                                            <IconButton
                                                aria-label="Toggle confirm password"
                                                icon={<Icon
                                                    as={(showPassword ? FiEyeOff : FiEye) as React.ElementType}
                                                    boxSize={5}
                                                />}
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {formik.errors.confirmPassword}
                                    </FormErrorMessage>
                                </FormControl>
                            </>
                        )}

                        {isResetOtp && (
                            <>
                                <FormControl
                                    isRequired
                                    isInvalid={!!formik.errors.otp && formik.touched.otp}
                                >
                                    <FormLabel>Enter OTP</FormLabel>
                                    <Input
                                        name="otp"
                                        type="text"
                                        placeholder="Enter the OTP"
                                        value={formik.values.otp}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FormErrorMessage>{formik.errors.otp}</FormErrorMessage>
                                </FormControl>
                                <Box className=" text-start">
                                    <p className="text-sm text-gray-700">
                                        We’ve sent a 6-digit code to your email{" "}
                                        <span className="text-teal-500">{formik.values.email}</span>. Please check your inbox (and spam folder).
                                    </p>
                                </Box>
                            </>
                        )}

                        <Button type="submit" colorScheme="teal" size="lg" w="full">
                            {isResetOtp ? "Verify OTP" : "Send OTP"}
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Box>
    );
};

export default ResetPassword;
