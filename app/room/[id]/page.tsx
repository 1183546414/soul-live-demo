"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import LiveRoomView from "@/components/LiveRoomView";
import { getRoomById } from "@/lib/mockData";

export default function LiveRoomPage() {
  const params = useParams();
  const room = getRoomById(params.id as string);

  if (!room) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p>直播间不存在</p>
        <Link href="/" style={{ color: "var(--accent)" }}>
          返回广场
        </Link>
      </div>
    );
  }

  return <LiveRoomView room={room} backHref="/" />;
}
