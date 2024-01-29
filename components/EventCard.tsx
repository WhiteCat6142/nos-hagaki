"use client";
import { NDKEvent } from "@nostr-dev-kit/ndk";
import Link from "next/link";
import Image from "next/image";
import { Region } from "@/src/getRegions";
import { useContext } from "react";
import { ProfileContext } from "@/src/context";

export default function EventCard({
  event,
  regions,
}: {
  event: NDKEvent;
  regions: Region[];
}) {
  const profiles = useContext(ProfileContext);

  const profileEvent: NDKEvent | undefined = (() => {
    for (const value of profiles) {
      if (value.pubkey == event.pubkey) {
        return value;
      }
    }
  })();

  const region = regions.find((element) => element.pubkey == event.pubkey);
  const profile = profileEvent ? JSON.parse(profileEvent.content) : {};
  const created_at = event.created_at || 0;
  const dateTime = new Date(created_at * 1000);

  return (
    <>
      <Link
        href={`/post/${event.id}`}
        className="relative block w-full p-4 rounded-2xl border-2 border-neutral-200 hover:bg-neutral-200"
      >
        <div className="space-y-4">
          {profile.picture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.picture}
              alt={"avater picture"}
              width={64}
              height={64}
              loading="lazy"
              className="h-16 w-16 object-cover rounded-2xl bg-neutral-200"
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

          <p className="line-clamp-2 break-words">{event.content}</p>

          <div>
            <div className="flex space-x-2">
              {profile.display_name && (
                <p className="font-bold">{profile.display_name}</p>
              )}
              <p className="text-neutral-500 break-all">
                @{profile.name || event.pubkey}
              </p>
            </div>
            <p className="text-neutral-500">{dateTime.toLocaleDateString()}</p>
            <p className="text-neutral-500">
              {region?.countryName?.ja || "どこか…"}
            </p>
          </div>
        </div>
        <p className="absolute text-neutral-500 top-4 right-4">
          {event.content.length}文字
        </p>
        <Image
          src={"/img/postmark.png"}
          height={64}
          width={93}
          alt="postmark"
          className="absolute top-4 left-16"
        />
        <p className="absolute text-sm w-[20px] text-center top-[37px] left-[86px] text-[#c30c08]">
          {region?.countryName?.iso || "…"}
        </p>
      </Link>
    </>
  );
}
