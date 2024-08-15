import React, { useEffect, useState } from "react";

import axios from "axios";

type Preview = {
  id: number;
  sender: string;
  time: string;
  content: string;
};

type Message = {
  id: number;
  title: string;
  date: string;
  isGroup: boolean;
  preview: Preview;
};

type ListProps = {
  onDetailClick: () => void;
};

const List: React.FC<ListProps> = ({ onDetailClick }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/f966deea-243e-4dd5-be41-bea0a120b27d")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="overflow-y-auto min-h-[500px]">
      {messages.map((message) => (
        <div
          key={message.id}
          className="flex items-start p-2 border-b cursor-pointer"
          onClick={onDetailClick}
        >
          <div className="flex flex-row w-14">
            {message.isGroup ? (
              <>
                <div className="bg-gray-300 w-8 h-8 rounded-full flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="bg-blue-500 w-8 h-8 rounded-full flex justify-center items-center ml-[-15px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </>
            ) : (
              <div className="bg-blue-500 w-8 h-8 rounded-full flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 mb-3 ml-2">
            <div className="flex justify-between">
              <span className="font-bold text-blue-500">
                {message.preview.sender}
              </span>
              <span className="text-sm text-gray-500">{message.date}</span>
            </div>
            {message.isGroup && (
              <p className="text-gray-700 text-sm">
                {message.preview.sender} :
              </p>
            )}
            <p className="text-gray-500 text-sm">{message.preview.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
