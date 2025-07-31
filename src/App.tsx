import "./App.scss";
import pfp from "./assets/pfp.jpeg";

function App() {
  return (
    <main className="hero" id="main-content">
      <div
        className="terminal-window"
        role="region"
        aria-label="Terminal window"
      >
        <div className="terminal-prompt" aria-hidden="true">
          souriosec.com
        </div>
        <div className="terminal-grid">
          <div className="profile-image-container">
            <img
              src={pfp}
              alt="SOURIOSEC profile picture - terminal style avatar"
              width={150}
              height={150}
              loading="lazy"
            />
          </div>
          <h1 className="name">SOURIOSEC</h1>
          <nav aria-label="Social links">
            <a
              className="github-link"
              href="https://github.com/souriosec"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SOURIOSEC on GitHub (opens in new tab)"
            >
              GitHub
            </a>
            <a
              className="twitter-link"
              href="https://x.com/souriosec"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SOURIOSEC on Twitter/X (opens in new tab)"
            >
              Twitter/X
            </a>
          </nav>
        </div>
      </div>
    </main>
  );
}

export default App;
