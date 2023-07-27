import {
  Sidebar,
  Main,
  HeaderSpaceArea,
  Chat,
  CircularLoader,
} from "@/components";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessage } from "@/redux/slices/client/spaces/spaces";
import { useSubscription } from "@apollo/client";
import { NOTIFY_MESSAGE_CREATED } from "@/graphql/subscriptions";
import { ChatProps } from "@/utils/types/client";

type Props = {
  children: ReactNode;
  type: "client" | "account";
};

const LayoutSpaces: React.FC<Props> = ({ children, type = "client" }) => {
  const dispatch = useAppDispatch();
  const { currentSpaceChat: cCurrentSpaceChat, spaceLoading } = useAppSelector(
    (state) => state?.client?.spaces?.spaces
  );
  const currentSpaceChat = ChatProps.deserialize(cCurrentSpaceChat);
  const { data: datachange } = useSubscription(NOTIFY_MESSAGE_CREATED, {
    variables: { chatId: currentSpaceChat?.getId() },
  });

  useEffect(() => {
    if (datachange?.notifyMessageCreated) {
      dispatch(addMessage(datachange?.notifyMessageCreated));
    }
  }, [datachange]);

  try {
    return (
      <>
        <Main>
          {spaceLoading && type === "client" ? (
            <SpaceLoader />
          ) : (
            <>
              {type === "client" && <Chat />}
              <HeaderSpaceArea />
              <div className="layoutSpContainer">
                <Sidebar type={type} />
                <div className="layoutSpChildren pb-[100px] lg:pb-0 ">
                  {children}
                </div>
              </div>
            </>
          )}
        </Main>
      </>
    );
  } catch (error) {
    console.error(error);
  }
};

export default LayoutSpaces;

function SpaceLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex items-center gap-4">
        <CircularLoader />
        <div>
          <p className="subtitulo">Cargando tu espacio</p>
          <p className="text-sm font-light">Solo un momento mas...</p>
        </div>
      </div>
    </div>
  );
}
