"use client";
import { RootState } from "@/store";
import { Message, setMessages } from "@/store/slice/msgSlice";
import { Button, Image, Input, message } from "antd";
import { SendOutlined, UserOutlined, OpenAIOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  ReactPortal,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/loading";

const { TextArea } = Input;

export default function Page() {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.message.messages);

  // Create a ref for the bottom of the message container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the message container
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when messages change
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      setText("");
    }
  };

  const sendMessage = async () => {
    const newMessage: Message = {
      text,
      links: [{ url: "" }],
      isUser: true,
    };

    // Assuming setMessages is an action creator function
    dispatch(setMessages(newMessage));
    setText("");
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_RESTFUL_API}/chat?user_message=${text}`
      );

      if (!response.data.error) {
        if (typeof response.data === "string") {
          const [mainContent, ...seeMoreLinks] =
            response.data.split("See more:");
          const newResMessage: Message = {
            text:
              response.data.length === 0
                ? "Sorry, As an AI, I can't answer your questions."
                : mainContent,
            links: seeMoreLinks
              .join("")
              .trim()
              .split("\n")
              .map((link) => ({ url: link.trim() })), 
            isUser: false,
          };
          // Dispatching the action after receiving the response
          dispatch(setMessages(newResMessage));
        } else {
          message.error(response.data.error);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to send message.");
    } finally {
    setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between w-[60%] mx-auto h-screen">
      <div className="flex-1 relative w-[90%] mb-6 mt-20 overflow-hidden overflow-y-auto mx-auto dark:text-white">
        <div className="w-full p-6">
          {messages.map(
            (
              message: {
                isUser: any;
                text:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined;
                links: any[];
              },
              index: Key | null | undefined
            ) => (
              <div key={index} className="py-2">
                <div>
                  {message.isUser ? (
                    <div className="flex flex-row items-center mt-10 justify-end">
                      <div className="flex">
                        <UserOutlined className="text-xl rounded-full border p-3" />
                      </div>
                    </div>
                  ) : (
                    <OpenAIOutlined className="text-xl rounded-full border p-3" />
                  )}

                  <div
                    className={`ml-16 -mt-7 overflow-x-auto ${
                      message.isUser ? "flex mr-16 -mt-7 justify-end" : ""
                    }`}
                  >
                    {message.text}
                  </div>

                  {message.links && message.links[0]?.url !== "" && (
                    <div className="ml-16">
                      {message.isUser ? (
                        ""
                      ) : (
                        <h2 className="mt-2">Sources:</h2>
                      )}
                      {message.links.map((link, idx) => (
                        <div key={idx}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm underline hover:text-blue-600"
                          >
                            {link.url}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>
            )
          )}
          {isLoading && (
            <div>
              <OpenAIOutlined className="text-xl rounded-full border p-3" />
              <div className="ml-20 -mt-7">
                <Loading />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center w-[90%] mx-auto gap-2 mb-5 ">
        <TextArea
          key="bordered"
          rows={1}
          placeholder="Enter your description"
          className="flex justify-center items-center pl-10 py-3 text-xl rounded-3xl leading-tight"
          value={text}
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) =>
            handleKeyPress(e)
          }
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setText(e.target.value)
          }
          autoFocus
        />

        <Button
          color="primary"
          size="large"
          className="h-[55px] w-[55px]"
          onClick={() => sendMessage()}
          disabled={text ? false : true}
        >
          <SendOutlined />
        </Button>
      </div>
    </div>
  );
}
