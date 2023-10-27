import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);

  const welcome = user ? `Welcome ${user.username}!` : "Welcome!";

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>
        <Link to={`/users/${user.user_id}/records`}>Go to User's Records</Link>
        <br />
        <Link to="/operations">Make an operation</Link>
      </p>
    </section>
  );

  return content;
};

export default Welcome;
