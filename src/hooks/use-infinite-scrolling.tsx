import { useEffect, useRef } from "react";

export default function useInfiniteScrolling(fetchData: () => void) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      },
      { threshold: 0.8 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    const current = ref.current;
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [ref, fetchData]);

  return ref;
}
