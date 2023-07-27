import { ModalTrigger, MembersList, ConfirmationModal } from "@/components";
import { RoomsProps, SpaceProps, MembersProps } from "@/utils/types/client";
import { useAppSelector } from "@/redux/hooks";
import NextImage from "next/image";

type HeroSpaceAreaProps = {
  //PrimaryTrigger
  primaryManualClose?: boolean;
  children?: JSX.Element;
  triggerIsAdmin?: boolean;
  triggerText: string;
  primaryLoading?: boolean;
  //SecondaryTrigger
  secondControls?: boolean;
  childrenSecond?: JSX.Element;
  triggerSecondText?: string;
  secondTriggerIsAdmin?: boolean;
  secondaryLoading?: boolean;
  secondaryManualClose?: boolean;
  //ConfirmationModal
  confirmParagraph?: string;
  handleTrueAction?: () => void;
  mustConfirm?: boolean;
  //General
  current: SpaceProps | RoomsProps;
  type: "space" | "room";
  controls?: boolean;
  showMembers?: boolean;
  bgImageVisibleOnDesktop?: boolean;
  modalType?: "confirmation" | "normal";
  baseModalType?: "default" | "confirmation";
};

export default function HeroSpaceArea({
  current,
  type,
  children,
  triggerText,
  controls = true,
  secondControls = false,
  childrenSecond,
  triggerSecondText = "",
  showMembers = true,
  triggerIsAdmin = false,
  secondTriggerIsAdmin = false,
  modalType = "normal",
  confirmParagraph = "",
  handleTrueAction = () => {},
  mustConfirm = false,
  bgImageVisibleOnDesktop = false,
  primaryManualClose = false,
  primaryLoading = false,
  secondaryLoading = false,
  secondaryManualClose = false,
  baseModalType = "default",
}: HeroSpaceAreaProps) {
  {
    const { currentMember: cMember, currentSpaceMembers } = useAppSelector(
      (state) => state?.client?.spaces?.spaces
    );

    const currentMember = MembersProps.deserialize(cMember);

    return (
      <section className="heroSpContainer">
        <ImageOverlay
          current={current}
          bgImageVisibleOnDesktop={bgImageVisibleOnDesktop}
        />
        <div className="z-0  flex w-full flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="w-full">
            <h1 className="titulo-1 text-white">{current?.getName()}</h1>
            <p className="bodyText font-light text-white lg:max-w-[75%]">
              {current?.getDescription()}
            </p>
          </div>
          {controls && (
            <div className="flex flex-col gap-2  md:flex-row">
              {secondControls &&
                ((secondTriggerIsAdmin &&
                  (currentMember?.isAdmin() || currentMember?.isOwner())) ||
                  !secondTriggerIsAdmin) && (
                  <ModalTrigger
                    triggerText={triggerSecondText}
                    buttonType="secondaryButton"
                    manualClose={secondaryManualClose}
                    loading={secondaryLoading}
                  >
                    {childrenSecond}
                  </ModalTrigger>
                )}
              <div className="flex  w-full flex-row-reverse items-center justify-end gap-4 lg:flex-row">
                {type === "space" && showMembers && (
                  <MembersList
                    members={currentSpaceMembers}
                    size="medium"
                    pictureHasMargin={true}
                  />
                )}
                {((triggerIsAdmin &&
                  (currentMember?.isAdmin() || currentMember?.isOwner())) ||
                  !triggerIsAdmin) &&
                  modalType === "normal" && (
                    <ModalTrigger
                      triggerText={triggerText}
                      buttonType="primaryButton"
                      manualClose={primaryManualClose}
                      loading={primaryLoading}
                      modalType={baseModalType}
                    >
                      {children}
                    </ModalTrigger>
                  )}
                {((triggerIsAdmin &&
                  (currentMember?.isAdmin() || currentMember?.isOwner())) ||
                  !triggerIsAdmin) &&
                  modalType === "confirmation" && (
                    <ConfirmationModal
                      triggerText={triggerText}
                      confirmText={triggerText}
                      confirmParagraph={confirmParagraph}
                      triggerColor="bg-red-800"
                      trueAction={handleTrueAction}
                      mustConfirm={mustConfirm}
                    />
                  )}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  type ImageOverlayProps = {
    current: SpaceProps | RoomsProps;
    bgImageVisibleOnDesktop: boolean;
  };

  function ImageOverlay({
    current,
    bgImageVisibleOnDesktop,
  }: ImageOverlayProps) {
    return (
      <div className=" z[-1] absolute left-0 right-0 top-0  h-full w-full">
        <div className="absolute left-0 right-0 top-0 z-[-1]  h-full w-full backdrop-brightness-50 " />
        <NextImage
          src={current?.getCoverImage()}
          alt="SpaceCover"
          layout="fill"
          className={`left-0 right-0 top-0 z-[-2] h-full w-full object-cover  ${
            !bgImageVisibleOnDesktop && "lg:hiddens"
          } `}
        />
      </div>
    );
  }
}
