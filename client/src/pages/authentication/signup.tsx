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
  useToast,
  Select,
  FormErrorMessage,
  Icon,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useSignupForm from "./formik/signup-form-hook";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loader from "../../components/loader";
import { path } from "../../components/constant";
import Logout from "./logout";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { formik } = useSignupForm();
  const { loading, token } = useSelector((state: RootState) => state.auth);

  if (loading){
    return <Loader/>
  } 

  if(token){
    return <Logout/>
  }

  return (
    <Box className="flex items-center justify-center min-h-screen mt-20 mb-20">
     <Box className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[40%]">
        <Box className="text-2xl font-bold text-teal-600 text-center">Create Your Account 🎉</Box>
        <Text className="text-gray-500 text-center mt-2">Join us and start your journey today!</Text>
        <Divider className="my-6" />

        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired isInvalid={!!formik.errors.name && formik.touched.name}>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Enter your full name"
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!formik.errors.email && formik.touched.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Enter your email"
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

          
            <FormControl isRequired isInvalid={!!formik.errors.password && formik.touched.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Create a password"
                />

                <InputRightElement>
                  <IconButton aria-label="Toggle password visibility"
                     icon={<Icon
                      as={(showPassword ? FiEyeOff : FiEye) as React.ElementType}
                      boxSize={5}
                    />} variant="ghost" size="sm" onClick={() => setShowPassword(!showPassword)} />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

           

            <Button colorScheme="teal" className="w-full" type="submit">Sign Up</Button>
            <Text className="text-sm text-gray-600">Already have an account?
              <span className="text-blue-500 cursor-pointer hover:underline font-semibold text-lg px-2" onClick={() => navigate(path.LOGIN_PAGE)}>Log in here</span> and continue where you left off! 🚀</Text>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
