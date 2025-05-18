import { createContext, useContext, useEffect, useState } from "react";


// Define the type for the context value
interface LocalizationContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

// Create the context with a default value that matches the type
const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined
);

/* Create a provider for the localization context to handle and display the users locale settings */
const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState("en");

  // You can add any localization-related effects here
  useEffect(() => {
    // For example, you could listen for locale changes
    // or load translations based on the current locale
  }, [locale]);

  const value = {
    locale,
    setLocale,
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationProvider;

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }
  return context;
};
