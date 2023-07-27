import { UserProps } from "@/utils/types/client";
import { useAppSelector } from "@/redux/hooks";
import NextImage from "next/image";

export default function HeroAccountArea() {
  {
    const { currentMember: cMember, currentSpaceMembers } = useAppSelector(
      (state) => state?.client?.spaces?.spaces
    );

    const { current: sCurrent } = useAppSelector(
      (state) => state?.authSession?.session
    );
    const currentSession = UserProps.deserialize(sCurrent);

    return (
      <section className="heroSpContainer">
        <ImageOverlay current={currentSession} bgImageVisibleOnDesktop={true} />
        <div className="z-0  flex w-full  flex-row items-center justify-center gap-3">
          <NextImage
            src={currentSession?.getProfileImage()}
            alt="SpaceCover"
            width={80}
            height={80}
            className="aspect-square rounded-full object-cover"
          />
          <div>
            <h1 className="titulo-3 text-white">
              {currentSession?.getFullName()}
            </h1>
            <p className="bodyText font-light text-white lg:max-w-[75%]">
              @{currentSession?.getUsername()}
            </p>
          </div>
        </div>
      </section>
    );
  }

  type ImageOverlayProps = {
    current: UserProps;
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
