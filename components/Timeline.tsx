import { NDKFilter } from "@nostr-dev-kit/ndk";
import EventCard from "./EventCard";
import { NDKEventList } from "@/src/NDKEventList";
import { useContext, useEffect, useState } from "react";
import { NDKContext } from "@/src/NDKContext";
import MoreLoadButton from "./MoreLoadButton";

export default function Timeline({
  filter,
}: {
  filter: NDKFilter | undefined;
}) {
  const [timeline, setTimeline] = useState<NDKEventList>(new NDKEventList());
  const ndk = useContext(NDKContext);
  const [moreLoadButtonValid, setMoreLoadButtonValid] =
    useState<boolean>(false);

  const getEvent = async (filter: NDKFilter | undefined) => {
    if (filter) {
      setMoreLoadButtonValid(false);
      setTimeline(timeline.concat(await ndk.fetchEvents(filter)));
      setMoreLoadButtonValid(true);
    }
  };

  useEffect(() => {
    if (timeline.eventList.length <= 10) {
      getEvent(filter);
    }
  }, [filter]);

  const getMoreEvent = () => {
    getEvent({ ...filter, until: timeline.until });
  };
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {timeline.eventList
          .sort((a, b) => {
            const dateA = a.created_at || 0;
            const dateB = b.created_at || 0;
            return dateB - dateA;
          })
          .map((event, index) => (
            <EventCard event={event} key={index} />
          ))}
      </div>
      <MoreLoadButton valid={moreLoadButtonValid} onClick={getMoreEvent} />
    </div>
  );
}
