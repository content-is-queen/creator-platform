import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.config";
import API from "@/api/api";
import { useUser } from "@/context/UserContext";
import { getUserProfile } from "@/context/UserContext";

const useAuth = () => {
  const { setUser } = useUser();

  const signup = async (data, id) => {
    try {
      const response = await API("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, role: id }),
      });
      return response;
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const signin = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const userProfile = await getUserProfile(user);
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      setUser({
        email,
        displayName: user.displayName,
        imageUrl: user.imageUrl,
        ...userProfile,
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      auth.signOut();
      localStorage.removeItem("userProfile");

      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return { logout, signin, signup, getUserProfile };
};

export default useAuth;
