"use client";

import { useState } from "react";

import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { type InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { toast } from "react-toastify";

export function WalletModal({
  open,
  wallets,
  setOpen,
  handleWalletSelections,
}: {
  open: boolean;
  setOpen: (args: boolean) => void;
  wallets: InjectedAccountWithMeta[];
  handleWalletSelections: (arg: InjectedAccountWithMeta) => void;
}) {
  const [selectedAccount, setSelectedAccount] =
    useState<InjectedAccountWithMeta>();

  return (
    <div
      role="dialog"
      className={`fixed inset-0 z-[100] ${
        open ? "block" : "hidden"
      } animate-fade-in-down h-full`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dark opacity-80" />

      {/* Modal */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center">
          <div className="relative w-[90%] max-w-xl transform overflow-hidden rounded-xl bg-gray-100 text-center shadow-custom  dark:bg-dark dark:shadow-custom-dark">
            <div className="flex flex-col items-center justify-between gap-3 border-zinc- bg-cover bg-center bg-no-repeat p-6 md:flex-row dark:border-white">
              <div className="flex flex-col items-center md:flex-row">
                <span
                  className="pl-2 text-xl font-bold leading-6 dark:text-white"
                  id="modal-title"
                >
                  Choose Wallet!
                </span>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl transition duration-100 hover:dark:bg-dark"
              >
                <XMarkIcon className="h-8 w-8 dark:fill-white" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-y-4 overflow-y-auto p-6">
              {wallets.map((item) => (
                <button
                  key={item.address}
                  onClick={() => setSelectedAccount(item)}
                  className={`text-md flex cursor-pointer items-center gap-x-3 overflow-auto rounded-xl border-2 p-5 shadow-white dark:text-white ${
                    selectedAccount === item
                      ? "border-green-500"
                      : "border-black dark:border-white "
                  }`}
                >
                  <CheckCircleIcon
                    className={`h-6 w-6 ${
                      selectedAccount === item
                        ? "fill-green-500"
                        : "fill-black dark:fill-white"
                    }`}
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-semibold">{item.meta.name}</span>
                    <span>{item.address}</span>
                  </div>
                </button>
              ))}
              {!wallets.length && (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-sm text-gray-500">
                  <div>No wallet found.</div>
                  <div>
                    Please install Polkadot extension or check permission
                    settings.
                  </div>
                  <a
                    href="https://polkadot.js.org/extension/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    Install Extension
                  </a>
                </div>
              )}

              <button
                className="rounded-xl border-2 border-green-500 p-4 text-xl font-semibold text-green-500"
                onClick={() => {
                  if (!selectedAccount) {
                    toast.error("No account selected", {});
                    return;
                  }
                  handleWalletSelections(selectedAccount);
                }}
              >
                Connect Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
