import Nav from "@/components/Nav";

export default function ExperiencePage() {
  return (
    <>
      <Nav />
      <main className="page-container" style={{ maxWidth: "720px" }}>
        <div className="page-header">
          <h1 className="page-title">Experience</h1>
        </div>

        {/* Experience */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Work</h2>
          </div>

          <div className="exp-item">
            <div className="exp-top">
              <h3 className="exp-role">Backend & Ops Software Engineer</h3>
              <span className="exp-period">2024 — present</span>
            </div>
            <p className="exp-company">Monk AI &middot; Paris</p>
            <p className="exp-desc">
              Infrastructure, backend systems, and operational tooling
              powering Monk AI&apos;s vehicle inspection platform at scale.
            </p>
          </div>

          <div className="exp-item">
            <div className="exp-top">
              <h3 className="exp-role">ML Engineer / Software Backend Engineer</h3>
              <span className="exp-period">2023 — 2024</span>
            </div>
            <p className="exp-company">Monk AI &middot; Paris</p>
            <p className="exp-desc">
              End-to-end ML pipelines from data collection to production
              inference. Computer vision models for automated vehicle
              damage detection and backend systems serving them.
            </p>
          </div>

          <div className="exp-item">
            <div className="exp-top">
              <h3 className="exp-role">Research Intern — Generative Deep Learning</h3>
              <span className="exp-period">2022 — 2023</span>
            </div>
            <p className="exp-company">Monk AI &middot; Paris</p>
            <p className="exp-desc">
              GANs and semi-supervised learning for synthetic image data
              generation. Generative models to augment training datasets
              for vehicle inspection CV systems.
            </p>
          </div>

          <div className="exp-item">
            <div className="exp-top">
              <h3 className="exp-role">Research Assistant — SONDRA Lab</h3>
              <span className="exp-period">2021 — 2022</span>
            </div>
            <p className="exp-company">CentraleSupélec &middot; Paris-Saclay</p>
            <p className="exp-desc">
              Research in signal processing and machine learning at the
              SONDRA laboratory. Published in SONDRA research proceedings.
            </p>
          </div>

          <div className="exp-item">
            <div className="exp-top">
              <h3 className="exp-role">Guest Lecturer</h3>
              <span className="exp-period">2023</span>
            </div>
            <p className="exp-company">X-HEC Masters &middot; Paris</p>
            <p className="exp-desc">
              Guest lecturer for the X-HEC joint masters program, teaching
              applied machine learning and AI topics to graduate students.
            </p>
          </div>

          <div className="exp-item">
            <div className="exp-top">
              <h3 className="exp-role">Data Center Engineer</h3>
              <span className="exp-period">2020 — 2021</span>
            </div>
            <p className="exp-company">N+ONE Datacenters &middot; Paris</p>
            <p className="exp-desc">
              Infrastructure engineering for data center operations.
              Systems monitoring, capacity planning, and operational
              reliability at scale.
            </p>
          </div>

          <div className="exp-item">
            <div className="exp-top">
              <h3 className="exp-role">Tech Volunteer</h3>
              <span className="exp-period">2023</span>
            </div>
            <p className="exp-company">Nt3awnou &middot; Morocco</p>
            <p className="exp-desc">
              Technical assistance and tool-building for humanitarian
              relief and community support efforts in Morocco following
              the earthquake. Work led to a NeurIPS publication.
            </p>
          </div>
        </section>

        {/* Education */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Education</h2>
          </div>
          <div className="edu-item">
            <h3 className="edu-school">CentraleSupélec</h3>
            <p className="edu-degree">
              ML, Deep Learning, NLP, Computer Vision, RL
            </p>
            <span className="edu-period">2021 — 2022</span>
          </div>
        </section>

        {/* Skills */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Skills</h2>
          </div>
          <div className="pill-grid">
            {[
              "Python", "PyTorch", "Computer Vision", "Deep Learning",
              "NLP", "Reinforcement Learning", "C++", "Backend",
              "MLOps", "Docker", "SQL", "OpenCV", "System Design",
            ].map((s) => (
              <span key={s} className="pill">{s}</span>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Languages</h2>
          </div>
          <div className="pill-grid">
            <span className="pill">French — Native</span>
            <span className="pill">Arabic — Native</span>
            <span className="pill">Tamazight — Native</span>
            <span className="pill">English — Fluent</span>
            <span className="pill">Spanish — Basics</span>
          </div>
        </section>

        <footer className="site-footer">
          &copy; {new Date().getFullYear()} Youssef Adarrab
        </footer>
      </main>
    </>
  );
}
