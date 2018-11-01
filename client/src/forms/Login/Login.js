import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { userActions } from "../../store/actions/user.actions";

const languages = ["english", "swedish", "german", "french", "spanish"];

const login = props => {
  const { values, errors, touched, isSubmitting } = props;

  return (
    <Form className="Signin">
      <h2 className="form-title">Login</h2>
      <div className="form-group">
        {touched.username && errors.username && <p>{errors.username}</p>}
        <Field type="text" name="username" placeholder="username" />
      </div>

      <div className="form-group">
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="password" />
      </div>

      <button type="submit" disabled={isSubmitting}>
        login
      </button>
    </Form>
  );
};

export default connect()(
  withFormik({
    mapPropsToValues({ username, password }) {
      return {
        username: username || "",
        password: password || ""
      };
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("You need a username"),
      password: Yup.string()
        .min(6, "Your password must be 6 characters or longer")
        .required("You need a password")
    }),

    handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
      props.dispatch(userActions.login(values));
      setSubmitting(false);
      // axios
      //   .post("users/authenticate", values)
      //   .then(response => {
      //     if (response.data.success) {
      //       localStorage.setItem("jwtToken", response.data.token);
      //       console.log(response.data);
      //     } else {
      //       setErrors({ username: response.data.errorMsg });
      //       setSubmitting(false);
      //     }
      //   })
      //   .catch(err => {
      //     setErrors({ username: "Something went wrong" });
      //     resetForm();
      //     setSubmitting(false);
      //   });
    }
  })(login)
);

// handleSubmit(values, { props, setSubmitting }) {
//   props.dispatch(addProduct(values));
//   setSubmitting(false);
// },
