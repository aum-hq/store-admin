import { FC } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ children }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
};

export default layout;
