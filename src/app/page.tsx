import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Refreshment from "@/components/Refreshment";
import Botanicals from "@/components/Botanicals";
import ChooseBloom from "@/components/ChooseBloom";
import Ritual from "@/components/Ritual";
import Testimonial from "@/components/Testimonial";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Refreshment />
        <Botanicals />
        <ChooseBloom />
        <Ritual />
        <Testimonial />
        <FinalCta />
      </main>
    </>
  );
}
