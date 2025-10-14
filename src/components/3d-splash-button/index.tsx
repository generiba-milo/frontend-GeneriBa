"use client";
import { cn } from "@/lib/utils";
import { AnimationOptions, useAnimate } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface Splash3dButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
}

const Splash3dButton = ({
  className,
  children,
  onClick,
  disabled,
}: Splash3dButtonProps) => {
  const { isActive, handlePress } = usePress();
  const [scope, animate] = useAnimate();
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    // @ts-expect-error for safari
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    // create AudioContext lazily on first gesture - still create here but may be suspended
    try {
      audioContextRef.current = new AudioContext();
    } catch (e) {
      // ignore
    }

    // prefetch audio but don't block; if fetch fails we'll try again on click
    // audio is placed in `public/` and served from root (e.g. /clicl.mp3)
    fetch("/click.mp3")
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContextRef.current?.decodeAudioData(arrayBuffer))
      .then((decodedAudio) => {
        if (decodedAudio) audioBufferRef.current = decodedAudio;
      })
      .catch((err) => console.error("Error loading audio", err));
  }, []);

  function playAudio() {
    const audioCtx = audioContextRef.current;
    if (!audioCtx) return;

    // resume suspended context if necessary
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    const playBuffer = (buffer: AudioBuffer) => {
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;

      const gainNode = audioCtx.createGain();
      gainNode.gain.value = 0.8;

      source.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      try {
        source.start();
      } catch (e) {
        // ignore start errors
      }
    };

    if (audioBufferRef.current) {
      playBuffer(audioBufferRef.current);
      return;
    }

    // fallback: try to fetch and decode immediately if not prefetched
    fetch("/clicl.mp3")
      .then((r) => r.arrayBuffer())
      .then((ab) => audioCtx.decodeAudioData(ab))
      .then((decoded) => {
        audioBufferRef.current = decoded;
        playBuffer(decoded);
      })
      .catch(() => {
        // ignore audio errors
      });
  }

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    if (disabled) return;
    playAudio();
    handlePress();
    animation(e);
    if (onClick) onClick(e);
  }

  function createEle(x: string, y: string) {
    const ele = document.createElement("div");
    // make droplets white (visible on both light and dark backgrounds) with a subtle shadow
    ele.className = cn("absolute rounded-full bg-white/90 dark:bg-white/90 shadow-md");

    const size = random(15, 25);

    Object.assign(ele.style, {
      height: `${size}px`,
      width: `${size}px`,
      left: x,
      top: y,
      transform: "translate(-50%, -50%)",
    });

    return ele;
  }

  async function animation(e: unknown) {
    if (!scope.current) return;
    const t: AnimationOptions = { duration: 0.4, ease: "easeOut" };
    const wrapper = scope.current.querySelector("#splash-wrapper");

    const numElements = Math.floor(Math.random() * 5) + 5; // 5 to 10
    const elements: HTMLElement[] = [];

    const bounding = (scope.current as HTMLElement).getBoundingClientRect();
    const isMouseLike = (obj: unknown): obj is { clientX: number; clientY: number } => {
      return (
        typeof obj === "object" &&
        obj !== null &&
        "clientX" in (obj as Record<string, unknown>) &&
        "clientY" in (obj as Record<string, unknown>) &&
        typeof (obj as Record<string, unknown>).clientX === "number" &&
        typeof (obj as Record<string, unknown>).clientY === "number"
      );
    };
    const coords = isMouseLike(e) ? (e as { clientX: number; clientY: number }) : null;
    const clickX = coords ? `${coords.clientX - bounding.left}px` : "50%";
    const clickY = coords ? `${coords.clientY - bounding.top}px` : "50%";

    for (let i = 0; i < numElements; i++) {
      const ele = createEle(clickX, clickY);
      wrapper.appendChild(ele);
      elements.push(ele);
    }

    await Promise.all(
      elements.map((e) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 50; // 50 to 100

        const xOffset = Math.cos(angle) * distance;
        const yOffset = Math.sin(angle) * distance;

        return animate(e, { x: xOffset, y: yOffset, scale: 0 }, t);
      }),
    );

    elements.forEach((ele) => ele.remove());
  }

  return (
    // render a non-button wrapper so consumers can place actual <button> inside (avoids nested-button invalid HTML)
    <div
  ref={scope}
  role="button"
  tabIndex={disabled ? -1 : 0}
  aria-disabled={disabled ? true : undefined}
      className={cn(
        "group relative cursor-pointer",
        disabled && "pointer-events-none opacity-60",
      )}
      onClick={(e) => handleClick(e)}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          // synthesize a mouse-like event for the animation
          handlePress();
          playAudio();
          animation(e);
          if (onClick) onClick(e as unknown as React.KeyboardEvent<HTMLElement>);
        }
      }}
    >
      <span id="splash-wrapper" className="absolute inset-0" />
      <span
        className={cn(
          "absolute inset-0 translate-y-[4px] rounded-md",
          "bg-d-fg/40",
        )}
      ></span>
      <span
        className={cn(
          "relative flex items-center justify-center rounded-md px-3 py-2.5 inset-shadow-sm will-change-transform select-none",
          "bg-gray-100 text-sm font-bold text-black/80 dark:bg-gray-800 dark:text-white",
          "group-hover:translate-y-[-2px] group-hover:[transition-duration:250ms]",
          "[transition:translate_600ms_ease-out]",
          isActive && "translate-y-[4px]! [transition-duration:34ms]!",
          className,
        )}
      >
        {children}
      </span>
    </div>
  );
};

export default Splash3dButton;

const usePress = (duration = 34, debounceTime = 34) => {
  const [isActive, setIsActive] = useState(false);
  const lastPressTime = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const handlePress = useCallback(() => {
    const now = Date.now();
    if (now - lastPressTime.current < debounceTime) return;

    lastPressTime.current = now;
    setIsActive(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    timeoutRef.current = window.setTimeout(() => {
      setIsActive(false);
      timeoutRef.current = null;
    }, duration);
  }, [duration, debounceTime]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  return {
    isActive,
    handlePress,
  };
};

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
