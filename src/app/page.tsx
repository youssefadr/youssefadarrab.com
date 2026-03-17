import { getAllBlogPosts } from "@/lib/content";
import Link from "next/link";
import AsciiPortrait from "@/components/AsciiPortrait";
import TerminalText from "@/components/TerminalText";
import Nav from "@/components/Nav";
import ToggleSection from "@/components/ToggleSection";

export default function Home() {
  const blogPosts = getAllBlogPosts();

  return (
    <div className="container">
      <Nav />
      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-centered">
          <div className="hero-portrait">
            <AsciiPortrait src="/images/profile.png" cols={150} />
          </div>
          <h1 className="hero-pixel-name">Youssef Adarrab</h1>
          <TerminalText
            lines={[
              "Software Engineer · Backend, Ops & ML",
              "Building backend systems and ML infra in Paris.",
              "I write here about things I find interesting.",
            ]}
            className="hero-terminal"
            typingSpeed={30}
            lineDelay={500}
            startDelay={800}
          />
          <div className="socials">
            <a href="https://github.com/youssefadarrab" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://x.com/polymathXY" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://youtube.com/@Polyousmath" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://linkedin.com/in/youssef-adarrab" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:youssef.adarrab@centralesupelec-alumni.com">Email</a>
          </div>
        </div>
      </div>


      {/* ── BLOG ── */}
      <ToggleSection id="blog" label="Blog">
        {blogPosts.length > 0 && (
          <>
            {blogPosts.map((post) => (
              <div key={post.slug} className="article-item">
                <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                <p className="article-date">{post.date}</p>
                <p className="article-desc">{post.description}</p>
                <div className="article-tags">
                  {post.tags.map((t) => (
                    <span key={t} className="article-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        <div className="coming-soon">More articles coming soon...</div>
      </ToggleSection>

      {/* ── EXPERIENCE ── */}
      <ToggleSection id="experience" label="Experience">
        <div className="timeline">
          <div className="tl-item tl-now">
            <img src="/images/logos/monk.jpeg" alt="Monk AI" className="tl-logo" />
            <div className="tl-content">
              <div className="tl-sub">
                <p className="tl-date">2024 — present</p>
                <h3>Software Engineer — Backend, Ops &amp; ML</h3>
                <p>Backend infrastructure and operational systems.</p>
              </div>
              <div className="tl-sub">
                <p className="tl-date">2023 — 2024</p>
                <h3>ML Engineer / Backend Engineer</h3>
                <p>ML pipelines and backend systems.</p>
              </div>
              <div className="tl-sub">
                <p className="tl-date">2022 — 2023</p>
                <h3>Research Intern — Deep Learning</h3>
                <p>Generative models and synthetic data.</p>
              </div>
              <p className="tl-org">Monk AI &middot; Paris</p>
            </div>
          </div>

          <div className="tl-item">
            <img src="/images/logos/nt3awnou.webp" alt="Nt3awnou" className="tl-logo" />
            <div className="tl-content">
              <p className="tl-date">2023</p>
              <h3>Tech Volunteer</h3>
              <p className="tl-org">Nt3awnou &middot; Morocco</p>
              <p>Humanitarian relief tools after the Morocco earthquake.</p>
            </div>
          </div>

          <div className="tl-item">
            <img src="/images/logos/xhec.jpeg" alt="X-HEC" className="tl-logo" />
            <div className="tl-content">
              <p className="tl-date">2023</p>
              <h3>Guest Lecturer</h3>
              <p className="tl-org">X-HEC Masters &middot; Paris</p>
              <p>Applied machine learning.</p>
            </div>
          </div>

          <div className="tl-item">
            <img src="/images/logos/sondra.jpeg" alt="SONDRA" className="tl-logo" />
            <div className="tl-content">
              <p className="tl-date">2021 — 2022</p>
              <h3>Research Assistant</h3>
              <p className="tl-org">SONDRA Lab &middot; CentraleSup&eacute;lec</p>
              <p>Signal processing and machine learning research.</p>
            </div>
          </div>

          <div className="tl-item">
            <img src="/images/logos/nplusone.jpeg" alt="N+ONE" className="tl-logo" />
            <div className="tl-content">
              <p className="tl-date">2020 — 2021</p>
              <h3>Data Center Engineer</h3>
              <p className="tl-org">N+ONE Datacenters &middot; Paris</p>
              <p>Infrastructure and operations.</p>
            </div>
          </div>
        </div>
      </ToggleSection>

      {/* ── EDUCATION ── */}
      <ToggleSection id="education" label="Education">
        <div className="timeline">
          <div className="tl-item">
            <img src="/images/logos/centralesupelec.jpeg" alt="CentraleSupélec" className="tl-logo" />
            <div className="tl-content">
              <p className="tl-date">2021 — 2022</p>
              <h3>CentraleSup&eacute;lec</h3>
              <p className="tl-org">Paris-Saclay</p>
              <p>Applied Mathematics, Computer Science, AI.</p>
            </div>
          </div>

          <div className="tl-item">
            <img src="/images/logos/eigsi.jpeg" alt="EIGSI" className="tl-logo" />
            <div className="tl-content">
              <p className="tl-date">2018 — 2021</p>
              <h3>EIGSI</h3>
              <p className="tl-org">Casablanca</p>
              <p>Engineering.</p>
            </div>
          </div>
        </div>
      </ToggleSection>


      {/* ── PUBLICATIONS ── */}
      <ToggleSection id="publications" label="Publications">
        <div className="pub-grid">
          <div className="pub">
            <h3>No Village Left Behind: A Moroccan Data-driven Platform for Effective Aid Coordination</h3>
            <p className="pub-meta">
              A. Bounhar, A. Anouzla, A. Lekssays, A. Zizaan,
              B. Chourane, F.Z. Qachfar, H. Ouifak, I. Momayiz,
              L. Ben Allal, M. Razzouqi, M. Jebrane, M. Ajeghrir,
              N. Hatibi, N. Tazi, S. Messoudi, Y. Bendou,
              Y. Adarrab
            </p>
            <p className="pub-meta">NeurIPS 2023 &middot; North Africans in ML Workshop</p>
            <p>
              Following the catastrophic earthquake that hit Morocco in September 2023,
              our platform emerged to optimize relief coordination, efficiently orchestrating
              resources to aid those in need. This paper presents the various techniques used
              to collect and process requests and interventions into a clean and actionable
              dataset, enabling authorities and fellow NGOs to efficiently extend aid to the
              affected areas.
            </p>
            <div className="pub-embed">
              <iframe src="/images/neurips-poster.pdf" title="NeurIPS 2023 Poster" />
            </div>
          </div>

          <div className="pub">
            <h3>Deep Learning for the Super Resolution of SAR Images</h3>
            <p className="pub-meta">
              Y. Adarrab, D. Colombo, A. Daly, I. Hinostroza, C. Ren, J. Fix
            </p>
            <p className="pub-meta">SONDRA Lab &middot; CentraleSup&eacute;lec &middot; 2022</p>
            <p>
              In this study, we are interested in Synthetic Aperture Radar (SAR) data,
              in particular those captured during campaigns carried out by unmanned aircraft.
              SAR data is captured by a radar antenna placed underneath either an aircraft or
              a satellite and pointing to the sides. Our work considered horizontally polarised
              transmitting and measuring antenna (HH). From these measurements, one can detect
              ground movements, objects or buildings, segregate land use, etc. In contrast to
              optical measurements, SAR data can be captured day and night and can penetrate
              cloud layers. However, the quality of object detection or segmentation is dependent
              on the frequency of the chirp and this study investigates the ability to infer high
              resolution SAR images from low resolution ones.
            </p>
            <div className="pub-embed">
              <iframe src="/images/sondra-poster.pdf" title="SONDRA SAR Poster" />
            </div>
          </div>
        </div>
      </ToggleSection>

      <div className="footer">&copy; {new Date().getFullYear()} Youssef Adarrab</div>
    </div>
  );
}
