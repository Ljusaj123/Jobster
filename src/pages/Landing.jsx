import main from "../assets/images/main.svg";
import Landingwrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
import { Logo } from "../components";

function Landing() {
  return (
    <Landingwrapper>
      <main>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              deserunt, voluptate expedita earum obcaecati quod. Expedita ut
              autem fugiat quaerat voluptas omnis libero, exercitationem quam
              non in id, est quo.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login / Register
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </main>
    </Landingwrapper>
  );
}

export default Landing;
