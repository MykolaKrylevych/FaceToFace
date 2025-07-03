const Logo = () => (
  <svg width="320" height="100" viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cogito logo with philosophical symbol">
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#8B5CF6" floodOpacity="0.7"/>
      </filter>
      <radialGradient id="grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#C4B5FD" stopOpacity="1" />
        <stop offset="100%" stopColor="#312E81" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="circleGrad" cx="50%" cy="50%" r="60%">
        <stop offset="20%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#B8860B" />
      </radialGradient>
      <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="#3B82F6" floodOpacity="0.6"/>
      </filter>
    </defs>

    {/* <rect width="320" height="100" fill="url(#grad)" rx="20" ry="20" /> */}

    <circle cx="95" cy="35" r="14" fill="url(#circleGrad)" filter="url(#glow)" />
    <circle cx="95" cy="65" r="14" fill="url(#circleGrad)" filter="url(#glow)" />

    <line x1="95" y1="35" x2="95" y2="65" stroke="#FFD700" strokeWidth="3" strokeDasharray="6,4" />

    <text
      x="190" y="65"
      fontFamily="Poppins, sans-serif"
      fontSize="48"
      fill="#C4B5FD"
      textAnchor="middle"
      filter="url(#glow)"
      fontWeight="700"
      style={{ textShadow: "0 0 5px rgba(196, 181, 253, 0.6)" }}
    >
      Cogito
    </text>
  </svg>
);

export default Logo;




