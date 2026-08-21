import "./alfa.css";

import { ScrollFX } from "@/components/alfa/scroll-fx";
import { SiteHeader } from "@/components/alfa/site-header";
import { Hero } from "@/components/alfa/hero";
import { StatStrip } from "@/components/alfa/stat-strip";
import { About } from "@/components/alfa/about";
import { MissionVision } from "@/components/alfa/mission-vision";
import { Values } from "@/components/alfa/values";
import { Programs } from "@/components/alfa/programs";
import { Cohorts } from "@/components/alfa/cohorts";
import { Blog } from "@/components/alfa/blog";
import { Admission } from "@/components/alfa/admission";
import { SiteFooter } from "@/components/alfa/site-footer";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Home() {
  return (
    <div id="alfa-root" className="relative min-w-0 [overflow-x:clip]">
      <ScrollFX />
      <div
        data-grain
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 60,
          opacity: 0.05,
          mixBlendMode: "overlay",
          backgroundImage: GRAIN,
        }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <StatStrip />
        <About />
        <MissionVision />
        <Values />
        <Programs />
        <Cohorts />
        <Blog />
        <Admission />
      </main>
      <SiteFooter />
    </div>
  );
}
