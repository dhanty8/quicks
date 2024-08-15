import React, { useEffect, useMemo, useState } from "react";

import axios from "axios";

type Message = {
  id: number;
  sender: string;
  time: string;
  date?: string;
  content: string;
  isUser: boolean;
};

const predefinedColors: string[] = [
  "bg-red-100 text-red-600",
  "bg-green-100 text-green-600",
  "bg-blue-100 text-blue-600",
  "bg-yellow-100 text-yellow-600",
  "bg-pink-100 text-pink-600",
];

const userColors: Record<string, string> = {
  You: "bg-purple-100 text-purple-600",
};

const Detail: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [menuVisible, setMenuVisible] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/db72a28b-878a-48f5-a953-446a152bd5d6")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const colorMap = useMemo(() => {
    const map: Record<string, string> = { ...userColors };
    let colorIndex = 0;

    messages.forEach((message) => {
      if (!message.isUser && !map[message.sender]) {
        map[message.sender] = predefinedColors[colorIndex];
        colorIndex = (colorIndex + 1) % predefinedColors.length;
      }
    });

    return map;
  }, [messages]);

  const handleMenuClick = (id: number) => {
    setMenuVisible(menuVisible === id ? null : id);
  };

  const handleEdit = (id: number) => {
    console.log("Edit message with id:", id);
    setMenuVisible(null);
  };

  const handleDelete = (id: number) => {
    console.log("Delete message with id:", id);
    setMenuVisible(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b pb-4 mb-4 sticky top-0 bg-white z-10">
        <button className="text-blue-600">&#8592; Back</button>
        <div className="text-lg font-semibold text-blue-600">
          I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]
        </div>
        <button className="text-gray-500">&#10005;</button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id}>
            {message.date && (
              <div className="text-center text-gray-500 text-xs my-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="border-t flex-grow border-gray-300"></div>
                  <span>{message.date}</span>
                  <div className="border-t flex-grow border-gray-300"></div>
                </div>
              </div>
            )}
            <div
              className={`flex items-start space-x-2 mb-4 ${
                message.isUser ? "justify-end" : ""
              }`}
            >
              <div className="flex flex-col space-y-1">
                <div
                  className={`${
                    message.isUser
                      ? "self-end text-purple-600"
                      : colorMap[message.sender].split(" ")[1]
                  }`}
                >
                  {message.sender}
                </div>

                <div className="flex flex-row space-x-2 relative">
                  {message.isUser && (
                    <div
                      className="text-gray-400 text-xs cursor-pointer"
                      onClick={() => handleMenuClick(message.id)}
                    >
                      ...
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-lg shadow max-w-80 ${
                      message.isUser
                        ? "bg-purple-100"
                        : colorMap[message.sender].split(" ")[0]
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs text-gray-500 block mt-2">
                      {message.time}
                    </span>
                  </div>
                  {!message.isUser && (
                    <div
                      className="text-gray-400 text-xs cursor-pointer"
                      onClick={() => handleMenuClick(message.id)}
                    >
                      ...
                    </div>
                  )}
                  {menuVisible === message.id && (
                    <div
                      className={`absolute ${
                        message.isUser ? "-left-0" : "-right-0"
                      } mt-6 w-24 bg-white border rounded shadow-lg`}
                    >
                      <button
                        onClick={() => handleEdit(message.id)}
                        className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(message.id)}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Type a new message"
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
