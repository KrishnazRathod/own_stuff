/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/NotesSlice";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values: any) => {
    console.log(values);

    const credentials: any = {
      username: values.name,
      email: values.email,
      password: values.confirmPassword,
    };

    dispatch(signupUser(credentials)).then(() => {
      toast({
        title: "Account Created!",
        description: "You've successfully signed up.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    });
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        p={8}
        maxWidth="600px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <Heading as="h1" size="lg" mb={6} textAlign="center">
          Sign Up
        </Heading>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Name Field */}
              <Field name="name">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                    mb={4}
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input {...field} id="name" placeholder="Enter your name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                    mb={4}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Password Field */}
              <Field name="password">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                    mb={4}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        id="password"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Confirm Password Field */}
              <Field name="confirmPassword">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={
                      form.errors.confirmPassword &&
                      form.touched.confirmPassword
                    }
                    mb={4}
                  >
                    <FormLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        type={showPassword ? "text" : "password"}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {form.errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Submit Button */}
              <Button
                type="submit"
                colorScheme="teal"
                width="full"
                mt={4}
                isLoading={isSubmitting}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default SignUpPage;
