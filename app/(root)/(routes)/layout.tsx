import { FC } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ children }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }
  return <>{children}</>;
};

export default layout;
