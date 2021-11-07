import { SettingsContextProvider } from "../components/SettingsContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SettingsContextProvider>
      <Component {...pageProps} />
    </SettingsContextProvider>
  );
}

export default MyApp;
