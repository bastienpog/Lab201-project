import OpenGate from "@/components/OpenGate";
import PublicConcertList from "@/components/PublicConcertList";

const IndexPage: React.FC = () => {
  return (
    <div className="custom-cursor">
      <OpenGate />
      <PublicConcertList concerts={[]} />
    </div>
  );
};

export default IndexPage;
