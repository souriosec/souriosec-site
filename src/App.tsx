import "./App.scss";
import pfp from "./assets/pfp.jpeg";
import { useEffect, useState } from "react";

interface NowPlayingData {
  is_playing: boolean;
  item: {
    name: string;
    artists: { name: string }[];
    album: {
      name: string;
      images: { url: string }[];
    };
    external_urls: { spotify: string };
  };
}

function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch("/api/spotify");
      if (!response.ok) throw new Error("Error fetching spotify data");
      const json: NowPlayingData = await response.json();
      setData(json);
    } catch (error) {
      console.error("Failed to fetch now playing data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="spotify-playing">Loading...</div>;
  }
  if (!data?.is_playing) {
    return <div className="spotify-playing">Not listening to anything.</div>;
  }

  const { item } = data;
  const albumImage = item.album.images[0]?.url;

  return (
    <div className="spotify-playing">
      <p className="spotify-label">Now Playing:</p>
      {albumImage && (
        <img
          src={albumImage}
          alt={`${item.album.name} album art`}
          width={100}
          height={100}
          className="spotify-album-art"
        />
      )}
      <a
        href={item.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="spotify-track"
      >
        <span className="track-name">{item.name}</span>
        <span className="track-artist">
          by {item.artists.map((a) => a.name).join(", ")}
        </span>
      </a>
    </div>
  );
}

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
              aria-label="Visit SOURIOSEC's GitHub (opens in new tab)"
            >
              GitHub
            </a>
            <a
              className="twitter-link"
              href="https://x.com/souriosec"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SOURIOSEC's Twitter/X (opens in new tab)"
            >
              Twitter/X
            </a>
            <a
              className="portfolio-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SOURIOSEC's portfolio (opens in new tab)"
            >
              PORTFOLIO
            </a>
            <a
              className="blog-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SOURIOSEC's blog (opens in new tab)"
            >
              BLOG
            </a>
          </nav>
        </div>
        <NowPlaying />
      </div>
    </main>
  );
}

export default App;
