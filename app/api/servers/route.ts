import currentUser from "@/lib/current-user";
import db from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { imageUrl, name } = await req.json();
    const profile = await currentUser();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        inviteCode: uuidv4(),
        channels: {
          create: { name: "general", profileId: profile.id },
        },
        members: {
          create: { profileId: profile.id, role: MemberRole.ADMIN },
        },
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER POST]: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
