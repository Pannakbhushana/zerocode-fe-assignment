import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Box,
  VStack,
  IconButton,
  Divider,
  FormErrorMessage,
  Icon,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Loader from "../../components/loader";
import useLoginForm from "./formik/login-form.hook";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { path } from "../../components/constant";
import Logout from "./logout";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { formik } = useLoginForm();
  const { loading, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  if (token) {
    return <Logout />
  }

  return (
    <Box className="flex items-center justify-center min-h-screen p-4 sm:p-6">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        <Box className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full">
          <Box className="text-xl sm:text-2xl font-bold text-gray-700 text-center">
            Welcome Back! 👋
          </Box>
          <Text className="text-gray-500 text-center mt-2 text-sm sm:text-base">
            Enter your credentials to access your account.
          </Text>
          <Divider className="my-4" />

          <VStack spacing={4}>
            <FormControl isRequired isInvalid={!!formik.errors.email && formik.touched.email}>
              <FormLabel className="text-sm sm:text-base">Email</FormLabel>
              <Input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter email or phone"
                className="focus:border-blue-500 focus:ring focus:ring-blue-300 text-sm sm:text-base"
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.password && formik.touched.password}>
              <FormLabel className="text-sm sm:text-base">Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Enter password"
                  className="focus:border-blue-500 focus:ring focus:ring-blue-300 text-sm sm:text-base"
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Toggle password visibility"
                    icon={<Icon
                      as={(showPassword ? FiEyeOff : FiEye) as React.ElementType}
                      boxSize={5}
                    />}
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <Text
              className="text-blue-500 text-xs sm:text-sm self-end cursor-pointer hover:underline"
              onClick={() => navigate(path.RESET_PASSWORD)}
            >
              Forgot Password?
            </Text>

            <Button colorScheme="teal" className="w-full text-sm sm:text-base" type="submit">
              Login
            </Button>

            <Text className="text-xs sm:text-sm text-gray-600 text-center">
              New here?
              <span
                className="text-blue-500 cursor-pointer hover:underline font-semibold text-sm sm:text-lg px-2"
                onClick={() => navigate(path.SIGN_UP)}
              >
                Create an account
              </span>
              and start your journey with us! 🚀
            </Text>
            <Text className="text-xs sm:text-sm text-gray-600 text-center mt-2">
              Want to leave us?
              <span
                className="text-red-500 cursor-pointer hover:underline font-semibold px-2"
                onClick={() => navigate(path.DELETE_ACCOUNT)}
              >
                Delete your account
              </span>
            </Text>
          </VStack>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;
