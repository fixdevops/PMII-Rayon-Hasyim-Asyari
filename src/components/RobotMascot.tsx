"use client";

import { useEffect, useRef } from "react";

export default function RobotMascot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<SVGCircleElement>(null);
  const rightEyeRef = useRef<SVGCircleElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const leftGlowRef = useRef<SVGCircleElement>(null);
  const rightGlowRef = useRef<SVGCircleElement>(null);

  // Eye socket center positions (in SVG coordinate space)
  const LEFT_EYE = { cx: 152, cy: 200 };
  const RIGHT_EYE = { cx: 248, cy: 200 };
  const EYE_RADIUS = 28;
  const PUPIL_RANGE = 10;

  useEffect(() => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg) return;

    function movePupil(
      pupilEl: SVGCircleElement | null,
      glowEl: SVGCircleElement | null,
      socketCx: number,
      socketCy: number,
      mouseX: number,
      mouseY: number,
      svgRect: DOMRect
    ) {
      if (!pupilEl || !glowEl) return;
      // Convert mouse to SVG viewBox coordinates
      const svgW = 400;
      const svgH = 480;
      const mx = ((mouseX - svgRect.left) / svgRect.width) * svgW;
      const my = ((mouseY - svgRect.top) / svgRect.height) * svgH;

      const dx = mx - socketCx;
      const dy = my - socketCy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      const clampedDist = Math.min(dist / 4, PUPIL_RANGE);
      const px = socketCx + Math.cos(angle) * clampedDist;
      const py = socketCy + Math.sin(angle) * clampedDist;

      pupilEl.setAttribute("cx", String(px));
      pupilEl.setAttribute("cy", String(py));
      glowEl.setAttribute("cx", String(px));
      glowEl.setAttribute("cy", String(py));
    }

    function handleMouseMove(e: MouseEvent) {
      const svgEl = containerRef.current?.querySelector("svg");
      if (!svgEl) return;
      const rect = svgEl.getBoundingClientRect();
      movePupil(leftPupilRef.current, leftGlowRef.current, LEFT_EYE.cx, LEFT_EYE.cy, e.clientX, e.clientY, rect);
      movePupil(rightPupilRef.current, rightGlowRef.current, RIGHT_EYE.cx, RIGHT_EYE.cy, e.clientX, e.clientY, rect);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="select-none" style={{ filter: "drop-shadow(0 32px 48px rgba(0,30,64,0.18))" }}>
      <svg
        viewBox="0 0 400 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Maskot PMII Rayon Hasyim Asyari"
      >
        <defs>
          {/* Body gradient */}
          <linearGradient id="bodyGrad" x1="200" y1="220" x2="200" y2="460" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e8f0fe" />
          </linearGradient>
          {/* Head gradient */}
          <linearGradient id="headGrad" x1="200" y1="90" x2="200" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#dce8ff" />
          </linearGradient>
          {/* Eye bg gradient */}
          <radialGradient id="eyeBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0a1628" />
            <stop offset="100%" stopColor="#0d1f3c" />
          </radialGradient>
          {/* Pupil glow */}
          <radialGradient id="pupilGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60c8ff" stopOpacity="1" />
            <stop offset="60%" stopColor="#1e90ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0059bb" stopOpacity="0" />
          </radialGradient>
          {/* Cheek glow */}
          <radialGradient id="cheekGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb3c1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffb3c1" stopOpacity="0" />
          </radialGradient>
          {/* Shine */}
          <linearGradient id="shineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          {/* Screen gradient */}
          <linearGradient id="screenGrad" x1="120" y1="155" x2="280" y2="255" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0d1f3c" />
            <stop offset="100%" stopColor="#071224" />
          </linearGradient>
          {/* Antenna glow */}
          <radialGradient id="antGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60c8ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#1e90ff" stopOpacity="0" />
          </radialGradient>
          {/* Shadow filter */}
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#001e40" floodOpacity="0.12" />
          </filter>
          {/* Eye inner glow filter */}
          <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Pupil glow filter */}
          <filter id="pupilGlowFilter" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── GROUND SHADOW ── */}
        <ellipse cx="200" cy="468" rx="90" ry="10" fill="#001e40" opacity="0.08" />

        {/* ── LEGS ── */}
        {/* Left leg */}
        <rect x="148" y="400" width="36" height="56" rx="18" fill="url(#bodyGrad)" stroke="#c8d9f5" strokeWidth="2" />
        <rect x="140" y="444" width="48" height="22" rx="11" fill="url(#bodyGrad)" stroke="#c8d9f5" strokeWidth="2" />
        {/* Right leg */}
        <rect x="216" y="400" width="36" height="56" rx="18" fill="url(#bodyGrad)" stroke="#c8d9f5" strokeWidth="2" />
        <rect x="212" y="444" width="48" height="22" rx="11" fill="url(#bodyGrad)" stroke="#c8d9f5" strokeWidth="2" />

        {/* ── ARMS ── */}
        {/* Left arm */}
        <rect x="74" y="250" width="34" height="88" rx="17" fill="url(#bodyGrad)" stroke="#c8d9f5" strokeWidth="2" />
        {/* Left hand */}
        <circle cx="91" cy="348" r="20" fill="url(#bodyGrad)" stroke="#c8d9f5" strokeWidth="2" />
        {/* Right arm */}
        <rect x="292" y="250" width="34" height="88" rx="17" fill="url(#bodyGrad)" stroke="#c8d9f5" strokeWidth="2" />
        {/* Right hand */}
        <circle cx="309" cy="348" r="20" fill="url(#bodyGrad)" stroke="#c8d9f5" strokeWidth="2" />

        {/* ── BODY ── */}
        <rect x="100" y="228" width="200" height="188" rx="32" fill="url(#bodyGrad)" stroke="#b8ccf0" strokeWidth="2.5" filter="url(#softShadow)" />

        {/* Body panel — logo area */}
        <rect x="128" y="268" width="144" height="100" rx="16" fill="#f0f4ff" stroke="#d0ddf8" strokeWidth="1.5" />

        {/* PMII Logo on chest — letter P stylized */}
        <text x="200" y="332" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="42" fontWeight="800" fill="#001e40" opacity="0.85">
          PMII
        </text>
        <text x="200" y="352" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="600" fill="#0059bb" opacity="0.7" letterSpacing="3">
          RAYON FST
        </text>

        {/* Body bottom vent lines */}
        {[380, 390, 400].map((y, i) => (
          <line key={i} x1="148" y1={y} x2="252" y2={y} stroke="#c8d9f5" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        ))}

        {/* Body shine */}
        <ellipse cx="148" cy="264" rx="22" ry="12" fill="url(#shineGrad)" opacity="0.5" transform="rotate(-30,148,264)" />

        {/* ── NECK ── */}
        <rect x="176" y="212" width="48" height="28" rx="8" fill="#d8e8ff" stroke="#b8ccf0" strokeWidth="2" />

        {/* ── HEAD ── */}
        <rect x="100" y="88" width="200" height="140" rx="40" fill="url(#headGrad)" stroke="#b8ccf0" strokeWidth="2.5" filter="url(#softShadow)" />

        {/* Head shine highlight */}
        <ellipse cx="148" cy="108" rx="28" ry="14" fill="url(#shineGrad)" opacity="0.55" transform="rotate(-20,148,108)" />

        {/* ── FACE SCREEN ── */}
        <rect x="120" y="148" width="160" height="68" rx="20" fill="url(#screenGrad)" />
        {/* Screen inner border glow */}
        <rect x="120" y="148" width="160" height="68" rx="20" fill="none" stroke="#1e4a9a" strokeWidth="1.5" opacity="0.6" />
        {/* Screen scanline effect */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1="120"
            y1={158 + i * 12}
            x2="280"
            y2={158 + i * 12}
            stroke="#ffffff"
            strokeWidth="0.5"
            opacity="0.04"
          />
        ))}

        {/* ── LEFT EYE SOCKET ── */}
        <circle cx={LEFT_EYE.cx} cy={LEFT_EYE.cy} r={EYE_RADIUS} fill="url(#eyeBg)" />
        {/* Eye rim glow */}
        <circle cx={LEFT_EYE.cx} cy={LEFT_EYE.cy} r={EYE_RADIUS} fill="none" stroke="#1e6fff" strokeWidth="1.5" opacity="0.4" />

        {/* Left glow aura (behind pupil) */}
        <circle
          ref={leftGlowRef}
          cx={LEFT_EYE.cx}
          cy={LEFT_EYE.cy}
          r="18"
          fill="url(#pupilGlow)"
          opacity="0.35"
          filter="url(#pupilGlowFilter)"
        />
        {/* Left pupil */}
        <circle
          ref={leftPupilRef}
          cx={LEFT_EYE.cx}
          cy={LEFT_EYE.cy}
          r="11"
          fill="#40b0ff"
          filter="url(#eyeGlow)"
        />
        {/* Left pupil core */}
        <circle cx={LEFT_EYE.cx} cy={LEFT_EYE.cy} r="5" fill="#ffffff" opacity="0.9" />
        {/* Left eye shine dot */}
        <circle cx={LEFT_EYE.cx - 8} cy={LEFT_EYE.cy - 8} r="3.5" fill="#ffffff" opacity="0.7" />

        {/* ── RIGHT EYE SOCKET ── */}
        <circle cx={RIGHT_EYE.cx} cy={RIGHT_EYE.cy} r={EYE_RADIUS} fill="url(#eyeBg)" />
        <circle cx={RIGHT_EYE.cx} cy={RIGHT_EYE.cy} r={EYE_RADIUS} fill="none" stroke="#1e6fff" strokeWidth="1.5" opacity="0.4" />

        {/* Right glow aura */}
        <circle
          ref={rightGlowRef}
          cx={RIGHT_EYE.cx}
          cy={RIGHT_EYE.cy}
          r="18"
          fill="url(#pupilGlow)"
          opacity="0.35"
          filter="url(#pupilGlowFilter)"
        />
        {/* Right pupil */}
        <circle
          ref={rightPupilRef}
          cx={RIGHT_EYE.cx}
          cy={RIGHT_EYE.cy}
          r="11"
          fill="#40b0ff"
          filter="url(#eyeGlow)"
        />
        <circle cx={RIGHT_EYE.cx} cy={RIGHT_EYE.cy} r="5" fill="#ffffff" opacity="0.9" />
        <circle cx={RIGHT_EYE.cx - 8} cy={RIGHT_EYE.cy - 8} r="3.5" fill="#ffffff" opacity="0.7" />

        {/* ── MOUTH ── */}
        <path
          d="M 168 228 Q 200 242 232 228"
          stroke="#60c8ff"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />

        {/* ── CHEEKS ── */}
        <ellipse cx="128" cy="222" rx="16" ry="10" fill="url(#cheekGlow)" />
        <ellipse cx="272" cy="222" rx="16" ry="10" fill="url(#cheekGlow)" />

        {/* ── EARS / SIDE BOLTS ── */}
        <circle cx="100" cy="158" r="12" fill="#dce8ff" stroke="#b8ccf0" strokeWidth="2" />
        <circle cx="100" cy="158" r="6" fill="#c0d4f5" />
        <circle cx="300" cy="158" r="12" fill="#dce8ff" stroke="#b8ccf0" strokeWidth="2" />
        <circle cx="300" cy="158" r="6" fill="#c0d4f5" />

        {/* ── ANTENNA ── */}
        {/* Stem */}
        <line x1="200" y1="88" x2="200" y2="44" stroke="#b8ccf0" strokeWidth="5" strokeLinecap="round" />
        {/* Antenna base ring */}
        <circle cx="200" cy="88" r="8" fill="#dce8ff" stroke="#b8ccf0" strokeWidth="2" />
        {/* Antenna ball */}
        <circle cx="200" cy="32" r="18" fill="#001e40" stroke="#1e4a9a" strokeWidth="2" />
        {/* Antenna ball glow */}
        <circle cx="200" cy="32" r="12" fill="url(#antGlow)" opacity="0.9">
          <animate attributeName="r" values="10;14;10" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.4s" repeatCount="indefinite" />
        </circle>
        {/* Antenna ball core */}
        <circle cx="200" cy="32" r="6" fill="#60c8ff" />
        <circle cx="196" cy="28" r="3" fill="#ffffff" opacity="0.8" />

        {/* ── TOP HEAD DETAILS ── */}
        {/* Small screw bolts on top */}
        <circle cx="148" cy="92" r="5" fill="#c8d9f5" stroke="#b0c4e8" strokeWidth="1.5" />
        <circle cx="252" cy="92" r="5" fill="#c8d9f5" stroke="#b0c4e8" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
