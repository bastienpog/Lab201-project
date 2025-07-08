import OpenGate from "@/components/OpenGate";
import PublicConcertList from "@/components/PublicConcertList";
import FullWidthEmbed from "@/components/ClipVideo";
import Countdown from "@/components/CountDown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AlbumSection from "@/components/AlbumSection";
import SongList from "@/components/SongList";
import PublicNewsList from "@/components/PublicNewsList";

const IndexPage: React.FC = () => {
  return (
    <div className="bg-black">
      <Header />
      <OpenGate />
      <FullWidthEmbed />
      <SongList />
      <Countdown />
      <AlbumSection />
      <PublicConcertList />
      <PublicNewsList />
      <Footer />
    </div>
  );
};

export default IndexPage;
