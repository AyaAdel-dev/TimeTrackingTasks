import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../Requests/auth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token)
      navigate(`/home/${localStorage.getItem('userId')}`);

  }, [navigate]);

  const [formErrors, setFormErrors] = useState({});
  const [name, setName] = useState(''); // added state for task name

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const result = await login(formData);
      if (result.user === null) {
        alert("User not found");
      } else {
        // Save the token in local storage
        localStorage.setItem("token", result.accessToken);
        localStorage.setItem("user", JSON.stringify(result.user))
        localStorage.setItem("userId", result.user._id)

        // DONT KNOW WHY THIS IS HERE
        // Add the task with the userId
        // const task = { name, userId: result.user._id };
        // try {
        //   const response = await axios.post(`http://localhost:3000/tasks`, task, {
        //     headers: {
        //       Authorization: `Bearer ${result.token}`
        //     }
        //   });
        //   setName('');
        //   console.log('Response:', response.data);
        // } catch (error) {
        //   console.error(error);
        // }

        // Navigate to the home page
        navigate(`/home/${result.user._id}`);
      }
    }
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
            className=""
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
              width: "40%",
              height: "52%",
              backgroundColor: "#cea3f7",
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
                    paddingTop: "1.2rem",
                  }}
                >
                  Login
                </h2>
                <div
                  className="form-row"
                  style={{ position: "relative", left: "17%" }}
                >
                  <div className="form-group col-md-8">
                    <label htmlFor="inputEmail4">Email</label>
                    <input
                      type="email"
                      className={`form-control px-3 ${formErrors.email ? "is-invalid" : ""
                        }`}
                      name="email"
                      id="email"
                      placeholder="Email"
                      onChange={handleInputChange}
                    />
                    {formErrors.email && (
                      <div className="invalid-feedback">
                        {formErrors.email}
                      </div>
                    )}
                  </div>

                  <div className="form-group col-md-8 pt-4">
                    <label htmlFor="inputPassword4">Password</label>
                    <input
                      type="password"
                      className={`form-control ${formErrors.password ? "is-invalid" : ""
                        }`}
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={handleInputChange}
                    />
                    {formErrors.password && (
                      <div className="invalid-feedback">
                        {formErrors.password}
                      </div>
                    )}
                  </div>
                  <br></br>
                  <a
                    className="pt-2"
                    href="/register"
                    style={{ color: "#2e0b4f" }}
                  >
                    Create an account
                  </a>
                </div>

                <div
                  className="pt-2"
                  style={{ position: "relative", left: "40%" }}
                >
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "20%", backgroundColor: "#48325d" }}
                  >
                    Submit
                  </button>
                </div>
                {/* {formErrors.password && (
                  <Continued:

                  div className="invalid-feedback">{formErrors.password}</div>
                )} */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;