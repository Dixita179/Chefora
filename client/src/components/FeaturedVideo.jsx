import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedVideo.css";

// Free-license stock clip (Mixkit) — swap this for your own hosted video anytime.
const VIDEO_SRC = "https://assets.mixkit.co/videos/47555/47555-720.mp4";
const VIDEO_POSTER =
  "https://assets.mixkit.co/videos/47555/47555-thumb-360-0.jpg";

function FeaturedVideo() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // autoplay can be blocked by the browser — that's fine,
            // the native controls still let the user press play manually
          });
          setHasPlayed(true);
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 } // fires once half the section is visible
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="featured-video" className="featured-video-section">
      <div className="featured-video-inner">

        <div className="featured-video-media">
          <video
            ref={videoRef}
            className="featured-video-player"
            poster={VIDEO_POSTER}
            muted
            loop
            playsInline
            controls
          >
            <source src={VIDEO_SRC} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="featured-video-content">
          <h2>Watch a Chef in Action</h2>
          <p>
            There's nothing like watching a technique come together in real
            time. From knife work to plating, this is the kind of hands-on
            cooking that inspires our recipe collection — the same energy
            you'll find in every dish on Chefora.
          </p>
          <Link to="/recipes" className="view-full-recipe-link">
            Browse Recipes →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default FeaturedVideo;