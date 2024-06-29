"use client";

import TweetCard from "@/components/tweet/tweet-card";
import useInfiniteScrolling from "@/hooks/use-infinite-scrolling";
import { useState } from "react";

export default function FyInfiniteScrolling() {
  const [size, setSize] = useState<number>(12);

  const ref = useInfiniteScrolling(() => {
    setSize(size + 10);
  });
  return (
    <>
      {[...Array(size)].map((_, i) => (
        <TweetCard
          key={i}
          tweet={{
            id: "1413598151024771840",
            text: "I just got my first tweet from @twitterdev. 🎉",
            userId: "1413598151024771840",
            createdAt: new Date(),
            hasEntities: false,
          }}
          user={{
            username: "twitterdev",
            name: "Twitter Dev",
            image:
              "https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=640&crop=smart&auto=webp&s=22ed6cc79cba3013b84967f32726d087e539b699",
          }}
        />
      ))}
      <div ref={ref}></div>
    </>
  );
}
