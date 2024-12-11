"use client";

import { usePolkadot } from "@/context";
import { truncateWalletAddress } from "@/utils";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoImage from "../../public/logo/com.webp";
import { ThemeSwitcher } from "./themeswitcher";

import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, message, Space } from "antd";

const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  // console.log('click', e);
};
export default function NavigationBar() {
  const router = useRouter();
  const { isInitialized, handleConnect, selectedAccount } = usePolkadot();
  const items: MenuProps["items"] = [
    {
      label:
        isInitialized && selectedAccount
          ? truncateWalletAddress(selectedAccount.address)
          : "Connect Polkadot",
      key: "1",
      onClick: handleConnect,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full shadow-md py-0 my-4 dark:text-white z-10">
        <div className="min-h-full">
          <div className="mx-auto px-20">
            <div className="flex h-16 justify-between items-center">
              <Link className="w-[300px]" href="/">
                <Image
                  style={{
                    width: "auto",
                    height: "4rem",
                    marginRight: "-0.25rem",
                  }}
                  src={LogoImage}
                  alt="Commune Logo"
                  width={64}
                  height={64}
                />
              </Link>

              <div className="flex justify-center items-center gap-20 w-full">
                <Menu as="div" className="flex">
                  <div>
                    <Menu.Button
                      className={classNames(
                        "dark:text-white dark:hover:text-[#92400E] p-0 text-2xl"
                      )}
                      onClick={() => router.push("/")}
                    >
                      Home
                    </Menu.Button>
                  </div>
                </Menu>
                <Menu as="div" className="flex">
                  <div>
                    <Menu.Button
                      className={classNames(
                        "dark:text-white dark:hover:text-[#92400E] p-0 text-2xl"
                      )}
                      onClick={() => router.push("/chat")}
                    >
                      Scraping Bot
                    </Menu.Button>
                  </div>
                </Menu>
                <Menu as="div" className="flex">
                  <div>
                    <Menu.Button
                      className={classNames(
                        "dark:text-white dark:hover:text-[#92400E] p-0 text-2xl"
                      )}
                      onClick={() => router.push("/about")}
                    >
                      About
                    </Menu.Button>
                  </div>
                </Menu>
                <Menu as="div" className="flex">
                  <div>
                    <Menu.Button
                      className={classNames(
                        "dark:text-white dark:hover:text-[#92400E] p-0 text-2xl"
                      )}
                      onClick={() => router.push("/contact")}
                    >
                      Contact
                    </Menu.Button>
                  </div>
                </Menu>
              </div>

              <Button
                size="large"
                className="text-xl rounded-lg border-2 border-white"
              >
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
