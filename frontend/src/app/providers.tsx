"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PolkadotProvider } from "@/context";
import { ConfigProvider } from "antd";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { store } from "@/store";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <PolkadotProvider wsEndpoint={String(process.env.NEXT_PUBLIC_COMMUNE_API)}>
      {/* <NextUIProvider> */}
        <NextThemesProvider attribute="class" defaultTheme="light">
          <ConfigProvider>
            <Provider store={store}>
              {children} <ToastContainer />
            </Provider>
          </ConfigProvider>
        </NextThemesProvider>
      {/* </NextUIProvider> */}
    </PolkadotProvider>
  );
};

export default Providers;
