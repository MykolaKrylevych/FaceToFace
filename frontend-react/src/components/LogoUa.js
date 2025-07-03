const FaceToFaceLogo = () => (
  <svg
    width="320"
    height="160"
    viewBox="0 0 320 160"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Логотип Віч-На-Віч"
  >
    <defs>
      {/* Градієнт фону */}
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5F3FF" />
        <stop offset="100%" stopColor="#EDE9FE" />
      </linearGradient>

      {/* Градієнт облич */}
      <radialGradient id="faceGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="100%" stopColor="#7C3AED" />
      </radialGradient>
    </defs>

    {/* Тло */}
    {/* <rect width="320" height="160" rx="20" ry="20" fill="url(#bgGradient)" /> */}

    {/* Ліве обличчя */}
    <circle
      cx="90"
      cy="80"
      r="16"
      fill="url(#faceGradient)"
    >
      <animate
        attributeName="r"
        values="16;18;16"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Праве обличчя */}
    <circle
      cx="230"
      cy="80"
      r="16"
      fill="url(#faceGradient)"
    >
      <animate
        attributeName="r"
        values="16;18;16"
        dur="2s"
        repeatCount="indefinite"
        begin="1s"
      />
    </circle>

    {/* Верхня хвиля */}
    <path
      d="M 90 80 Q 130 50 170 80 T 230 80"
      fill="none"
      stroke="#A78BFA"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="10 10"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="-40"
        dur="4s"
        repeatCount="indefinite"
      />
    </path>

    {/* Нижня дзеркальна хвиля */}
    <path
      d="M 90 80 Q 130 110 170 80 T 230 80"
      fill="none"
      stroke="#DDD6FE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="6 6"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="-24"
        dur="6s"
        repeatCount="indefinite"
      />
    </path>

    {/* Назва */}
    <text
      x="160"
      y="150"
      textAnchor="middle"
      fontFamily="'Poppins', sans-serif"
      fontWeight="700"
      fontSize="22"
      fill="#4C1D95"
    >
      Face-To-Face
    </text>
  </svg>
);

export default FaceToFaceLogo;
