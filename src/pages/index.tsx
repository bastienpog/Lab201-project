import OpenGate from "@/components/OpenGate";
import PublicConcertList from "@/components/PublicConcertList";
import FullWidthEmbed from "@/components/ClipVideo";
import Countdown from "@/components/CountDown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const IndexPage: React.FC = () => {
  return (
    <div className="custom-cursor bg-black">
      <Header />
      <OpenGate />
      <FullWidthEmbed />
      <Countdown />
      <PublicConcertList concerts={[]} />
      <Footer />
    </div>
  );
};

export default IndexPage;
