import SmoothScroll from "@/components/SmoothScroll";
import BgMorph from "@/components/BgMorph";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import ScrollBloom from "@/components/ScrollBloom";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Refreshment from "@/components/Refreshment";
import Botanicals from "@/components/Botanicals";
import ChooseBloom from "@/components/ChooseBloom";
import Marquee from "@/components/Marquee";
import Ritual from "@/components/Ritual";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <BgMorph />
      <Preloader />
      <Cursor />
      <ScrollBloom />
      <Nav />
      <main>
        <Hero />
        <Refreshment />
        <Botanicals />
        <ChooseBloom />
        <Marquee />
        <Ritual />
        <Testimonial />
      </main>
    </>
  );
}
