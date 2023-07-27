import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useMemo } from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  MembersProps,
  GeneralPermission,
  SpaceProps,
} from "@/utils/types/client";
import { debounce } from "lodash";
import { getCurrentSpace } from "@/redux/slices/client/spaces/spaces";
import { getCurrentRoom, getRooms } from "@/redux/slices/client/spaces/rooms";

type Props = {
  children: ReactNode;
};

export default function Querier({ children }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { spaceId, roomId } = router.query;
  const {
    currentSpace: cSpace,
    currentMember: cMember,
    spaceLoading,
  } = useAppSelector((state) => state?.client?.spaces?.spaces);

  const currentSpace = SpaceProps.deserialize(cSpace);
  const currentMember = MembersProps.deserialize(cMember);

  useEffect(() => {
    if (
      spaceId &&
      (router.pathname === "/client/[spaceId]" ||
        router.pathname === "/client/[spaceId]/settings" ||
        router.pathname === "/client/[spaceId]/members" ||
        router.pathname === "/client/[spaceId]/files")
    ) {
      dispatch(getCurrentSpace(spaceId as string));
      dispatch(getRooms(spaceId as string));
    }
  }, [spaceId, router.pathname, spaceLoading === false]);

  useEffect(() => {
    if (
      spaceId &&
      roomId &&
      router?.pathname === "/client/[spaceId]/[roomId]"
    ) {
      dispatch(getCurrentSpace(spaceId as string));
      dispatch(getCurrentRoom(roomId as string));
    }
  }, [spaceId, roomId, router.pathname, spaceLoading === false]);

  //Check if user is admin of current space

  const handleAdmin = () => {
    if (
      router.pathname === "/client/[spaceId]/settings" &&
      currentMember instanceof MembersProps
    ) {
      if (!currentMember?.hasPermission(GeneralPermission?.EditSpace)) {
        router.push(`/client/${currentSpace.getId()}`);
      }
    }
  };

  const delayedSystemStart = useMemo(
    () => debounce(() => handleAdmin(), 1500),
    [router.pathname]
  );

  useEffect(() => {
    const cancelDebounce = () => {
      delayedSystemStart.cancel();
    };
    delayedSystemStart();
    return cancelDebounce;
  }, [delayedSystemStart]);

  return <div>{children}</div>;
}
