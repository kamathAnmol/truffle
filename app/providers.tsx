"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/Stripe";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <Elements stripe={stripePromise}>{children}</Elements>
          </NextThemesProvider>
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
}
