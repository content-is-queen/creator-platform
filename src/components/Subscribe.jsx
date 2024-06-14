import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useUser } from "@/context/UserContext";
import API from "@/api/api";
import useToken from "@/hooks/useToken";

const Subscribe = () => {
  const { user, setUser } = useUser();
  const token = useToken();
  const searchParams = useSearchParams();

  const subscribe = async (sessionId) => {
    try {
      const response = await API.post(
        "/payments/subscribe",
        { sessionId, userId: user.uid, email: user.email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = { ...user, subscribed: true };
      setUser(updatedUser);
      if (localStorage.getItem("userProfile")) {
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));
        localStorage.setItem(
          "userProfile",
          JSON.stringify({ ...userProfile, subscribed: true })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const sessionId = searchParams.get("sessionId");
    if (sessionId && user) {
      subscribe(sessionId);
    }
  }, [user]);
  return <></>;
};

export default Subscribe;
