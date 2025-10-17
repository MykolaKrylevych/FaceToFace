// src/components/SwipeDeck.jsx
import React, { useState } from "react";
import { animated, useSpring, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { CheckCircle, XCircle, FileEdit } from "lucide-react";

const SWIPE_DISTANCE = 150;
const SWIPE_VELOCITY = 0.6;

const initialCards = [
  { id: 1, text: "First card — you can select this text." },
  { id: 2, text: "Second card — swipe me." },
  { id: 3, text: "Third card — try swipe down." },
];

export default function SwipeDeck() {
  const [cards, setCards] = useState(initialCards);
  const [swipeDir, setSwipeDir] = useState(null);

  const handleSwipeComplete = (id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    setSwipeDir(null);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 relative select-none overflow-hidden">
      {/* --- SIDE ICONS --- */}
      <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none">
        <IconIndicator
          active={swipeDir === "left"}
          color="red"
          icon={<XCircle size={56} />}
        />
        <IconIndicator
          active={swipeDir === "right"}
          color="green"
          icon={<CheckCircle size={56} />}
        />
      </div>

      {/* --- BOTTOM ICON --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
        <IconIndicator
          active={swipeDir === "down"}
          color="yellow"
          icon={<FileEdit size={56} />}
        />
      </div>

      {/* --- CARD STACK --- */}
      {cards.length === 0 ? (
        <div className="text-2xl font-semibold text-gray-700">
          No more cards 👋
        </div>
      ) : (
        <div className="relative w-80 h-[420px]">
          {cards.map((card, index) => {
            const isTop = index === 0;
            return (
              <Card
                key={card.id}
                card={card}
                index={index}
                total={cards.length}
                isTop={isTop}
                onSwipeComplete={handleSwipeComplete}
                setSwipeDir={setSwipeDir}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ----- Small helper component for the fixed icons ----- */
function IconIndicator({ icon, color, active }) {
  return (
    <div
      className={`transition-all duration-200 ${
        active ? `scale-110 text-${color}-500 opacity-100` : "opacity-30"
      }`}
    >
      {icon}
    </div>
  );
}

/* ----- Card component ----- */
function Card({ card, index, total, isTop, onSwipeComplete, setSwipeDir }) {
  const [{ x, y, rot, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rot: 0,
    scale: 1,
    config: { mass: 1, tension: 300, friction: 30 },
  }));

  const bind = useDrag(
    (state) => {
      const { active, movement: [mx, my], velocity, direction: [dx, dy] } = state;

      if (!isTop && active) return;

      if (active) {
        // detect swipe direction
        if (Math.abs(mx) > Math.abs(my)) {
          setSwipeDir(mx > 0 ? "right" : "left");
        } else if (my > 0) {
          setSwipeDir("down");
        } else {
          setSwipeDir(null);
        }

        api.start({
          x: mx,
          y: my,
          rot: mx / 20,
          scale: 1.05,
        });
        return;
      }

      // reset when released
      setSwipeDir(null);

      const absX = Math.abs(mx);
      const absY = Math.abs(my);
      const fast = velocity > SWIPE_VELOCITY;
      const far = absX > SWIPE_DISTANCE || absY > SWIPE_DISTANCE;
      const shouldSwipe = fast || far;

      if (shouldSwipe) {
        const dirX = Math.sign(mx || dx);
        const dirY = Math.sign(my || dy);
        const finalX = (dirX || 1) * (window.innerWidth + 600);
        const finalY = my + (dirY || 0) * 400;

        api.start({
          x: finalX,
          y: finalY,
          rot: (dirX || 0) * 35,
          scale: 1,
          config: { tension: 200, friction: 30 },
          onRest: () => onSwipeComplete(card.id),
        });
      } else {
        api.start({ x: 0, y: 0, rot: 0, scale: 1 });
      }
    },
    { from: () => [x.get(), y.get()], pointer: { touch: true }, filterTaps: true }
  );

  const stackOffsetY = index * 10;
  const stackScale = 1 - index * 0.02;
  const zIndex = total - index + 100;

  const animatedStyle = isTop
    ? {
        zIndex,
        touchAction: "none",
        transform: interpolate([x, y, rot, scale], (xVal, yVal, rVal, sVal) =>
          `translate3d(${xVal}px, ${yVal}px, 0) rotate(${rVal}deg) scale(${sVal})`
        ),
      }
    : {
        zIndex,
        transform: `translate3d(0px, ${stackOffsetY}px, 0) scale(${stackScale})`,
      };

  return (
    <animated.div
      {...(isTop ? bind() : {})}
      style={animatedStyle}
      className="absolute left-0 right-0 mx-auto w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col items-center justify-center p-6"
    >
      <div
        className="text-center text-lg leading-tight "
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          caretColor: "transparent",
          backgroundColor: "transparent",
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {card.text}
      </div>
    </animated.div>
  );
}
