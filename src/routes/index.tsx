import { createFileRoute } from "@tanstack/react-router";

import {
  About,
  Amc,
  Contact,
  Faq,
  Footer,
  Hero,
  Industries,
  Navbar,
  Partners,
  Process,
  Products,
  ScrollProgress,
  Services,
  Solutions,
  Testimonials,
  WhyUs,
} from "@/components/site/sections";
import { GsapFx } from "@/components/site/gsap-fx";

const title = "Bharat Strategic Solution | Reliable IT Infrastructure";
const description =
  "IT hardware supply, networking, servers, AMC and enterprise infrastructure support across India — engineered for uptime and growth.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <GsapFx />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Solutions />
        <WhyUs />
        <Products />
        <Industries />
        <Amc />
        <Process />
        <Partners />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
