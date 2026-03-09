import Nav from "@/components/Nav";

export default function PublicationsPage() {
  return (
    <>
      <Nav />
      <main className="page-container" style={{ maxWidth: "720px" }}>
        <div className="page-header">
          <h1 className="page-title">Publications</h1>
        </div>

        <section className="section">
          <div className="pub-card">
            <h3 className="pub-title">NeurIPS Proceedings — Poster</h3>
            <p className="pub-venue">NeurIPS &middot; Nt3awnou</p>
            <p className="pub-desc">
              Published poster at NeurIPS proceedings based on work done as a
              tech volunteer with the Nt3awnou organization following the
              Morocco earthquake.
            </p>
            <div className="pub-poster">
              {/* Replace with: <img src="/images/neurips-poster.png" alt="NeurIPS poster" /> */}
              {/* Or embed a PDF: <iframe src="/papers/neurips-poster.pdf" title="NeurIPS poster" /> */}
              Poster preview — add image to /public/images/neurips-poster.png
            </div>
          </div>

          <div className="pub-card">
            <h3 className="pub-title">SONDRA Research Publication</h3>
            <p className="pub-venue">SONDRA Lab &middot; CentraleSupélec</p>
            <p className="pub-desc">
              Research publication on signal processing and machine learning
              conducted at the SONDRA laboratory.
            </p>
            <div className="pub-poster">
              {/* Replace with: <img src="/images/sondra-poster.png" alt="SONDRA poster" /> */}
              Poster preview — add image to /public/images/sondra-poster.png
            </div>
          </div>
        </section>

        <footer className="site-footer">
          &copy; {new Date().getFullYear()} Youssef Adarrab
        </footer>
      </main>
    </>
  );
}
