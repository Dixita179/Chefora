import "./Newsletter.css";
import { useState } from "react";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // No backend call yet — just confirm the subscription locally.
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-wrapper">

        <div className="newsletter-card">

          <div className="newsletter-grid">

            <div>
              <h2 className="newsletter-heading">
                Never Miss a Recipe!
              </h2>

              <p className="newsletter-subtext">
                Subscribe to our newsletter and receive delicious recipes,
                cooking tips, and food inspiration delivered straight to your
                inbox every week.
              </p>
            </div>

            <div>

              {subscribed ? (
                <p className="newsletter-success">
                  <FaCheckCircle /> Thanks for subscribing!
                </p>
              ) : (
                <form className="newsletter-input-wrap" onSubmit={handleSubmit}>

                  <input
                    type="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <button type="submit">
                    Subscribe
                    <FaPaperPlane />
                  </button>

                </form>
              )}

              <p className="newsletter-disclaimer">
                📧 No spam. Only delicious recipes and cooking inspiration.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Newsletter;