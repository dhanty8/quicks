import Detail from "./detail";
import List from "./list";
import Search from "./search";
import { useState } from "react";

const Inbox = () => {
  const [messageDetailOpen, setMessageDetailOpen] = useState(false);

  const handleDetail = () => {
    setMessageDetailOpen((prev) => !prev);
  };
  return (
    <div className="bg-white w-[734px] h-[600px] rounded-lg shadow-lg p-4 overflow-hidden">
      {!messageDetailOpen && (
        <>
          <Search />
          <List onDetailClick={handleDetail} />
        </>
      )}

      {messageDetailOpen && <Detail />}
    </div>
  );
};

export default Inbox;
