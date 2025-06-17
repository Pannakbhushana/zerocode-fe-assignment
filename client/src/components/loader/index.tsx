import { Spinner } from "@chakra-ui/react";
import React from "react";

const Loader:React.FC = () => {
 return <div className="h-screen flex justify-center items-center">
      <div><Spinner size="xl" color="teal.500" borderWidth="4px" />
      <p className="text-xl mt-5">Loading...</p>
      </div>
    </div>
}

export default Loader