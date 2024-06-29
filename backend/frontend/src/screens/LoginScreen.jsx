import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Oauth from "../components/Oauth";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex h-screen">
      <img
        className="w-1/2 hidden lg:block object-cover"
        src="https://img.freepik.com/free-photo/superfood-background-with-green-vegetables_53876-106104.jpg?w=826&t=st=1683029587~exp=1683030187~hmac=8d6f38ac6002119be48b7bdd8e625d490e0a98ca60f3af2ace90ab7b644589a9"
        alt="image from freepik"
      />
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
        <div>
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <Link to="/">
              <div className="flex gap-1 border-green-600 px-2 pr-3 py-1 border-[3px] rounded-full hover:bg-green-600 hover:text-white transition duration-100 text-green-600">
                <HiOutlineArrowCircleLeft size={25} />
                <span className="font-bold">Home</span>
              </div>
            </Link>
            <span className="text-xl font-bold">KrishiPal</span>
          </div>
          <div className="text-3xl text-center font-bold lg:text-left mt-4">
            <h2>Hello,</h2>
            <h2>Welcome Back</h2>
          </div>

          {/* login form */}

          <form
            onSubmit={submitHandler}
            className="mt-8 w-[80%] lg:w-96 mx-auto space-y-4"
          >
            <h4>Login to manage your account</h4>
            <input
              type="email"
              placeholder="Email"
              className="border w-full px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border w-full px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-blue-600 cursor-pointer hover:text-blue-400">
              Forgot your password?
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full text-white rounded bg-green-600 py-2 font-bold hover:bg-green-500"
            >
              Login
            </button>

            {isLoading && (
              <div className="flex items-center justify-center gap-2">
                <CircularProgress size={64} style={{ color: "#718096" }} />
                <span className="text-gray-600">Loading ...</span>
              </div>
            )}
          </form>
        </div>

        {/* oauth */}
        <div className="mt-4">
          <Oauth />
        </div>
        <div className="mt-4">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:text-blue-400">
            <Link to={"/register"}>Sign up here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
