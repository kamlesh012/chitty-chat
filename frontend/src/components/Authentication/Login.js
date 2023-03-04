import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("Enter Your Email");
  const [password, setPassword] = useState("Enter Your Password");
  const [show, setShow] = useState(false); //done by myself.see chakraUI site
  const toast = useToast();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleClick = () => setShow(!show);

  const submitHandler = () => {
    setLoading(true);
    if (!password || !email) {
      toast({
        title: "Please Fill all the fields",
        status: "warning",
        duration: 50000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login is Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "ERROR Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl position="relative" id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          width="85%"
          type={show ? "text" : "password"}
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          position="absolute"
          right="8px"
          top="50%"
          h="1.75rem"
          size="sm"
          isLoading={loading}
          onClick={handleClick}
        >
          {show ? "Hide" : "Show"}
        </Button>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        LogIn
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Guest User LogIn
      </Button>
    </VStack>
  );
};

export default Login;
