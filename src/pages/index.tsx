import OpenGate from "@/components/OpenGate";
import PublicConcertList from "@/components/PublicConcertList";
import FullWidthEmbed from "@/components/ClipVideo";

const IndexPage: React.FC = () => {
  return (
    <div className="custom-cursor">
      <OpenGate />
      <FullWidthEmbed />
      <PublicConcertList concerts={[]} />
    </div>
  );
};

export default IndexPage;
