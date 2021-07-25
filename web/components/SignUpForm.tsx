import react from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import styles from "../styles/Login.module.css";

const SignUpForm = () => {
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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className={styles.form}>
        <h1>Create Account</h1>
        <InputField name="firstName" type="text" placeholder="First Name" />
        <InputField name="lastName" type="text" placeholder="Last Name" />
        <InputField name="email" type="email" placeholder="Email" />
        <InputField name="password" type="password" placeholder="Password" />

        <button type="submit" className={`${styles.button}`}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
