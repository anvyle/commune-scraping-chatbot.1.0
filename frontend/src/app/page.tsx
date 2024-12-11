"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { Input, Button, message } from "antd";
import Loading from "../components/loading";

const Home = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const chatting = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      scrapeUrl();
    }
  };

  const scrapeUrl = async () => {
    if (!text) {
      message.error("Please enter a URL.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_RESTFUL_API}/scrape?website_url=${text}`
      );
      console.log(response.data);
      if (response.data.msg) {
        router.push("/chat");
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to scrape URL.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-10 py-5 m-auto w-full h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="flex lg:flex-row flex-col]">
          <div className="m-auto w-full flex flex-col items-center justify-center">
            <div className="flex flex-col gap-5">
              <div className="text-center">
                <h1 className="text-7xl font-bold sm:pb-3 dark:text-white">
                  Commune Scraping ChatBot
                </h1>
              </div>
              <div className="hidden sm:block text-center py-5">
                <p className="hero__subtitle text-2xl dark:text-white">
                  Please input the website URL you want. After a few minutes,
                  <br />
                  you can talk with the chatbot.
                </p>
              </div>
              <div className="flex justify-center gap-4 py-5">
                <Input
                  type="text"
                  placeholder="Enter the URL of website..."
                  className="text-xl pl-4 rounded-2xl h-[60px] w-[500px] dark:border-transparent border-blue-400 border-2"
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                    chatting(e)
                  }
                  autoFocus
                />
                <Button
                  size="large"
                  onClick={scrapeUrl}
                  disabled={isLoading}
                  className="h-[60px] w-[150px] rounded-2xl text-xl"
                >
                  {isLoading ? <Loading /> : "Get Started"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
