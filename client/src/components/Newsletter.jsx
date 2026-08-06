import "./Newsletter.css";
import { FaPaperPlane } from "react-icons/fa";

function Newsletter() {
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

              <form className="newsletter-input-wrap" onSubmit={(e) => e.preventDefault()}>

                <input
                  type="email"
                  placeholder="Enter your email..."
                  required
                />

                <button type="submit">
                  Subscribe
                  <FaPaperPlane />
                </button>

              </form>

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