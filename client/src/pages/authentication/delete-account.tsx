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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useDeleteAccountForm from "./formik/delete-account.hook";
import AlertBox from "../../components/layouts/alert-box.tsx";

const DeleteAccount: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const { formik } = useDeleteAccountForm();

  const handleDeleteClick = (e: React.FormEvent) => {
    e.preventDefault();

    formik.validateForm().then(errors => {
      formik.setTouched({
        email: true,
        password: true,
      });

      if (Object.keys(errors).length === 0) {
        setIsAlertOpen(true); // Open confirmation dialog
      }
    });
  };

  const handleConfirmDelete = () => {
    setIsAlertOpen(false);
    formik.handleSubmit(); // Submit the form manually
  };


  if (loading) {
    return <Loader />;
  }

  return (
    <Box className="flex items-center justify-center min-h-screen p-4 sm:p-6">
      <form onSubmit={handleDeleteClick} className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        <Box className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full">
          <Box className="text-xl sm:text-2xl font-bold text-red-600 text-center">
            Delete Account ❌
          </Box>
          <Text className="text-gray-500 text-center mt-2 text-sm sm:text-base">
            Enter your email and password to confirm account deletion.
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
                placeholder="Enter your email"
                className="text-sm sm:text-base"
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
                  className="text-sm sm:text-base"
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

            <Button
              colorScheme="red"
              className="w-full text-sm sm:text-base"
              type="submit"
            >
              Delete My Account
            </Button>

            <Button
              variant="outline"
              colorScheme="gray"
              className="w-full text-sm sm:text-base"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </VStack>
        </Box>
      </form>

      {/* Confirmation Alert Dialog */}
      <AlertBox
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Are you sure?"
        description="This action will permanently delete your account. This cannot be undone."
        confirmText="Yes, delete it"
        cancelText="No, cancel"
        confirmColorScheme="red"
      />
    </Box>
  );
};

export default DeleteAccount;
