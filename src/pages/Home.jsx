import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to CreatorVerse</h1>
            <Link to="/gallery"><button className="explore-btn">Explore Now</button></Link>
        </div>
    );
};

export default Home;