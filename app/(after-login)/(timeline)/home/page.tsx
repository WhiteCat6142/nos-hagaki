"use client";
import DivCard from "@/components/divCard";
import SimpleButton from "@/components/simpleButton";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { NDKContext } from "../../layout";
import { getExplicitRelayUrls } from "@/src/getExplicitRelayUrls";
import { NDKEvent, NDKFilter, NDKNip07Signer } from "@nostr-dev-kit/ndk";
import { NDKEventList } from "@/src/NDKEventList";
import MoreLoadButton from "@/components/MoreLoadButton";
import Timeline from "@/components/Timeline";

const timelineEventList = new NDKEventList([]);

export default function Home() {
  const [messageReaded, setMessageReaded] = useState(
    localStorage.getItem("messageReaded") == "true"
  );
  const [timeline, setTimeline] = useState<NDKEvent[]>([
    ...timelineEventList.eventList,
  ]);
  const [pubkey, setPubkey] = useState<string>("");
  const ndk = useContext(NDKContext);

  const getEvent = (filter: NDKFilter) => {
    const sub = ndk.subscribe(filter, { closeOnEose: true });
    sub.on("event", (event: NDKEvent) => {
      if (
        !timelineEventList.eventList.find(
          (element: NDKEvent) => element.id == event.id
        )
      ) {
        const created_at = event.created_at || 0;
        if (timelineEventList.until > created_at) {
          timelineEventList.until = created_at;
        }

        timelineEventList.push(event);
        setTimeline(timelineEventList.eventList);
      }
    });
  };

  useEffect(() => {
    const fetchdata = async () => {
      const nip07signer = new NDKNip07Signer();
      const user = await nip07signer.user();

      if (!user.pubkey) {
        throw new Error("pubkey is false");
      }

      await getExplicitRelayUrls(ndk, user);

      if (timeline.length <= 10) {
        const myKind1Filter: NDKFilter = {
          kinds: [1],
          authors: [user.pubkey],
          limit: 10,
        };
        getEvent(myKind1Filter);
      }
      setPubkey(user.pubkey);
    };
    fetchdata();
  }, []);

  const getMoreEvent = () => {
    const myKind1Filter: NDKFilter = {
      kinds: [1],
      authors: [pubkey],
      limit: 10,
      until: timelineEventList.until,
    };
    getEvent(myKind1Filter);
  };

  return (
    <div className="space-y-8">
      {!messageReaded ? (
        <DivCard>
          <p>
            おかえりなさい。あっ…いえ、初めましてかもしれないわね。
            <br />
            このアプリはWeb用のNostrクライアントよ。はがきを送りあうような操作感を目指しているの。
            <br />
            使い方はヘルプにまとめてあるし、右上からいつでも呼び出せるわ。
            <br />
            べっ、別にあんたのためじゃないんだからねっ！
          </p>
          <div className="flex space-x-4">
            <SimpleButton
              onClick={() => {
                localStorage.setItem("messageReaded", "true");
                setMessageReaded(true);
              }}
            >
              わかった
            </SimpleButton>
            <Link
              href={"#"}
              className="px-4 py-2 text-neutral-500 border-2 border-neutral-200 rounded-[2rem] hover:bg-neutral-200"
            >
              ヘルプを見る
            </Link>
          </div>
        </DivCard>
      ) : (
        <></>
      )}
      <Timeline timeline={timeline} />
      <MoreLoadButton onClick={getMoreEvent} />
    </div>
  );
}