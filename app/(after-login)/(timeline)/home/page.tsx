"use client";
import DivCard from "@/components/divCard";
import SimpleButton from "@/components/simpleButton";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { NDKContext, ProfileContext, RegionContext } from "@/src/context";
import { getExplicitRelayUrls } from "@/src/getExplicitRelayUrls";
import { NDKEvent, NDKFilter, NDKNip07Signer } from "@nostr-dev-kit/ndk";
import Timeline from "@/components/Timeline";
import { Region, getRegions } from "@/src/getRegions";
import Image from "next/image";
import MapPage from "@/components/mapWrapper";

export default function Home() {
  const [messageReaded, setMessageReaded] = useState<boolean>(true);
  const ndk = useContext(NDKContext);
  const [filter, setFilter] = useState<NDKFilter>();
  const [regions, setRegions] = useState<Region[]>([]);
  const [profile, setProfile] = useState<any>({});
  const [profiles, setProfiles] = useState<NDKEvent[]>([]);

  const [pubkey, setPubkey] = useState<string>("");

  useEffect(() => {
    const fetchdata = async () => {
      const nip07signer = new NDKNip07Signer();
      const user = await nip07signer.user();

      if (!user.pubkey) {
        throw new Error("pubkey is false");
      }

      setPubkey(user.pubkey);

      await getExplicitRelayUrls(ndk, user);

      const kind1Filter: NDKFilter = {
        kinds: [1],
        authors: [user.pubkey],
        limit: 10,
      };

      const kind0Filter: NDKFilter = {
        kinds: [0],
        authors: [user.pubkey],
      };

      const newProfiles = await ndk.fetchEvents(kind0Filter);
      setProfiles(Array.from(newProfiles));

      const profileEvent = Array.from(newProfiles).find(
        (element) => element.pubkey == user.pubkey
      );
      setProfile(profileEvent ? JSON.parse(profileEvent.content) : {});

      setFilter(kind1Filter);
      setRegions(await getRegions([user.pubkey]));
    };
    setMessageReaded(localStorage.getItem("messageReaded") == "true");
    fetchdata();
  }, []);

  return (
    <div className="space-y-8">
      {!messageReaded && (
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
      )}

      <div className="space-y-4">
        {profile.picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.picture}
            alt={"avater picture"}
            width={64}
            height={64}
            loading="lazy"
            className="rounded-2xl bg-neutral-200"
          />
        ) : (
          <Image
            src="/img/default_icon.webp"
            alt="avater picture"
            width={64}
            height={64}
            className="rounded-2xl"
          />
        )}

        <div>
          {profile.display_name && (
            <p className="font-bold">{profile.display_name}</p>
          )}
          <p className="text-neutral-500 break-all">
            @{profile.name || pubkey}
          </p>
        </div>

        <div>
          {profile.website && (
            <a className="text-neutral-500" href={profile.website}>
              {profile.website}
            </a>
          )}
          {profile.about && <p>{profile.about}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold">あなたのすみか</h2>
        {regions && (
          <RegionContext.Provider value={regions[0]}>
            <MapPage />
          </RegionContext.Provider>
        )}
        <p>{regions[0]?.countryName?.ja || "どこか…"}</p>
      </div>
      {filter && (
        <ProfileContext.Provider value={profiles}>
          <Timeline filter={filter} regions={regions} />
        </ProfileContext.Provider>
      )}
    </div>
  );
}
