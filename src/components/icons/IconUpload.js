import React from "react";

const IconUpload = ({ size = 48, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="group-hover:stroke-secondary"
      >
        <path
          fill="none"
          strokeDasharray={14}
          strokeDashoffset={14}
          d="M6 19h12"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.4s"
            values="14;0"
          />
        </path>
        <path
          fill={color}
          className="group-hover:fill-secondary"
          d="M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5"
        >
          <animate
            attributeName="d"
            calcMode="linear"
            dur="1.5s"
            keyTimes="0;0.7;1"
            repeatCount="indefinite"
            values="M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5;M12 15 h2 v-3 h2.5 L12 7.5M12 15 h-2 v-3 h-2.5 L12 7.5;M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5"
          />
        </path>
      </g>
    </svg>
  );
};

export default IconUpload;
