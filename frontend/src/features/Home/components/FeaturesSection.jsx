import { LuLayers, LuUsers, LuSwords, LuChartLine } from "react-icons/lu";

const ICONS = [LuLayers, LuUsers, LuSwords, LuChartLine];

export default function FeaturesSection({ features }) {
  return (
    <section className="hm-section" id="features">
      <div className="container">
        <div className="hm-section-head">
          <h2>Everything you need to stay consistent</h2>
          <p>Built for developers who want one place to track it all.</p>
        </div>
        <div className="hm-features-grid">
          {features.map((f, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div className="hm-feature-card" key={f.id}>
                <div className="hm-feature-icon"><Icon /></div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
