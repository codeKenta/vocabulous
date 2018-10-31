import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const languages = ["english", "swedish", "german", "french", "spanish"];

const signup = props => {
  const { values, errors, touched, isSubmitting } = props;

  return (
    <Form className="Signin">
      <h2 className="form-title">Signup</h2>

      <div className="form-group">
        {touched.username && errors.username && <p>{errors.username}</p>}
        <Field type="text" name="username" placeholder="username" />
      </div>

      <div className="form-group">
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="password" />
      </div>

      <div className="form-group">
        {errors.lang1 && <p>{errors.lang1}</p>}
        <Field component="select" name="lang1">
          {languages.map(language => (
            <option value={language} key={language}>
              {language}
            </option>
          ))}
        </Field>
      </div>

      <div className="form-group">
        <Field component="select" name="lang2">
          {languages.map(language => (
            <option value={language} key={language}>
              {language}
            </option>
          ))}
        </Field>
      </div>

      <button type="submit" disabled={isSubmitting}>
        signup
      </button>
    </Form>
  );
};

export default withFormik({
  mapPropsToValues({ username, password, lang1, lang2 }) {
    return {
      username: username || "",
      password: password || "",
      lang1: lang1 || "english",
      lang2: lang2 || "swedish"
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("You need a username"),
    password: Yup.string()
      .min(6, "Your password must be 6 characters or longer")
      .required("You need a password"),
    lang1: Yup.mixed().test("match", "You need different languages", function(
      lang1
    ) {
      return lang1 !== this.parent.lang2;
    })
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    axios
      .post("/users/signup", values)
      .then(response => {
        if (response.data.success) {
          // Success
          console.log("success registaration and login", response);
          setSubmitting(false);
        } else {
          const errors = response.data.errorMsg;
          errors.username && setErrors({ username: errors.username });
          setSubmitting(false);
        }
      })
      .catch(setSubmitting(false));
  }
})(signup);
