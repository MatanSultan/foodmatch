import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/globals.css";
import { getCookie } from "cookies-next";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  const emailCookie = getCookie("email");
  useEffect(() => {
    if (emailCookie) {
      setUser({ email: emailCookie });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
