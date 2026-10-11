"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const MONO_FONT = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';

type Pt = [number, number];
type Step = [from: number, to: number, capability: string];
type Scene = { loop: number; still: number; steps: Step[]; Draw: (props: { t: number }) => React.ReactNode };

const W = 1280;
const H = 536;
const INK = "#16253f";
const ACCENT = "#3b81e3";
const TAU = Math.PI * 2;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const inOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2);
const out = (p: number) => 1 - (1 - p) ** 3;
const back = (p: number) => 1 + 2.70158 * (p - 1) ** 3 + 1.70158 * (p - 1) ** 2;
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const mix = (a: Pt, b: Pt, p: number): Pt => [lerp(a[0], b[0], p), lerp(a[1], b[1], p)];
const quad = (a: Pt, c: Pt, b: Pt, p: number): Pt => mix(mix(a, c, p), mix(c, b, p), p);
const cubic = (a: Pt, c1: Pt, c2: Pt, b: Pt, p: number): Pt => quad(mix(a, c1, p), mix(c1, c2, p), mix(c2, b, p), p);
const pt = (p: Pt) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const fade = (t: number, loop: number) => prog(t, 0, 0.25) * (1 - prog(t, loop - 0.7, loop));

const draw = (p: number) =>
  ({ pathLength: 1, strokeDasharray: "1 1", strokeDashoffset: 1 - p, visibility: p > 0 ? "visible" : "hidden" }) as const;

