"use client";

import { usePathname } from "next/navigation";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

import ProfileIcon from "@/components/ProfileIcon";
import Dots from "@/components/Patterns/Dots";
import Container from "@/components/Container";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Heading from "./Heading";
import ProfilePhotoUpdateModal from "./ProfilePhotoUpdateModal";
import Text from "./Text";

const ProfileHero = ({ user }) => {
  const pathname = usePathname();

  const heading = user?.organizationName
    ? user.organizationName
    : user?.firstName + " " + user?.lastName;

  return (
    <div className="bg-queen-blue text-white relative pt-16 pb-20 overflow-hidden md:pt-28">
      <Container size="4xl" className="space-y-4">
        {pathname === "/profile" ? (
          <>
            <ProfilePhotoUpdateModal />
            <Button href="/settings/edit-profile" size="sm">
              Edit Profile
            </Button>
          </>
        ) : (
          <ProfileIcon
            profilePhoto={user?.profilePhoto}
            className="h-20 w-20"
          />
        )}

        <div className="max-w-lg relative z-10 space-y-3">
          <div className="space-y-2">
            <Heading color="white" size="3xl">
              {!user ? <LoadingPlaceholder /> : <>{heading}</>}
            </Heading>
            {user?.interests && (
              <div className="flex gap-2">
                {user.interests.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
          </div>
          <Text size="sm">{user?.bio}</Text>
        </div>
      </Container>
      <Dots className="absolute -right-64 -bottom-60 md:-right-40 md:-bottom-40 text-queen-orange" />
    </div>
  );
};

export default ProfileHero;
