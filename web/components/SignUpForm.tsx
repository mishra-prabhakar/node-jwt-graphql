import react, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import styles from "../styles/Login.module.css";
import { gql, useMutation } from "@apollo/client";

const REGISTER = gql`
  mutation register(
    $password: String!
    $email: String!
    $lastName: String!
    $firstName: String!
  ) {
    register(
      password: $password
      email: $email
      lastName: $lastName
      firstName: $firstName
    )
  }
`;

const SignUpForm = () => {
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");
  const [register] = useMutation(REGISTER, {
    onCompleted(data) {
      if (data) {
        setRegistered(data.register);
        setError("");
      }
    },
    onError(error) {
      const { message } = { ...error };
      console.error("Login mutation failed: ", message);
      setError(message);
    },
  });

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(8, "Must be 8 characters or more")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const { firstName, lastName, email, password } = values;
        register({ variables: { firstName, lastName, email, password } });
        setSubmitting(false);
        setRegistered(false);
        resetForm({});
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <h1>Create Account</h1>
          <InputField name="firstName" type="text" placeholder="First Name" />
          <InputField name="lastName" type="text" placeholder="Last Name" />
          <InputField name="email" type="email" placeholder="Email" />
          <InputField name="password" type="password" placeholder="Password" />
          {isSubmitting ? (
            <div className={styles.message}>User registration in progress...</div>
          ) : null}
          {registered ? (
            <div className={styles.message}>User successfully registered.</div>
          ) : null}
          {error !== "" ? (
            <div className={styles.errorMessage}>{error}</div>
          ) : null}
          <button type="submit" className={`${styles.button}`}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
