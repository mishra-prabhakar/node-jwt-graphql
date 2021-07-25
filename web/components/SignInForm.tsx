import react from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import styles from "../styles/Login.module.css";

const SignInForm = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(8, "Must be 8 characters or more")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
