import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/into.css"
import register from "../Requests/register";
function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      // submit the form data
      console.log("Form submitted:", formData);
      await register(formData)
      // Assuming the registration was successful, show an alert and redirect to the login page
      alert('Registration successful. Please log in with your new account.');
      navigate('/');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  };

  return (
    <div className="page-background ">
      <div className="mainDiv">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <div
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              // padding: "20px",
              borderRadius: "10px",
              width: "40%",
              height: "52%",
              backgroundColor: "#cea3f7"
            }}
          >
            <form onSubmit={handleSubmit}>
              <div>
                <h2
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "underline",
                    color: "#2e0b4f",
                    paddingTop: "1.5rem"
                  }}
                >
                  Register
                </h2>
                <div className="form-row" style={{ position: "relative", left: "17%" }}>
                  <div className="form-group col-md-8">
                    <label htmlFor="inputEmail4">Email</label>
                    <input
                      type="email"
                      className={`form-control px-3 ${formErrors.email ? "is-invalid" : ""}`}
                      name="email"
                      id="email"
                      placeholder="Email"
                      onChange={handleInputChange}
                      value={formData.email}
                    />
                    {formErrors.email && (
                      <div className="invalid-feedback">{formErrors.email}</div>
                    )}
                  </div>

                  <div className="form-group col-md-8 pt-4">
                    <label htmlFor="inputPassword4">Password</label>
                    <input
                      type="password"
                      className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={handleInputChange}
                      value={formData.password}
                    />
                    {formErrors.password && (
                      <div className="invalid-feedback">{formErrors.password}</div>
                    )}
                  </div>
                </div>
                <div className="pt-4" style={{ position: "relative", left: "40%" }}>
                  <button type="submit" className="btn btn-primary" style={{ width: "20%", backgroundColor: "#48325d" }}>
                    Submit
                  </button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;