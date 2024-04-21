import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="hero min-h-[450px]" style={{backgroundImage: 'url(https://i.ibb.co/3CxLtCV/20240316-003215.png)'}}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Welcome to kushtia</h1>
              <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              <div className="flex gap-2 justify-center">
              <Link to="/login">
                <button className="btn btn-success">Sign in</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-info">Sign up</button>
              </Link>
              </div>
            </div>
          </div>
        </div>
    );
};

export default Home;