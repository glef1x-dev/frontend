import { memo, useEffect, useRef } from "react";
import TypewriterComponent, { TypewriterClass } from "typewriter-effect";
import { useSettings } from "~/hooks/use-settings";
import { splitGraphemes } from "~/utils/intl";
import { useMedia } from "react-use";

interface TypewriterProps {
  typingFn: (typewriter: TypewriterClass) => void;
  fallbackTextIfTypingIsDisabled: string;
}

const initialState = {
  cursorAnimation: null,
  lastFrameTime: null,
  pauseUntil: null,
  eventQueue: [],
  eventLoop: null,
  eventLoopPaused: false,
  reverseCalledEvents: [],
  calledEvents: [],
  visibleNodes: [],
  initialOptions: null,
};

export const Typewriter = memo(function Typewriter({
  typingFn,
  fallbackTextIfTypingIsDisabled,
}: TypewriterProps): JSX.Element {
  const typewriterRef = useRef<TypewriterClass | null>(null);
  const [{ animations: userWantsAnimations }] = useSettings();
  const preferNoAnimations = useMedia("(prefers-reduced-motion: reduce)");
  const areAnimationsTurnedOn = userWantsAnimations && !preferNoAnimations;

  const resetTypewriter = (typewriter: TypewriterClass): void => {
    const state = typewriter.state;

    typewriter.state = {
      ...initialState,
      elements: state.elements,
      initialOptions: state.initialOptions,
      cursorAnimation: state.cursorAnimation,
      eventLoopPaused: state.eventLoopPaused,
    };
    typewriter.addEventToQueue("REMOVE_ALL", null, true);
    typewriterRef.current = typewriter;
  };

  const setFallbackText = (typewriter: TypewriterClass): void => {
    typewriter.state.elements.wrapper.replaceChildren(
      document.createTextNode(fallbackTextIfTypingIsDisabled)
    );
  };

  const toggleCursorDisplay = (typewriter: TypewriterClass): void => {
    typewriter.state.elements.cursor.classList.toggle("hidden");
  };

  useEffect(() => {
    const typewriter = typewriterRef.current;

    if (!typewriter) {
      return;
    }

    const isTypewriterPaused: boolean = typewriter.state.eventLoopPaused;

    if (!areAnimationsTurnedOn) {
      setFallbackText(typewriter);
      resetTypewriter(typewriter);
      toggleCursorDisplay(typewriter);

      typewriter.pause();
    } else {
      toggleCursorDisplay(typewriter);
      if (!isTypewriterPaused) {
        resetTypewriter(typewriter);
      }

      typewriter.state.elements.wrapper.replaceChildren();
      typingFn(typewriter);
    }
  }, [areAnimationsTurnedOn, typewriterRef]);

  return (
    <TypewriterComponent
      onInit={(typewriter): void => {
        typewriterRef.current = typewriter;
        if (!areAnimationsTurnedOn) {
          setFallbackText(typewriter);
          toggleCursorDisplay(typewriter);
          return;
        }

        typingFn(typewriter);
      }}
      options={{
        loop: true,
        delay: 70,
        deleteSpeed: 70,
        skipAddStyles: true,
        cursorClassName:
          "max-w-xs mt-4 md:mt-8 mx-auto text-base text-gray-300 sm:text-lg md:text-xl md:max-w-3xl relative z-50",
        wrapperClassName:
          "max-w-xs mt-4 md:mt-8 mx-auto text-base text-gray-300 sm:text-lg md:text-xl md:max-w-3xl relative z-50",
        // @ts-expect-error: Typings are wrong
        stringSplitter: splitGraphemes,
      }}
    />
  );
});
