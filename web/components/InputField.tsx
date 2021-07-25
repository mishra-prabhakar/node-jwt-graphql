import react from "react";
import { useField } from "formik";
import styles from "../styles/Login.module.css";

const InputField = ({ label = "", ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className={styles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.errorMessage}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default InputField;
