import { useEffect } from "react";

const KEYBOARD_NEXT_KEYS = new Set(["PageDown", "ArrowDown"]);
const KEYBOARD_PREV_KEYS = new Set(["PageUp", "ArrowUp"]);

export default function usePageSnapNavigation() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("main section[id]")).filter(
        (section) => section.offsetParent !== null,
      );

    const getCurrentSectionIndex = (sections: HTMLElement[]) => {
      const viewportMid = window.innerHeight * 0.45;
      let currentIndex = 0;

      for (let i = 0; i < sections.length; i += 1) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
          currentIndex = i;
          break;
        }
      }

      return currentIndex;
    };

    let wheelLock = false;
    let wheelLockRelease: number | null = null;

    const scrollToIndex = (sections: HTMLElement[], targetIndex: number) => {
      const boundedIndex = Math.max(0, Math.min(targetIndex, sections.length - 1));
      sections[boundedIndex].scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const lockWheel = () => {
      wheelLock = true;
      if (wheelLockRelease) {
        window.clearTimeout(wheelLockRelease);
      }
      wheelLockRelease = window.setTimeout(() => {
        wheelLock = false;
      }, 760);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }

      const sections = getSections();
      if (sections.length < 2) return;

      const current = getCurrentSectionIndex(sections);
      const isSpace = event.code === "Space" && !event.shiftKey;
      const isShiftSpace = event.code === "Space" && event.shiftKey;
      const isNext = KEYBOARD_NEXT_KEYS.has(event.key) || isSpace;
      const isPrev = KEYBOARD_PREV_KEYS.has(event.key) || isShiftSpace;

      if (!isNext && !isPrev) return;

      event.preventDefault();

      const nextIndex = isNext ? current + 1 : current - 1;
      scrollToIndex(sections, nextIndex);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 18) return;
      if (wheelLock) {
        event.preventDefault();
        return;
      }

      const sections = getSections();
      if (sections.length < 2) return;

      const current = getCurrentSectionIndex(sections);
      const movingDown = event.deltaY > 0;
      const nextIndex = movingDown ? current + 1 : current - 1;

      event.preventDefault();
      lockWheel();
      scrollToIndex(sections, nextIndex);
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", onWheel);
      if (wheelLockRelease) {
        window.clearTimeout(wheelLockRelease);
      }
    };
  }, []);
}

