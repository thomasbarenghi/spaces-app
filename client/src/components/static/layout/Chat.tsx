import { Input } from "@/components";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sendMessage } from "@/redux/slices/client/spaces/spaces";
import Image from "next/image";
import { SpaceProps, ChatProps } from "@/utils/types/client";

export default function ModalChat() {
  const dispatch = useAppDispatch();
  const containerRef = useRef<any>(null);
  const [chatVisibility, setChatVisibility] = useState(false);

  const { currentSpace: cSpace, currentSpaceChat: cSpaceChat } = useAppSelector(
    (state) => state?.client?.spaces?.spaces
  );
  const { id } = useAppSelector(
    (state) => state?.authSession?.session?.current
  );

  const currentSpace = SpaceProps.deserialize(cSpace);
  const currentSpaceChat = ChatProps.deserialize(cSpaceChat);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    const message = e.target.message.value;
    dispatch(sendMessage({ message }));
    e.target.message.value = "";
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  return (
    <div className="flex flex-col  ">
      <button
        className="bodyText fixed bottom-[110px] right-[24px]  z-[20] rounded-full bg-blue-700 p-6 text-center font-semibold text-white lg:bottom-[40px] lg:right-[40px]"
        onClick={() => setChatVisibility(!chatVisibility)}
      >
        Chat
      </button>
      {chatVisibility && (
        <div
          id="chat-box"
          className="fixed bottom-0 right-0 z-[20] flex max-h-[85vh] min-h-[85vh] min-w-full flex-col  rounded-2xl bg-white p-4 shadow-lg md:bottom-[80px]  md:right-[40px] md:max-h-[450px] md:min-h-[450px] md:min-w-[350px] md:max-w-[350px] lg:bottom-[40px]"
        >
          <div className="flex items-center justify-between gap-2 pb-4">
            <h3 className="bodyText font-semibold">
              {currentSpace?.getName()}
            </h3>

            <Image
              src="/icon/cross.svg"
              width={18}
              height={18}
              alt="profileImage"
              className=" z-10 aspect-square cursor-pointer"
              onClick={() => setChatVisibility(!chatVisibility)}
            />
          </div>

          <div className="relative  flex flex-grow overflow-hidden">
            <div className="flex w-full max-w-full flex-col justify-between gap-2  ">
              <div
                className=" flex max-w-full flex-col gap-3 overflow-auto pb-3 "
                ref={containerRef}
              >
                {Array.isArray(currentSpaceChat.getMessages()) &&
                  currentSpaceChat.getMessages().map((message) => (
                    <div
                      key={message.getId()}
                      className={`flex items-start gap-2 ${
                        id == message.getUser().getId()
                          ? "flex-row"
                          : "flex-row-reverse"
                      } `}
                    >
                      <Image
                        src={message.getUser().getProfileImage()}
                        width={35}
                        height={35}
                        alt="profileImage"
                        className="aspect-square rounded-full object-cover"
                      />
                      <div className="flex max-w-full flex-col items-start gap-[2px] ">
                        <p className=" max-w-full  rounded-2xl bg-blue-100 px-4 py-1  text-sm text-blue-700">
                          {message.getContent()}
                        </p>
                        <p
                          className={`w-full text-xs text-black ${
                            id == message.getUser().getId()
                              ? "text-left"
                              : "text-right"
                          }`}
                        >
                          {message.getUser().getFullName()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Escribe un mensaje"
                  name="message"
                  label=""
                  className="w-full"
                  labelClass="w-full"
                  required
                />
                <button
                  type="submit"
                  className="primaryButton smalltext px-3 py-2"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
