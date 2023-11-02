import { auth } from "@clerk/nextjs";

import db from "@/lib/db";

const currentUser = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  return await db.profile.findUnique({
    where: {
      userId
    }
  })
}

export default currentUser;