import React from "react";

type Props = {
  className?: string;
  title?: string;
  caption?: string;
};

const IMG_SRC = "/bspsecuritips_newyear.jpg";

const BspSecurityTipsNewYearAdvisory: React.FC<Props> = ({
  className,
  title = "BSP Security Tips – New Year",
  caption = "BSP Security Tips advisory image.",
}) => {
  return (
    <figure className={className}>
      <img
        src={IMG_SRC}
        alt={title}
        loading="lazy"
        className="w-full rounded-2xl shadow-sm ring-1 ring-gray-100 select-none"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()} // ✅ disable right-click menu
      />

      {caption ? (
        <figcaption className="mt-2 text-xs text-gray-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};

export default React.memo(BspSecurityTipsNewYearAdvisory);
