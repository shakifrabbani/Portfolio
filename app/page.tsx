import { About } from "@/sections/About";
import { CaseStudy } from "@/sections/CaseStudy";
import { Contact } from "@/sections/Contact";
import { Experience } from "@/sections/Experience";
import { GitHubActivity } from "@/sections/GitHubActivity";
import { Hero } from "@/sections/Hero";
import { Process } from "@/sections/Process";
import { Projects } from "@/sections/Projects";
import { QuickOverview } from "@/sections/QuickOverview";
import { Skills } from "@/sections/Skills";
import { Strengths } from "@/sections/Strengths";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickOverview />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <CaseStudy />
      <Process />
      <Strengths />
      <GitHubActivity />
      <Contact />
    </>
  );
}
