import "./Cards.css";
import missionVisionData from "@/data/mission-vision.json";

interface CardsProps {
  mision_texto?: string;
  vision_texto?: string;
}

export default function Cards({ mision_texto, vision_texto }: CardsProps) {
  const { mission, vision } = missionVisionData;

  return (
    <div>
      <div className="cards">
        {/* Misión */}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front mision">
              <h2>{mission.title}</h2>
            </div>
            <div className="flip-card-back">
              <h2>{mission.title}</h2>
              <p className="whitespace-pre-line">{mision_texto || mission.description}</p>
            </div>
          </div>
        </div>

        {/* Visión */}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front vision">
              <h2>{vision.title}</h2>
            </div>
            <div className="flip-card-back">
              <h2>{vision.title}</h2>
              <p className="whitespace-pre-line">{vision_texto || vision.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
