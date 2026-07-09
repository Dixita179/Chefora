import "./WhyUs.css";
import {
  FaRobot,
  FaVideo,
  FaHeart,
  FaUsers,
  FaSearch,
  FaUtensils,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "AI Recipe Suggestions",
    description:
      "Discover personalized recipes based on your ingredients, preferences, and cooking style.",
  },
  {
    icon: <FaVideo />,
    title: "Step-by-Step Videos",
    description:
      "Watch engaging cooking videos that guide you through every recipe with ease.",
  },
  {
    icon: <FaHeart />,
    title: "Save Your Favorites",
    description:
      "Create your own collection of favorite recipes and access them anytime.",
  },
  {
    icon: <FaUsers />,
    title: "Community Sharing",
    description:
      "Share your recipes, receive feedback, and connect with food lovers worldwide.",
  },
  {
    icon: <FaSearch />,
    title: "Smart Recipe Search",
    description:
      "Search recipes instantly using ingredients, cuisine, meal type, or cooking time.",
  },
  {
    icon: <FaUtensils />,
    title: "Easy Cooking",
    description:
      "Beautiful recipe cards and clear instructions make cooking enjoyable for everyone.",
  },
];

function WhyUs() {
  return (
    <section className="whyus">

      <div className="whyus-container">

        <div className="whyus-heading">

          <span>WHY CHOOSE US</span>

          <h2>Why Choose Chefora?</h2>

          <p>
            Chefora is your all-in-one recipe platform where you can discover,
            cook, and share delicious dishes while connecting with a vibrant
            community of food lovers.
          </p>

        </div>

        <div className="whyus-grid">

          {features.map((feature, index) => (

            <div className="feature-card" key={index}>

              <div className="feature-icon">

                {feature.icon}

              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyUs;