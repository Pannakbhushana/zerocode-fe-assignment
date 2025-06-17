import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import logoutUser from "../../../src/utils/logout";
import useCustomToast from "../../components/toast/useCustomToast";
// import Animation from "../../components/layouts/animation-layout/animation";

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const toast = useCustomToast()
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser(dispatch, navigate)
        toast.success('You have been logged out.')
    };

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <Box className="md:w-1/2">
                <div className=" w-full flex justify-center items-center">
                    {/* <Animation animationUrl={animationUrl.robot}/> */}
                    {/* <img src="./cartoon-image.png" alt="" className="h-[50vh] md:h-[60vh] w-full md:w-1/2 mt-20" /> */}
                </div>
                <Box className="text-xl sm:text-2xl font-bold text-gray-700 text-center">
                You’re already Logged In! 🎉
              </Box>
            <Text className="text-gray-500 text-center mt-2 text-sm sm:text-base">
                Enjoy seamless access to your <span className="text-blue-500 underline cursor-pointer" onClick={()=>navigate('/')}>dashboard.</span>
            </Text>

            <Button
                colorScheme="red"
                className="mt-6 text-sm sm:text-base w-20"
                onClick={handleLogout}
            >
                Logout
            </Button>
            </Box>
        </div>
    );
};

export default Logout;
