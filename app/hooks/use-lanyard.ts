import { useEffect, useState } from "react";

import type { LanyardData, LanyardMessage, LanyardWebsocket } from "~/types";
import { DISCORD_STATUS_COLOR } from "~/types";

const HEARTBEAT_INTERVAL = 30_000;

enum OpCode {
  Event,
  Hello,
  Initialize,
  Heartbeat,
}

export function useLanyard(): LanyardWebsocket & { statusColor: string } {
  const [status, setStatus] = useState<LanyardData>();
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [loading, setLoading] = useState(true);
  const [statusColor, setStatusColor] = useState<string>(
    DISCORD_STATUS_COLOR.offline
  );
  const userId = process.env.NEXT_PUBLIC_DISCORD_ID;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const supportsWebSocket = "WebSocket" in window || "MozWebSocket" in window;
    if (!supportsWebSocket)
      throw new Error("Browser doesn't support WebSocket connections.");

    let heartbeat: ReturnType<typeof setTimeout>;
    let socket: WebSocket;

    const connectWebsocket = (): void => {
      if (heartbeat) clearInterval(heartbeat);

      socket = new WebSocket(`wss://api.lanyard.rest/socket`);
      setWebsocket(socket);
      setLoading(true);

      socket.addEventListener("open", () => {
        socket.send(
          JSON.stringify({
            op: OpCode.Initialize,
            d: {
              subscribe_to_id: userId,
            },
          })
        );

        heartbeat = setInterval(() => {
          socket.send(
            JSON.stringify({
              op: OpCode.Heartbeat,
            })
          );
        }, HEARTBEAT_INTERVAL);
      });

      socket.addEventListener("message", ({ data }) => {
        const { t, d } = JSON.parse(data) as LanyardMessage;
        if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
          setStatus(d || ({} as LanyardData));
          if (loading) {
            setLoading(false);
            setStatusColor(DISCORD_STATUS_COLOR[d.discord_status]);
          }
        }
      });

      socket.addEventListener("close", connectWebsocket);
    };

    connectWebsocket();

    return () => {
      clearInterval(heartbeat);
      socket.removeEventListener("close", connectWebsocket);
      socket.close();
    };
  }, [userId]);

  return {
    websocket,
    loading,
    status,
    statusColor,
  };
}
