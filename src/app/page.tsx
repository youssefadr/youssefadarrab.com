import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="page-container">
        <section className="hero">
          <h1 className="hero-name">YOUSSEF ADARRAB</h1>
          <p className="hero-title">
            Software Engineer Backend — ML & AI &middot; Paris
          </p>

          <div className="terminal-block">
            <div className="terminal-bar">
              <span className="terminal-dot" style={{ background: "#ff5f57" }} />
              <span className="terminal-dot" style={{ background: "#febc2e" }} />
              <span className="terminal-dot" style={{ background: "#28c840" }} />
              <span className="terminal-bar-label">~</span>
            </div>
            <div className="terminal-body">
              <div>
                <span className="t-prompt">$</span>{" "}
                <span className="t-cmd">cat status.txt</span>
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                Building at <span className="t-gold">Monk AI</span>.
                CentraleSupélec alumnus.
              </div>
              <div>
                From generative DL research to production backend & ops.
              </div>
              <div>
                Ship fast, learn everything.
              </div>
              <div style={{ marginTop: "0.4rem" }}>
                <span className="t-prompt">$</span> <span className="t-cursor" />
              </div>
            </div>
          </div>

          <div className="hero-links" style={{ marginTop: "1.5rem" }}>
            <a href="https://github.com/youssefadarrab" target="_blank" rel="noopener noreferrer" className="hero-link">GitHub</a>
            <a href="https://x.com/polymathXY" target="_blank" rel="noopener noreferrer" className="hero-link">X</a>
            <a href="https://youtube.com/@Polyoussmath" target="_blank" rel="noopener noreferrer" className="hero-link">YouTube</a>
            <a href="https://linkedin.com/in/youssef-adarrab" target="_blank" rel="noopener noreferrer" className="hero-link">LinkedIn</a>
            <a href="mailto:hello@youssefadarrab.com" className="hero-link">Email</a>
          </div>
        </section>

        <footer className="site-footer">
          &copy; {new Date().getFullYear()} Youssef Adarrab
        </footer>
      </main>
    </>
  );
}
