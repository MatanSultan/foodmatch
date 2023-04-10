import { useState } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
