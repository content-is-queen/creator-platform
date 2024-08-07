"use client";

import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { notFound } from "next/navigation";

import CreatorProfileTabs from "@/components/Creator/CreatorProfileTabs/CreatorProfileTabs";
import ProfileHero from "@/components/ProfileHero";
import BrandProfileOpportunities from "@/components/Brand/BrandProfileOpportunities";

const Profile = ({ user: publicUser }) => {
  const { user: localUser } = useUser();

  const user = publicUser || localUser;

  useEffect(() => {}, [user]);

  if (user?.role === "admin") {
    return notFound();
  }

  return (
    <div className="bg-queen-white">
      <ProfileHero user={user} />
      {user && user?.role === "creator" && (
        <CreatorProfileTabs meta={user?.meta} />
      )}
      {user && user?.role === "brand" && (
        <BrandProfileOpportunities user={user} />
      )}
    </div>
  );
};

export default Profile;
