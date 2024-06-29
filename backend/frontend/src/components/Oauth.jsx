import React from "react";
import { FcGoogle } from "react-icons/fc";
import { app } from "../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleOauthMutation } from "../slices/usersApiSlice";
import CircularProgress from "@mui/material/CircularProgress";

const Oauth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [googleOauth, { isLoading }] = useGoogleOauthMutation();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      console.log(resultsFromGoogle);

      const res = await googleOauth({
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      });

      console.log("response:", res);

      if (res.data) {
        dispatch(setCredentials({ ...res.data }));
        toast.success("Login successful!");
        navigate("/");
      } else {
        console.log(data.message);
        toast.error("Failed to login with Google.");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <div>
      {!isLoading && (
        <div>
          <span className="flex justify-center mt-1">or</span>
          <button
            className="flex items-center mt-3 justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 transition-colors duration-300"
            onClick={handleGoogleClick}
          >
            <FcGoogle className="text-2xl mr-2" /> {/* Google Icon */}
            Continue with Google
          </button>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center gap-2">
          <CircularProgress size={64} style={{ color: "#718096" }} />
          <span className="text-gray-600">Loading ...</span>
        </div>
      )}
    </div>
  );
};

export default Oauth;
