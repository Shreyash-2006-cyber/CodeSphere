import Avatar from "../../../shared/components/Avatar";

export default function TestimonialsSection({ testimonials }) {
  return (
    <section className="hm-section hm-testimonials" id="testimonials">
      <div className="container">
        <div className="hm-section-head">
          <h2>Loved by developers everywhere</h2>
          <p>A few words from people building consistent habits with CodeSphere.</p>
        </div>
        <div className="hm-testimonials-grid">
          {testimonials.map((t) => (
            <div className="hm-testimonial-card" key={t.id}>
              <p>"{t.quote}"</p>
              <div className="hm-testimonial-author">
                <Avatar name={t.name} size={36} />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
