import Complex from "@/components/Complex";
import Contact from "@/components/Contact";
import Development from "@/components/Development";
import FloorPlans from "@/components/FloorPlans";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import MobileBar from "@/components/MobileBar";
import Overview from "@/components/Overview";
import Premium from "@/components/Premium";
import Rental from "@/components/Rental";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Overview />
        <Location />
        <Premium />
        <Development />
        <Complex />
        <FloorPlans />
        <Rental />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
