import {
  Button,
  FormControl,
  FormLabel,
  Input,
  // InputGroup,
  // InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";

import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false); //done by myself.see chakraUI site
  const [show2, setShow2] = useState(false); //done by myself.see chakraUI site
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setShow(!show);
  const handleClick2 = () => setShow2(!show2);

  const postDetails = (pics) => {
    //Function to post pictures
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "new-app012");
      fetch("https://api.cloudinary.com/v1_1/new-app012/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !password || !email || !confirmpassword) {
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
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 50000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/user",
        { name, email, password, pic },
        config
      );
      // console.log(config);
      // console.log({ name, email, password, pic });
      toast({
        title: "Registration is Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      console.log(config);
      console.log({ name, email, password, pic });
      // console.log(error);
      toast({
        title: "ERROR Occured!",
        description: error.response.data.message,
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
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
          onClick={handleClick}
        >
          {show ? "Hide" : "Show"}
        </Button>
      </FormControl>
      <FormControl position="relative" id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          width="85%"
          type={show2 ? "text" : "password"} //show hide button
          placeholder="Re-Enter Your Password"
          onChange={(e) => {
            setConfirmpassword(e.target.value);
          }}
        />

        <Button
          position="absolute"
          right="8px"
          top="50%"
          h="1.75rem"
          size="sm"
          onClick={handleClick2}
        >
          {show2 ? "Hide" : "Show"}
        </Button>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        ></Input>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
