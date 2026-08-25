import "./alfa.css";

import { ScrollFX } from "@/components/alfa/scroll-fx";
import { Grain } from "@/components/alfa/grain";
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

export default function Home() {
  return (
    <div id="alfa-root" className="relative min-w-0 [overflow-x:clip]">
      <ScrollFX />
      <Grain />
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