const line = { fill: "none", stroke: INK, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const hair = { ...line, strokeWidth: 2, strokeOpacity: 0.22 } as const;
const mono = { fontFamily: MONO_FONT, letterSpacing: 1 } as const;

/* ------------------------------------------------------------------------- *
 * 1. Website Designing Drawing                                              *
 * ------------------------------------------------------------------------- */
const WEB_CARDS = [140, 480, 820];
function WebsiteDesigningDraw({ t }: { t: number }) {
  const browser = inOut(prog(t, 0.2, 1.4));
  const nav = prog(t, 1.2, 1.8);
  const hero = inOut(prog(t, 1.6, 2.4));
  const cardsP = inOut(prog(t, 2.2, 3.2));
  const responsiveP = inOut(prog(t, 3.2, 4.4));
  const fastP = prog(t, 4.4, 5.8);
  const liveP = prog(t, 5.8, 7.2);

  // Responsive scale down or phone sidebar
  const phoneX = lerp(1200, 960, responsiveP);

  return (
    <g opacity={fade(t, 9)}>
      {/* Browser Canvas */}
      <rect x={100} y={60} width={1080} height={420} rx={16} {...line} strokeWidth={2.5} {...draw(browser)} />
      {/* Header / Traffic lights */}
      <line x1={100} y1={115} x2={1180} y2={115} {...hair} {...draw(nav)} />
      {[135, 160, 185].map((x, i) => (
        <circle key={x} cx={x} cy={88} r={6} fill={INK} opacity={0.35 * prog(t, 0.8 + i * 0.1, 1.1 + i * 0.1)} />
      ))}
      {/* URL bar */}
      <rect x={230} y={74} width={500} height={28} rx={6} {...hair} strokeOpacity={0.4} {...draw(nav)} />
      <text x={250} y={93} fontSize={15} fill={INK} fillOpacity={0.5} style={mono}>
        xyvora.com/your-brand
      </text>

      {/* Hero Section Banner */}
      <rect x={140} y={145} width={1000} height={140} rx={10} {...hair} fill={ACCENT} fillOpacity={0.06 * hero} {...draw(hero)} />
      <path d="M180 185H460M180 215H380M180 240H290" {...line} strokeWidth={3} strokeOpacity={0.7} {...draw(hero)} />
      {/* Hero CTA Button */}
      <rect x={480} y={220} width={120} height={36} rx={8} fill={ACCENT} opacity={hero} />
      <text x={540} y={243} textAnchor="middle" fontSize={14} fill="#fff" fontWeight="bold" opacity={hero} style={mono}>
        LAUNCH
      </text>

      {/* Grid of 3 Feature Cards */}
      {WEB_CARDS.map((cx, i) => {
        const cp = prog(cardsP, i * 0.25, 0.5 + i * 0.25);
        return (
          <g key={cx} opacity={cp}>
            <rect x={cx} y={310} width={300} height={140} rx={10} {...line} strokeWidth={2} {...draw(cp)} />
            <circle cx={cx + 40} cy={350} r={18} fill={ACCENT} fillOpacity={0.15} stroke={ACCENT} strokeWidth={2} />
            <path d={`M${cx + 70} 345h180M${cx + 70} 360h140M${cx + 30} 395h240M${cx + 30} 415h190`} {...hair} strokeWidth={2} />
          </g>
        );
      })}

      {/* Responsive Mobile Device Slide-in */}
      {responsiveP > 0 && (
        <g transform={`translate(${phoneX} 140)`} opacity={responsiveP}>
          <rect x={0} y={0} width={160} height={290} rx={22} fill="#ffffff" {...line} strokeWidth={3} />
          <line x1={50} y1={18} x2={110} y2={18} {...line} strokeWidth={3} strokeOpacity={0.4} />
          <rect x={15} y={35} width={130} height={55} rx={6} fill={ACCENT} fillOpacity={0.12} />
          <rect x={15} y={105} width={130} height={70} rx={6} {...hair} />
          <rect x={15} y={190} width={130} height={70} rx={6} {...hair} />
        </g>
      )}

      {/* Speedometer / Performance Spark */}
      {fastP > 0 && (
        <g transform="translate(1000, 80)" opacity={fastP}>
          <circle cx={0} cy={0} r={28} fill="#ffffff" stroke={ACCENT} strokeWidth={3} />
          <text x={0} y={6} textAnchor="middle" fontSize={16} fontWeight="bold" fill={ACCENT} style={mono}>
            100
          </text>
          <text x={0} y={42} textAnchor="middle" fontSize={12} fill={INK} fillOpacity={0.6} style={mono}>
            Lighthouse
          </text>
        </g>
      )}

      {/* Live Badge */}
      {liveP > 0 && (
        <g transform="translate(1100, 20)" opacity={liveP}>
          <circle cx={0} cy={0} r={7} fill="#10b981" />
          <circle cx={0} cy={0} r={14} fill="none" stroke="#10b981" strokeWidth={2} opacity={0.6} />
        </g>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------------- *
 * 2. App Development Drawing                                                *
 * ------------------------------------------------------------------------- */
const A_PHONES: Pt[] = [[320, 70], [640, 70], [960, 70]];
function AppDevelopmentDraw({ t }: { t: number }) {
  const p1 = inOut(prog(t, 0.2, 1.6));
  const p2 = inOut(prog(t, 1.8, 3.2));
  const wire = inOut(prog(t, 3.2, 4.5));
  const data = prog(t, 4.5, 6.5);
  const sync = inOut(prog(t, 6.5, 8.5));

  return (
    <g opacity={fade(t, 9)}>
      {/* iOS Device Frame */}
      <rect x={240} y={50} width={220} height={430} rx={34} {...line} strokeWidth={3} {...draw(p1)} fill="#fff" />
      <line x1={310} y1={72} x2={390} y2={72} {...line} strokeWidth={4} strokeOpacity={0.6} />
      {/* App Feed Items */}
      {[0, 1, 2, 3].map((i) => {
        const py = 110 + i * 85;
        const o = prog(t, 0.8 + i * 0.25, 1.4 + i * 0.25);
        return (
          <g key={i} opacity={o}>
            <rect x={260} y={py} width={180} height={70} rx={12} {...hair} strokeOpacity={0.4} />
            <circle cx={285} cy={py + 35} r={14} fill={ACCENT} fillOpacity={0.2} stroke={ACCENT} strokeWidth={2} />
            <path d={`M312 ${py + 28}h105M312 ${py + 44}h65`} {...line} strokeWidth={2} strokeOpacity={0.4} />
          </g>
        );
      })}

      {/* Android Device Frame */}
      <rect x={540} y={50} width={220} height={430} rx={22} {...line} strokeWidth={3} {...draw(p2)} fill="#fff" />
      <circle cx={650} cy={72} r={5} fill={INK} opacity={0.6} />
      {/* Android Dashboard */}
      {[0, 1].map((i) => {
        const py = 110 + i * 160;
        const o = prog(t, 2.2 + i * 0.4, 3.0 + i * 0.4);
        return (
          <g key={i} opacity={o}>
            <rect x={560} y={py} width={180} height={140} rx={14} fill={ACCENT} fillOpacity={0.05} {...line} strokeWidth={2} />
            <polyline points={`${575},${py + 100} ${615},${py + 65} ${665},${py + 85} ${720},${py + 45}`} {...line} stroke={ACCENT} strokeWidth={3} />
            <circle cx={720} cy={py + 45} r={5} fill={ACCENT} />
          </g>
        );
      })}

      {/* Cloud & API Backend Stack on Right */}
      <g transform="translate(860, 100)" opacity={wire}>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0, ${i * 110})`}>
            <rect x={0} y={0} width={260} height={80} rx={14} fill="#fff" {...line} strokeWidth={2.5} />
            <circle cx={35} cy={40} r={10} fill={ACCENT} />
            <path d="M65 32H210M65 48H160" {...line} strokeWidth={2} strokeOpacity={0.4} />
            <circle cx={230} cy={40} r={5} fill="#10b981" />
          </g>
        ))}
      </g>

      {/* Data Sync Cables */}
      <path d="M460 260C500 260 500 260 540 260" {...hair} strokeWidth={3} {...draw(wire)} />
      <path d="M760 260C810 260 810 200 860 200" {...hair} strokeWidth={3} {...draw(wire)} />

      {/* Floating Packets */}
      {data > 0 &&
        [0, 1, 2].map((k) => {
          const u = ((t - 4.5) * 0.7 + k * 0.35) % 1;
          const px = lerp(460, 860, u);
          const py = 260 + Math.sin(u * Math.PI) * -30;
          return <circle key={k} cx={px} cy={py} r={6} fill={ACCENT} opacity={Math.sin(u * Math.PI)} />;
        })}
    </g>
  );
}

/* ------------------------------------------------------------------------- *
 * 3. UI/UX Design Drawing                                                   *
 * ------------------------------------------------------------------------- */
function UiUxDesignDraw({ t }: { t: number }) {
  const wire = inOut(prog(t, 0.2, 1.8));
  const cur = quad([200, 350], [450, 100], [680, 240], inOut(prog(t, 1.5, 3.2)));
  const comp = inOut(prog(t, 3.0, 4.6));
  const proto = inOut(prog(t, 4.6, 6.2));
  const designSys = inOut(prog(t, 6.2, 8.0));

  return (
    <g opacity={fade(t, 9)}>
      {/* Wireframe Canvas with Rulers */}
      <rect x={120} y={70} width={640} height={390} rx={16} {...line} strokeWidth={2.5} {...draw(wire)} />
      {/* Grids and guides */}
      {[220, 360, 500, 640].map((x) => (
        <line key={x} x1={x} y1={70} x2={x} y2={460} {...hair} strokeDasharray="4 6" opacity={0.3 * wire} />
      ))}
      {/* Wireframe Components */}
      <rect x={150} y={110} width={260} height={120} rx={10} {...hair} strokeWidth={2} {...draw(wire)} />
      <line x1={150} y1={110} x2={410} y2={230} {...hair} opacity={0.2} />
      <line x1={410} y1={110} x2={150} y2={230} {...hair} opacity={0.2} />

      <rect x={440} y={110} width={290} height={200} rx={12} fill={ACCENT} fillOpacity={0.08 * comp} {...line} strokeWidth={2} {...draw(comp)} />
      <circle cx={490} cy={160} r={24} fill={ACCENT} opacity={comp} />
      <path d="M530 150h160M530 170h110" {...line} strokeWidth={3} strokeOpacity={0.6} {...draw(comp)} />
      <rect x={460} y={220} width={120} height={36} rx={8} fill={ACCENT} opacity={comp} />
      <rect x={600} y={220} width={100} height={36} rx={8} {...line} strokeWidth={2} opacity={comp} />

      {/* User Journey Flow Arrow */}
      {proto > 0 && (
        <g opacity={proto}>
          <path d="M280 230C280 340 380 370 460 370" {...line} stroke={ACCENT} strokeWidth={3} strokeDasharray="6 6" />
          <polygon points="465,370 450,362 450,378" fill={ACCENT} />
          <rect x={470} y={340} width={250} height={70} rx={10} fill="#fff" {...line} stroke={ACCENT} strokeWidth={2} />
          <text x={500} y={380} fontSize={16} fill={INK} fontWeight="bold" style={mono}>
            User Converted!
          </text>
        </g>
      )}

      {/* Figma / Vector Cursor */}
      <g transform={`translate(${pt(cur)})`} opacity={prog(t, 0.8, 1.2)}>
        <path d="M0 0l16 38l7 -14l15 3l-38 -27Z" fill={ACCENT} stroke="#fff" strokeWidth={2} />
        <rect x={22} y={22} width={80} height={24} rx={4} fill={INK} />
        <text x={28} y={38} fontSize={12} fill="#fff" style={mono}>
          Murali UI
        </text>
      </g>

      {/* Design System Tokens Column on Right */}
      <g transform="translate(840, 80)" opacity={designSys}>
        <rect x={0} y={0} width={340} height={380} rx={16} fill="#fff" {...line} strokeWidth={2} />
        <text x={25} y={38} fontSize={16} fontWeight="bold" fill={INK} style={mono}>
          Design System Tokens
        </text>
        <line x1={20} y1={55} x2={320} y2={55} {...hair} />
        {/* Colors */}
        {["#6d28d9", "#3b82f6", "#10b981", "#f59e0b", "#0f172a"].map((c, i) => (
          <circle key={c} cx={40 + i * 55} cy={95} r={18} fill={c} stroke="#fff" strokeWidth={2} />
        ))}
        {/* Typography scale */}
        <text x={25} y={155} fontSize={22} fontWeight="bold" fill={INK}>
          Display Heading
        </text>
        <text x={25} y={185} fontSize={16} fill={INK} fillOpacity={0.7}>
          Subheading Medium
        </text>
        <text x={25} y={210} fontSize={13} fill={INK} fillOpacity={0.5}>
          Body Copy Regular 14px
        </text>
        {/* Radius & components */}
        <rect x={25} y={235} width={80} height={36} rx={18} fill={ACCENT} opacity={0.2} stroke={ACCENT} strokeWidth={2} />
        <rect x={120} y={235} width={80} height={36} rx={8} fill={INK} opacity={0.1} stroke={INK} strokeWidth={2} />
        <rect x={215} y={235} width={80} height={36} rx={4} fill={INK} opacity={0.1} stroke={INK} strokeWidth={2} />
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------------- *
 * 4. Logo Designing Drawing                                                 *
 * ------------------------------------------------------------------------- */
function LogoDesigningDraw({ t }: { t: number }) {
  const grid = inOut(prog(t, 0.2, 1.6));
  const mark = inOut(prog(t, 1.4, 3.2));
  const golden = inOut(prog(t, 2.8, 4.4));
  const typo = inOut(prog(t, 4.2, 5.8));
  const app = inOut(prog(t, 5.8, 7.5));

  const center: Pt = [420, 260];

  return (
    <g opacity={fade(t, 9)}>
      {/* Geometry Circles & Golden Ratio Grid */}
      <circle cx={center[0]} cy={center[1]} r={140} {...hair} {...draw(grid)} />
      <circle cx={center[0]} cy={center[1]} r={86} {...hair} strokeDasharray="4 6" {...draw(grid)} />
      <circle cx={center[0]} cy={center[1]} r={53} {...hair} {...draw(grid)} />
      <line x1={center[0] - 180} y1={center[1]} x2={center[0] + 180} y2={center[1]} {...hair} {...draw(grid)} />
      <line x1={center[0]} y1={center[1] - 180} x2={center[0]} y2={center[1] + 180} {...hair} {...draw(grid)} />
      <line x1={center[0] - 130} y1={center[1] - 130} x2={center[0] + 130} y2={center[1] + 130} {...hair} strokeDasharray="3 5" {...draw(grid)} />

      {/* Dynamic XyvorA Logo Mark Drawing */}
      {mark > 0 && (
        <g opacity={mark}>
          {/* Stylized X emblem */}
          <path d={`M${center[0] - 70} ${center[1] - 70} Q${center[0]} ${center[1]} ${center[0] + 70} ${center[1] + 70}`} {...line} stroke={ACCENT} strokeWidth={14} {...draw(mark)} />
          <path d={`M${center[0] + 70} ${center[1] - 70} Q${center[0]} ${center[1]} ${center[0] - 70} ${center[1] + 70}`} {...line} stroke={INK} strokeWidth={14} {...draw(mark)} />
          <circle cx={center[0]} cy={center[1]} r={16} fill="#fff" stroke={ACCENT} strokeWidth={5} />
        </g>
      )}

      {/* Vector Pen Anchor Handles */}
      {golden > 0 && (
        <g opacity={golden}>
          {[
            [center[0] - 70, center[1] - 70],
            [center[0] + 70, center[1] - 70],
            [center[0] - 70, center[1] + 70],
            [center[0] + 70, center[1] + 70],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x - 6} y={y - 6} width={12} height={12} fill="#fff" stroke={ACCENT} strokeWidth={2} />
              <line x1={x - 20} y1={y} x2={x + 20} y2={y} stroke={ACCENT} strokeWidth={1.5} />
              <circle cx={x - 20} cy={y} r={3} fill={ACCENT} />
              <circle cx={x + 20} cy={y} r={3} fill={ACCENT} />
            </g>
          ))}
        </g>
      )}

      {/* Typography Lockup on Right */}
      <g transform="translate(680, 140)" opacity={typo}>
        <text x={0} y={60} fontSize={54} fontWeight="900" fill={INK} letterSpacing={2}>
          XYVORA
        </text>
        <text x={4} y={100} fontSize={16} fill={INK} fillOpacity={0.6} letterSpacing={8} style={mono}>
          CREATIVE AGENCY
        </text>
        <line x1={0} y1={125} x2={380} y2={125} {...hair} strokeWidth={2} />

        {/* Color Palette Swatches */}
        <g transform="translate(0, 150)">
          <rect x={0} y={0} width={70} height={70} rx={12} fill="#0b0f4a" />
          <rect x={85} y={0} width={70} height={70} rx={12} fill="#3b81e3" />
          <rect x={170} y={0} width={70} height={70} rx={12} fill="#10b981" />
          <rect x={255} y={0} width={70} height={70} rx={12} fill="#f8fafc" stroke={INK} strokeWidth={2} />
        </g>
      </g>

      {/* Export Formats Badge */}
      {app > 0 && (
        <g transform="translate(680, 390)" opacity={app}>
          {["SVG", "EPS", "PNG", "AI", "PDF"].map((fmt, i) => (
            <g key={fmt} transform={`translate(${i * 65}, 0)`}>
              <rect x={0} y={0} width={55} height={28} rx={6} fill={ACCENT} fillOpacity={0.12} stroke={ACCENT} strokeWidth={1.5} />
              <text x={28} y={18} textAnchor="middle" fontSize={11} fontWeight="bold" fill={ACCENT} style={mono}>
                {fmt}
              </text>
            </g>
          ))}
        </g>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------------- *
 * 5. Ad Shooting & Videography Drawing                                      *
 * ------------------------------------------------------------------------- */
function AdShootingDraw({ t }: { t: number }) {
  const cam = inOut(prog(t, 0.2, 1.8));
  const lights = inOut(prog(t, 1.6, 3.2));
  const action = inOut(prog(t, 3.0, 4.8));
  const record = prog(t, 4.5, 6.5);
  const colorGrad = inOut(prog(t, 6.0, 7.8));

  return (
    <g opacity={fade(t, 9)}>
      {/* Studio Camera Rig */}
      <g transform="translate(180, 140)" opacity={cam}>
        <rect x={0} y={50} width={160} height={110} rx={14} fill="#fff" {...line} strokeWidth={3} />
        {/* Lens Barrel */}
        <path d="M160 80L230 55V155L160 130Z" fill={ACCENT} fillOpacity={0.1} {...line} strokeWidth={3} />
        <circle cx={80} cy={105} r={24} fill={INK} opacity={0.2} stroke={INK} strokeWidth={2} />
        {/* Top Handle & Monitor */}
        <path d="M20 50V20H120V50" {...line} strokeWidth={3} />
        <rect x={110} y={-10} width={80} height={50} rx={6} fill="#fff" {...line} strokeWidth={2} />
        {/* Tripod Legs */}
        <line x1={80} y1={160} x2={20} y2={320} {...line} strokeWidth={3} />
        <line x1={80} y1={160} x2={80} y2={320} {...line} strokeWidth={3} />
        <line x1={80} y1={160} x2={140} y2={320} {...line} strokeWidth={3} />
      </g>

      {/* Studio Softbox Lighting */}
      <g opacity={lights}>
        {/* Left Light */}
        <path d="M380 40L450 90L400 130Z" fill={ACCENT} fillOpacity={0.2} {...line} strokeWidth={2} />
        <line x1={420} y1={120} x2={420} y2={280} {...line} strokeWidth={2} />
        {/* Light Cones Beam */}
        <polygon points="450,90 650,180 620,290" fill="#fef08a" opacity={0.25 * lights} />
      </g>

      {/* Product on Pedestal */}
      <g transform="translate(620, 180)" opacity={action}>
        {/* Pedestal */}
        <ellipse cx={80} cy={180} rx={90} ry={25} fill="#e2e8f0" stroke={INK} strokeWidth={2} />
        <rect x={0} y={180} width={160} height={80} fill="#e2e8f0" />
        <ellipse cx={80} cy={260} rx={90} ry={25} fill="#cbd5e1" stroke={INK} strokeWidth={2} />
        {/* Hero Product Bottle */}
        <rect x={55} y={50} width={50} height={130} rx={16} fill="#fff" {...line} strokeWidth={3} />
        <rect x={65} y={25} width={30} height={25} rx={4} fill={ACCENT} />
        <line x1={55} y1={100} x2={105} y2={100} {...line} stroke={ACCENT} strokeWidth={2} />
        <circle cx={80} cy={135} r={12} fill={ACCENT} fillOpacity={0.2} />
      </g>

      {/* Director Clapper Board on Right */}
      <g transform="translate(920, 100)" opacity={record}>
        <rect x={0} y={40} width={220} height={160} rx={12} fill="#fff" {...line} strokeWidth={2.5} />
        {/* Diagonal Stripes Top Bar */}
        <rect x={0} y={0} width={220} height={40} rx={6} fill={INK} stroke={INK} strokeWidth={2} />
        {[30, 80, 130, 180].map((x) => (
          <line key={x} x1={x} y1={0} x2={x - 20} y2={40} stroke="#fff" strokeWidth={6} />
        ))}
        <text x={20} y={80} fontSize={14} fill={INK} style={mono}>
          SCENE: 04
        </text>
        <text x={120} y={80} fontSize={14} fill={INK} style={mono}>
          TAKE: 01
        </text>
        <text x={20} y={120} fontSize={14} fill={INK} style={mono}>
          FPS: 120 (4K RAW)
        </text>
        <text x={20} y={160} fontSize={16} fontWeight="bold" fill={ACCENT} style={mono}>
          PROD: XYVORA
        </text>
      </g>

      {/* Recording Red Dot Indicator */}
      {record > 0 && (
        <g transform="translate(1120, 70)">
          <circle cx={0} cy={0} r={8} fill="#ef4444" />
          <circle cx={0} cy={0} r={16} fill="none" stroke="#ef4444" strokeWidth={2} opacity={0.5} />
          <text x={24} y={5} fontSize={14} fontWeight="bold" fill="#ef4444" style={mono}>
            REC
          </text>
        </g>
      )}

      {/* Color Grading Wheel / Scopes */}
      <g transform="translate(920, 310)" opacity={colorGrad}>
        <rect x={0} y={0} width={220} height={120} rx={12} fill="#fff" {...hair} strokeWidth={2} />
        <circle cx={50} cy={60} r={32} fill="none" stroke={ACCENT} strokeWidth={3} />
        <circle cx={140} cy={60} r={32} fill="none" stroke="#10b981" strokeWidth={3} />
        <circle cx={50} cy={60} r={6} fill={ACCENT} />
        <circle cx={140} cy={60} r={6} fill="#10b981" />
        <text x={20} y={108} fontSize={11} fill={INK} style={mono}>
          DaVinci LUT Applied
        </text>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------------- *
 * 6. Motion Ads Drawing                                                     *
 * ------------------------------------------------------------------------- */
function MotionAdsDraw({ t }: { t: number }) {
  const timeline = inOut(prog(t, 0.2, 1.8));
  const shapes = inOut(prog(t, 1.6, 3.4));
  const bounce = prog(t, 3.2, 5.0);
  const textAnim = inOut(prog(t, 4.8, 6.4));
  const social = inOut(prog(t, 6.2, 8.0));

  // Dynamic animated transforms
  const rotateVal = (t * 120) % 360;
  const bounceY = Math.abs(Math.sin(t * 3)) * 40;

  return (
    <g opacity={fade(t, 9)}>
      {/* 9:16 Vertical Video Frame (Reels / TikTok / Shorts) */}
      <rect x={180} y={60} width={240} height={420} rx={24} fill="#fff" {...line} strokeWidth={3} />
      <line x1={260} y1={80} x2={340} y2={80} {...line} strokeWidth={3} strokeOpacity={0.4} />

      {/* Motion Graphics Elements inside the Phone */}
      <g transform={`translate(300, ${240 - bounceY})`}>
        <rect x={-45} y={-45} width={90} height={90} rx={16} fill={ACCENT} transform={`rotate(${rotateVal})`} />
        <circle r={22} fill="#fff" />
      </g>

      <text x={300} y={350} textAnchor="middle" fontSize={22} fontWeight="bold" fill={INK} style={mono} opacity={textAnim}>
        SALE 50% OFF
      </text>
      <rect x={220} y={380} width={160} height={36} rx={18} fill="#ef4444" opacity={textAnim} />
      <text x={300} y={403} textAnchor="middle" fontSize={13} fontWeight="bold" fill="#fff" style={mono} opacity={textAnim}>
        SWIPE UP ➔
      </text>

      {/* After Effects / Premiere Timeline Editor on Right */}
      <g transform="translate(480, 80)" opacity={timeline}>
        <rect x={0} y={0} width={680} height={240} rx={16} fill="#fff" {...line} strokeWidth={2.5} />
        {/* Top timecode */}
        <text x={30} y={38} fontSize={16} fontWeight="bold" fill={INK} style={mono}>
          00:00:15:24
        </text>
        <line x1={20} y1={55} x2={660} y2={55} {...hair} />

        {/* 3 Video & Audio Tracks */}
        {[75, 125, 175].map((y, i) => (
          <g key={y}>
            <rect x={30} y={y} width={90} height={36} rx={6} fill={INK} fillOpacity={0.08} />
            <text x={45} y={y + 23} fontSize={12} fill={INK} style={mono}>
              {["V2 Motion", "V1 Video", "A1 Audio"][i]}
            </text>
            {/* Timeline clips */}
            <rect x={140} y={y} width={180 + i * 70} height={36} rx={6} fill={i === 0 ? ACCENT : i === 1 ? "#10b981" : "#f59e0b"} fillOpacity={0.7} />
            <rect x={340 + i * 60} y={y} width={140} height={36} rx={6} fill={ACCENT} fillOpacity={0.5} />
          </g>
        ))}

        {/* Playhead Red Needle */}
        <line x1={320} y1={55} x2={320} y2={230} stroke="#ef4444" strokeWidth={3} />
        <polygon points="310,55 330,55 320,68" fill="#ef4444" />
      </g>

      {/* Multi-Platform Viral Export */}
      <g transform="translate(480, 350)" opacity={social}>
        <rect x={0} y={0} width={680} height={120} rx={16} fill="#fff" {...hair} strokeWidth={2} />
        <text x={30} y={35} fontSize={15} fontWeight="bold" fill={INK} style={mono}>
          Cross-Platform Renditions
        </text>
        {["Instagram Reels", "TikTok Feed", "YouTube Shorts", "Meta Sponsored Ads"].map((plat, i) => (
          <g key={plat} transform={`translate(${30 + i * 160}, 55)`}>
            <rect x={0} y={0} width={145} height={44} rx={8} fill={ACCENT} fillOpacity={0.1} stroke={ACCENT} strokeWidth={1.5} />
            <text x={72} y={27} textAnchor="middle" fontSize={11} fontWeight="bold" fill={ACCENT} style={mono}>
              {plat}
            </text>
          </g>
        ))}
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------------- *
 * 7. Poster Designing & Graphics Drawing                                    *
 * ------------------------------------------------------------------------- */
function PosterDesigningDraw({ t }: { t: number }) {
  const canvas = inOut(prog(t, 0.2, 1.8));
  const layout = inOut(prog(t, 1.6, 3.4));
  const printMarks = inOut(prog(t, 3.2, 4.8));
  const colorSpec = inOut(prog(t, 4.6, 6.4));
  const mockups = inOut(prog(t, 6.2, 8.0));

  return (
    <g opacity={fade(t, 9)}>
      {/* Heavy Poster Canvas */}
      <rect x={180} y={50} width={360} height={440} rx={12} fill="#fff" {...line} strokeWidth={3} {...draw(canvas)} />
      {/* Bleed & Crop Marks */}
      <g opacity={printMarks}>
        <line x1={150} y1={50} x2={175} y2={50} {...hair} />
        <line x1={180} y1={25} x2={180} y2={45} {...hair} />
        <line x1={545} y1={50} x2={570} y2={50} {...hair} />
        <line x1={540} y1={25} x2={540} y2={45} {...hair} />
        <line x1={150} y1={490} x2={175} y2={490} {...hair} />
        <line x1={180} y1={495} x2={180} y2={515} {...hair} />
        <line x1={545} y1={490} x2={570} y2={490} {...hair} />
        <line x1={540} y1={495} x2={540} y2={515} {...hair} />
      </g>

      {/* Poster Visual Design Elements */}
      <g opacity={layout}>
        {/* Bold Headline */}
        <text x={215} y={115} fontSize={38} fontWeight="900" fill={INK}>
          MUSIC FEST
        </text>
        <text x={218} y={145} fontSize={16} fontWeight="bold" fill={ACCENT} style={mono}>
          SUMMER 2026 // LIVE
        </text>
        {/* Central Graphic Hero Illustration */}
        <rect x={215} y={170} width={290} height={190} rx={16} fill={ACCENT} fillOpacity={0.12} stroke={ACCENT} strokeWidth={2} />
        <circle cx={360} cy={265} r={65} fill={ACCENT} />
        <path d="M250 340Q360 220 470 340" fill="none" stroke="#fff" strokeWidth={6} />
        {/* Event Details / Grid Text */}
        <path d="M215 390h290M215 410h240M215 430h180" {...hair} strokeWidth={2} />
        <rect x={440} y={420} width={65} height={50} fill={INK} rx={4} />
      </g>

      {/* Print Specs & CMYK Color Separation on Right */}
      <g transform="translate(620, 80)" opacity={colorSpec}>
        <rect x={0} y={0} width={520} height={210} rx={16} fill="#fff" {...line} strokeWidth={2.5} />
        <text x={30} y={40} fontSize={18} fontWeight="bold" fill={INK} style={mono}>
          300 DPI CMYK Print Press Ready
        </text>
        <line x1={20} y1={60} x2={500} y2={60} {...hair} />

        {/* 4 CMYK Bars */}
        {[
          { name: "Cyan", c: "#06b6d4" },
          { name: "Magenta", c: "#ec4899" },
          { name: "Yellow", c: "#eab308" },
          { name: "Key Black", c: "#0f172a" },
        ].map((ink, i) => (
          <g key={ink.name} transform={`translate(${30 + i * 120}, 85)`}>
            <rect x={0} y={0} width={90} height={60} rx={8} fill={ink.c} />
            <text x={45} y={85} textAnchor="middle" fontSize={12} fontWeight="bold" fill={INK} style={mono}>
              {ink.name}
            </text>
          </g>
        ))}
      </g>

      {/* Billboards & Street Mockups */}
      <g transform="translate(620, 320)" opacity={mockups}>
        <rect x={0} y={0} width={520} height={160} rx={16} fill="#fff" {...hair} strokeWidth={2} />
        <text x={30} y={35} fontSize={15} fontWeight="bold" fill={INK} style={mono}>
          Billboard & Subway City Mockup
        </text>
        <rect x={30} y={55} width={210} height={85} rx={8} fill={ACCENT} fillOpacity={0.15} stroke={ACCENT} strokeWidth={2} />
        <rect x={265} y={55} width={220} height={85} rx={8} fill={INK} fillOpacity={0.08} stroke={INK} strokeWidth={2} />
        <text x={135} y={105} textAnchor="middle" fontSize={13} fill={ACCENT} fontWeight="bold" style={mono}>
          A1 Poster Size
        </text>
        <text x={375} y={105} textAnchor="middle" fontSize={13} fill={INK} fontWeight="bold" style={mono}>
          Outdoor Billboard
        </text>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------------- *
 * 8. Brand Strategy Drawing                                                 *
 * ------------------------------------------------------------------------- */
const STRAT_AXES: [label: string, x: number, y: number, anchor: "start" | "middle" | "end"][] = [
  ["Premium", 280, 84, "middle"],
  ["Budget", 280, 420, "middle"],
  ["Commodity", 110, 256, "start"],
  ["Category Leader", 460, 256, "end"],
];
function BrandStrategyDraw({ t }: { t: number }) {
  const map = inOut(prog(t, 0.2, 1.8));
  const rivals = prog(t, 1.6, 2.8);
  const youSpot = inOut(prog(t, 2.5, 4.0));
  const pyramid = inOut(prog(t, 3.8, 5.8));
  const moat = inOut(prog(t, 5.5, 7.5));

  return (
    <g opacity={fade(t, 9)}>
      {/* Market Positioning Matrix */}
      <rect x={280} y={100} width={180} height={150} fill={ACCENT} fillOpacity={0.08 * youSpot} />
      <line x1={120} y1={250} x2={460} y2={250} {...hair} strokeWidth={2.5} {...draw(map)} />
      <line x1={280} y1={410} x2={280} y2={90} {...hair} strokeWidth={2.5} {...draw(map)} />

      {STRAT_AXES.map(([label, x, y, anchor]) => (
        <text key={label} x={x} y={y} textAnchor={anchor} fontSize={16} fill={INK} fillOpacity={0.5} style={mono}>
          {label}
        </text>
      ))}

      {/* Competitor Scatter */}
      {[
        [180, 160],
        [220, 200],
        [160, 320],
        [230, 350],
        [210, 280],
        [320, 340],
        [350, 300],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={7} fill={INK} opacity={0.3 * prog(rivals, i * 0.1, 0.4 + i * 0.1)} />
      ))}

      {/* Your Uncontested Blue Ocean Spot */}
      {youSpot > 0 && (
        <g transform="translate(370, 160)" opacity={youSpot}>
          <circle cx={0} cy={0} r={28} fill="none" stroke={ACCENT} strokeWidth={2} strokeDasharray="4 6" />
          <circle cx={0} cy={0} r={12} fill={ACCENT} />
          <text x={38} y={6} fontSize={18} fontWeight="bold" fill={ACCENT} style={mono}>
            XyvorA Brand Moat
          </text>
        </g>
      )}

      {/* Brand Pyramid Hierarchy on Right */}
      <g transform="translate(620, 90)" opacity={pyramid}>
        <text x={30} y={30} fontSize={20} fontWeight="bold" fill={INK} style={mono}>
          Brand Architecture Pyramid
        </text>

        {/* Tier 1: Purpose & Mission */}
        <polygon points="260,60 170,140 350,140" fill={ACCENT} fillOpacity={0.9} stroke="#fff" strokeWidth={2} />
        <text x={260} y={115} textAnchor="middle" fontSize={14} fontWeight="bold" fill="#fff" style={mono}>
          Core Purpose
        </text>

        {/* Tier 2: Value Proposition */}
        <polygon points="170,145 100,230 420,230 350,145" fill={ACCENT} fillOpacity={0.6} stroke="#fff" strokeWidth={2} />
        <text x={260} y={195} textAnchor="middle" fontSize={14} fontWeight="bold" fill="#fff" style={mono}>
          Unique Value Proposition
        </text>

        {/* Tier 3: Visual & Verbal Tone */}
        <polygon points="100,235 30,340 490,340 420,235" fill={ACCENT} fillOpacity={0.25} stroke="#fff" strokeWidth={2} />
        <text x={260} y={295} textAnchor="middle" fontSize={14} fontWeight="bold" fill={INK} style={mono}>
          Tone of Voice & Brand Moat
        </text>
      </g>

      {/* Long Term Growth Metrics */}
      <g transform="translate(620, 430)" opacity={moat}>
        {["3x Brand Equity", "92% Retention", "Zero Ad Fatigue"].map((stat, i) => (
          <g key={stat} transform={`translate(${i * 180}, 0)`}>
            <rect x={0} y={0} width={160} height={42} rx={10} fill="#fff" {...hair} strokeWidth={2} />
            <text x={80} y={26} textAnchor="middle" fontSize={12} fontWeight="bold" fill={INK} style={mono}>
              {stat}
            </text>
          </g>
        ))}
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------------- *
 * Scenes Dictionary with 8 distinct services                               *
 * ------------------------------------------------------------------------- */
const scenes: Record<string, Scene> = {
  "website-designing": {
    loop: 9,
    still: 8.2,
    Draw: WebsiteDesigningDraw,
    steps: [
      [0, 1.8, "Modern UI/UX Wireframe"],
      [1.8, 3.2, "Responsive Breakpoints"],
      [3.2, 4.8, "Mobile First Adaptation"],
      [4.8, 6.2, "Performance & 100 SEO"],
      [6.2, 7.5, "Custom CMS & Backend"],
      [7.5, 9.0, "Conversion Optimization"],
    ],
  },
  "app-development": {
    loop: 9,
    still: 8.2,
    Draw: AppDevelopmentDraw,
    steps: [
      [0, 1.8, "iOS & Android Architecture"],
      [1.8, 3.5, "Cross-Platform Flutter/React"],
      [3.5, 5.0, "Cloud Backend & API Integration"],
      [5.0, 6.5, "Offline Sync & Realtime Data"],
      [6.5, 7.8, "Push Notifications & Analytics"],
      [7.8, 9.0, "App Store & Play Store Launch"],
    ],
  },
  "ui-ux-design": {
    loop: 9,
    still: 8.2,
    Draw: UiUxDesignDraw,
    steps: [
      [0, 1.8, "User Research & Information Architecture"],
      [1.8, 3.4, "High-Fidelity Figma Wireframes"],
      [3.4, 4.8, "Interactive Prototypes"],
      [4.8, 6.4, "Comprehensive Design Systems"],
      [6.4, 7.8, "Micro-Animations & Motion Design"],
      [7.8, 9.0, "Developer-Ready Component Handoff"],
    ],
  },
  "logo-designing": {
    loop: 9,
    still: 8.2,
    Draw: LogoDesigningDraw,
    steps: [
      [0, 1.8, "Golden Ratio Geometry"],
      [1.8, 3.4, "Iconic Vector Emblem"],
      [3.4, 4.8, "Custom Typography Lockup"],
      [4.8, 6.2, "Brand Color Palettes"],
      [6.2, 7.6, "Scalable Multi-Format Assets"],
      [7.6, 9.0, "Full Brand Style Guide"],
    ],
  },
  "ad-shooting": {
    loop: 9,
    still: 8.2,
    Draw: AdShootingDraw,
    steps: [
      [0, 1.8, "4K Cinema Camera Rigging"],
      [1.8, 3.4, "Studio Lighting & Sound Design"],
      [3.4, 4.8, "Product & Lifestyle Cinematography"],
      [4.8, 6.2, "Commercial Direction"],
      [6.2, 7.6, "DaVinci Color Grading"],
      [7.6, 9.0, "High-Resolution Export"],
    ],
  },
  "motion-ads": {
    loop: 9,
    still: 8.2,
    Draw: MotionAdsDraw,
    steps: [
      [0, 1.8, "Storyboarding & Dynamic Concept"],
      [1.8, 3.4, "Kinetic Typography & 2D/3D Motion"],
      [3.4, 4.8, "Viral 9:16 Hooks (Reels & TikTok)"],
      [4.8, 6.2, "Sound FX & Voiceover Sync"],
      [6.2, 7.6, "Multi-Platform Aspect Ratios"],
      [7.6, 9.0, "High-Click-Through Ad Delivery"],
    ],
  },
  "poster-designing": {
    loop: 9,
    still: 8.2,
    Draw: PosterDesigningDraw,
    steps: [
      [0, 1.8, "Visual Hierarchy & Poster Layout"],
      [1.8, 3.4, "Scroll-Stopping Digital Graphics"],
      [3.4, 4.8, "300 DPI CMYK Print Press Ready"],
      [4.8, 6.2, "Event & Product Key Art"],
      [6.2, 7.6, "Billboard & Street Mockups"],
      [7.6, 9.0, "Print & Social Formats"],
    ],
  },
  "brand-strategy": {
    loop: 9,
    still: 8.2,
    Draw: BrandStrategyDraw,
    steps: [
      [0, 1.8, "Market & Competitor Analysis"],
      [1.8, 3.4, "Uncontested Market Positioning"],
      [3.4, 4.8, "Target Audience Archetypes"],
      [4.8, 6.2, "Brand Architecture & Storytelling"],
      [6.2, 7.6, "Omnichannel Growth Roadmap"],
      [7.6, 9.0, "Long-Term Value Creation"],
    ],
  },
};

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const m = window.matchMedia(REDUCED);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

type Props = {
  id: string;
  title: string;
  onStep?: (capability: string | undefined) => void;
};

function ServiceAnimation({ id, title, onStep }: Props) {
  const scene = scenes[id];
  const svg = useRef<SVGSVGElement>(null);
  const [clock, setClock] = useState(0);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const loop = scene?.loop ?? 1;

  useEffect(() => {
    const el = svg.current;
    if (!el || reduced) return;
    let raf = 0;
    let last = 0;
    let elapsed = 0;
    const tick = (now: number) => {
      if (last) elapsed += Math.min(0.1, (now - last) / 1000);
      last = now;
      setClock(elapsed % loop);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced, loop]);

  const t = reduced ? (scene?.still ?? 0) : clock;
  const step = scene?.steps.find(([a, b]) => t >= a && t < b)?.[2];

  useEffect(() => {
    onStep?.(step);
  }, [step, onStep]);

  if (!scene) return null;
  const { Draw, steps } = scene;

  return (
    <svg ref={svg} viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={title}>
      <Draw t={t} />
      {steps.map(([a, b, name]) => {
        const o = prog(t, a, a + 0.3) * (1 - prog(t, b - 0.3, b));
        return o > 0 ? (
          <text key={name} x={90} y={514 + (1 - o) * 8} fontSize={22} fill={INK} fillOpacity={0.6} opacity={o} style={mono}>
            {name}
          </text>
        ) : null;
      })}
    </svg>
  );
}

export type Service = {
  id: string;
  title: string;
  text: string;
  capabilities: string[];
  bg?: string;
};

export const defaultServices: Service[] = [
  {
    id: "website-designing",
    title: "Website Designing",
    text: "Custom, responsive websites built to convert visitors into customers. Fast, accessible, SEO-optimized, and visually stunning across every screen and device.",
    capabilities: [
      "Modern UI/UX Wireframe",
      "Responsive Breakpoints",
      "Mobile First Adaptation",
      "Performance & 100 SEO",
      "Custom CMS & Backend",
      "Conversion Optimization",
    ],
    bg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "app-development",
    title: "App Development",
    text: "High-performance, intuitive mobile applications for iOS and Android. Engineered with clean architecture, smooth native animations, offline sync, and secure backends.",
    capabilities: [
      "iOS & Android Architecture",
      "Cross-Platform Flutter/React",
      "Cloud Backend & API Integration",
      "Offline Sync & Realtime Data",
      "Push Notifications & Analytics",
      "App Store & Play Store Launch",
    ],
    bg: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    text: "User-centered design solutions that enhance engagement and deliver seamless experiences. Complete design systems, interactive Figma prototypes, and friction-free user flows.",
    capabilities: [
      "User Research & Information Architecture",
      "High-Fidelity Figma Wireframes",
      "Interactive Prototypes",
      "Comprehensive Design Systems",
      "Micro-Animations & Motion Design",
      "Developer-Ready Component Handoff",
    ],
    bg: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "logo-designing",
    title: "Logo Designing",
    text: "Memorable brand marks that capture your business identity and leave a lasting impression. Handcrafted with golden ratio geometry, bespoke typography, and full brand guidelines.",
    capabilities: [
      "Golden Ratio Geometry",
      "Iconic Vector Emblem",
      "Custom Typography Lockup",
      "Brand Color Palettes",
      "Scalable Multi-Format Assets",
      "Full Brand Style Guide",
    ],
    bg: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "ad-shooting",
    title: "Ad Shooting & Videography",
    text: "Professional product & brand photography and videography for your marketing campaigns. Directed with cinema-grade 4K equipment, studio lighting, and color grading.",
    capabilities: [
      "4K Cinema Camera Rigging",
      "Studio Lighting & Sound Design",
      "Product & Lifestyle Cinematography",
      "Commercial Direction",
      "DaVinci Color Grading",
      "High-Resolution Export",
    ],
    bg: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "motion-ads",
    title: "Motion Ads",
    text: "Eye-catching animated video ads optimized for social media and digital platforms. Scroll-stopping 9:16 viral hooks, kinetic typography, and high-conversion commercial animations.",
    capabilities: [
      "Storyboarding & Dynamic Concept",
      "Kinetic Typography & 2D/3D Motion",
      "Viral 9:16 Hooks (Reels & TikTok)",
      "Sound FX & Voiceover Sync",
      "Multi-Platform Aspect Ratios",
      "High-Click-Through Ad Delivery",
    ],
    bg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "poster-designing",
    title: "Poster Designing",
    text: "Bold, scroll-stopping graphic designs for digital promotion and print marketing. High-impact visual hierarchy, press-ready CMYK formats, and city-scale billboard renditions.",
    capabilities: [
      "Visual Hierarchy & Poster Layout",
      "Scroll-Stopping Digital Graphics",
      "300 DPI CMYK Print Press Ready",
      "Event & Product Key Art",
      "Billboard & Street Mockups",
      "Print & Social Formats",
    ],
    bg: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    text: "Comprehensive brand positioning and visual identity systems for long-term growth. Uncontested market moats, audience archetypes, and omnichannel storytelling.",
    capabilities: [
      "Market & Competitor Analysis",
      "Uncontested Market Positioning",
      "Target Audience Archetypes",
      "Brand Architecture & Storytelling",
      "Omnichannel Growth Roadmap",
      "Long-Term Value Creation",
    ],
    bg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
  },
];

const FALLBACK_BG = "linear-gradient(180deg, #0b0f4a 0%, #2d5fc4 45%, #7fa6dd 70%, #e9ecf3 100%)";

const panelClass =
  "sticky top-0 mx-auto grid min-h-screen w-full max-w-[104.5rem] origin-top content-center items-center px-3 py-4 sm:px-6 md:px-9 lg:grid-cols-2 lg:px-8 lg:py-16";

const capabilityClass =
  "relative flex items-center lg:items-baseline gap-2 rounded-lg bg-[#d3e3f6] px-2.5 py-2 sm:px-3 sm:py-2.5 transition-colors duration-500 before:bg-[#16253f] before:size-1.5 sm:before:size-2 before:shrink-0 before:rounded-full";

const activeCapabilityClass = "bg-[#b9d8f9] before:bg-[#3b81e3] ring-1 ring-[#3b81e3]/30";

export type ServicesStackProps = {
  services?: Service[];
  eyebrow?: string;
  className?: string;
  onBook?: (serviceTitle: string) => void;
};

export function ServicesStack({ 
  services = defaultServices, 
  eyebrow = "Under one roof, XyvorA offers", 
  className,
  onBook 
}: ServicesStackProps) {
  const root = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const panels = Array.from(el.querySelectorAll<HTMLElement>("[data-panel]"));
    let raf = 0;
    const fit = () => {
      const vh = window.innerHeight;
      panels.forEach((panel) => {
        panel.style.top = `${Math.min(0, vh - panel.offsetHeight)}px`;
      });
    };
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      let idx = 0;
      panels.forEach((panel, i) => {
        if (panel.getBoundingClientRect().top <= vh * 0.5) idx = i;
        const next = panels[i + 1];
        const card = cards.current[i];
        if (!card) return;
        const covered = next ? Math.min(1, Math.max(0, 1 - next.getBoundingClientRect().top / vh)) : 0;
        card.style.opacity = String(Math.max(0, 1 - covered * 1.4));
        card.style.transform = `scale(${1 - covered * 0.06}) translateY(${-covered * 40}px)`;
      });
      setActive(idx);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      fit();
      schedule();
    };
    fit();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [services.length]);

  return (
    <section ref={root} className={cn("relative isolate w-full text-[#16253f] px-2 sm:px-4 md:px-6 lg:px-9", className)}>
      {services.map((s, i) => (
        <div key={s.id} data-panel className={panelClass}>
          {/* Card container */}
          <div
            className="mx-auto w-full max-w-[28rem] sm:max-w-[34rem] md:max-w-[38rem] lg:col-start-2 lg:mx-0 lg:max-w-[42.5rem]"
            ref={(el) => {
              cards.current[i] = el;
            }}
            style={{ transformOrigin: "top center", willChange: "transform, opacity" }}
          >
            {/* Visible title on mobile / tablet */}
            <div className="mb-3 block lg:hidden text-center sm:text-left">
              <span className="block text-xs font-semibold uppercase tracking-wider text-white/70">{eyebrow}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">{s.title}</h2>
            </div>

            <h2 className="sr-only lg:not-sr-only lg:sr-only">
              <span className="block text-white/50">{eyebrow}</span>
              <span className="block">{s.title}</span>
            </h2>
            <div className="mt-1 sm:mt-2 lg:mt-0">
              <ServiceCard service={s} onBook={onBook} />
            </div>
          </div>
        </div>
      ))}

      {/* Sticky background: left-hand titles + cross-fading photos + grain */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="sticky top-0 grid h-screen w-full overflow-hidden py-12 lg:py-20">
          <div className="mx-auto hidden w-full max-w-[104.5rem] grid-cols-12 px-6 lg:px-9 text-[clamp(1.75rem,0.5263vi+1.6184rem,2.5rem)] leading-[1.15] font-bold tracking-tight text-white lg:grid">
            <div className="col-span-5 flex h-full flex-col">
              <div className="flex h-1/2 flex-col justify-end">
                <span className="text-xs uppercase tracking-widest text-[#93c5fd] font-semibold mb-2">Our Capabilities</span>
                <h2 className="text-white/60 font-medium">{eyebrow}</h2>
              </div>
              <div className="relative h-1/2 mt-4">
                {services.map((s, i) => (
                  <span key={s.id} className={cn("absolute inset-0 transition duration-500", i !== active && "translate-y-8 opacity-0")}>
                    {s.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="ss-grain absolute inset-0 -z-10 overflow-hidden" />
          {services.map((s, i) =>
            s.bg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={s.id}
                alt=""
                loading="lazy"
                width={1920}
                height={1112}
                src={s.bg}
                className={cn("absolute inset-0 -z-20 h-screen w-full object-cover transition-opacity duration-1000", i !== active && "opacity-0")}
              />
            ) : (
              <div
                key={s.id}
                className={cn("absolute inset-0 -z-20 transition-opacity duration-1000", i !== active && "opacity-0")}
                style={{ background: FALLBACK_BG }}
              />
            ),
          )}
          {/* Subtle dark gradient overlay to ensure contrast on mobile and desktop */}
          <div className="absolute inset-0 -z-10 bg-black/40 lg:bg-transparent" />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service: s, onBook }: { service: Service; onBook?: (serviceTitle: string) => void }) {
  const [step, setStep] = useState<string>();
  return (
    <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#e3e8f4] to-[#f8f9fc] p-3 sm:p-5 lg:p-6 shadow-2xl border border-white/20">
      {/* Animation wrapper with fluid aspect ratio */}
      <div className="px-1 sm:px-4 lg:px-6">
        <ServiceAnimation id={s.id} title={`${s.title}: ${s.capabilities.join(", ")}`} onStep={setStep} />
      </div>
      <div className="px-2 pt-4 pb-2 sm:px-4 sm:pt-6 sm:pb-4 lg:px-6 lg:pt-8">
        <p className="text-sm sm:text-base lg:text-[1.125rem] leading-snug sm:leading-normal tracking-[0.005em] text-[#16253f] font-normal">
          {s.text}
        </p>
        <p
          id={`service-list-title-${s.id}`}
          className="mt-5 sm:mt-7 lg:mt-8 text-[0.625rem] sm:text-[0.6875rem] leading-tight font-bold tracking-[0.055rem] text-[#16253f]/75 uppercase"
          style={{ fontFamily: MONO_FONT }}
        >
          What that covers
        </p>
        <ul
          className="mt-2.5 sm:mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[0.8125rem] sm:text-[0.875rem] leading-tight"
          aria-labelledby={`service-list-title-${s.id}`}
        >
          {s.capabilities.map((c) => (
            <li key={c} className={cn(capabilityClass, c === step && activeCapabilityClass)}>
              <span className="truncate">{c}</span>
            </li>
          ))}
        </ul>

        {onBook && (
          <div className="mt-5 sm:mt-7 pt-3 sm:pt-4 border-t border-[#16253f]/10 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onBook(s.title)}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-[#3b81e3] text-white text-xs sm:text-sm font-semibold hover:bg-[#2b6fcb] active:scale-[0.98] transition-all cursor-pointer shadow-md"
            >
              <span>Book this Service</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <span className="text-[0.6875rem] sm:text-xs text-[#16253f]/60 font-mono">
              XyvorA Suite
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicesStack;

