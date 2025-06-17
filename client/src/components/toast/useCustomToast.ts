import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast();

  const showToast = (title: string, description: string, status: "success" | "error" | "warning" | "info") => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return {
    success: (msg: string) => showToast("Success", msg, "success"),
    error: (msg: string) => showToast("Error", msg, "error"),
    warning: (msg: string) => showToast("Warning", msg, "warning"),
    info: (msg: string) => showToast("Info", msg, "info"),
  };
};

export default useCustomToast;
