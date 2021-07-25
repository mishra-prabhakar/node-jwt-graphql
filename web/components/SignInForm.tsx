import react from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from 'next/router'
import InputField from "./InputField";
import styles from "../styles/Login.module.css";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(password: $password, email: $email) {
      accessToken
      user {
        firstName
        lastName
      }
    }
  }
`;

const SignInForm = () => {
  const router = useRouter();
  const [login] = useMutation(LOGIN, {
    onCompleted(data) {
      // const { user } = data.login;
      // const { firstName, lastName } = user;
      router.push('/user');
    },
    onError(error) {
      console.error('Login mutation failed: ', { ...error })
    }, 
  });
  
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .required("Required"),
      })}
      onSubmit={(values) => {
        const { email, password } = values;
        login({ variables: { email, password } });
      }}
    >
      <Form className={styles.form}>
        <h1>Sign in</h1>
        <InputField name="email" type="email" placeholder="Email" />
        <InputField name="password" type="password" placeholder="Password" />

        <button type="submit" className={`${styles.button}`}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
