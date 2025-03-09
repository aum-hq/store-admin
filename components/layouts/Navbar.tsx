import React from "react";
import StoreSwitcher from "./StoreSwitcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";

const Navbar = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b flex justify-between px-10">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <UserButton afterSwitchSessionUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
