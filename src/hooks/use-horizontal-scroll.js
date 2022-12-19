import { useRef, useEffect } from "react";

// google được
export function useHorizontalScroll() {
  const elRef = useRef();
  // hiệu ứng khi cuộn ngang khi lăn chuột
  useEffect(() => {
    // định dạng vị trí cần cuộn
    const el = elRef.current;
    // chuột đã ở vị trí cần cuộn chưa?
    if (el) {
      // hàm cuộn ngang khi lăn chuột
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        // cuộn tới vị trí
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}
