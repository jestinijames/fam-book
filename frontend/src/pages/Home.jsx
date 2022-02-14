import { Fragment } from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

const Home = () => {
return (
<Fragment>
<section className="heading">
    <h1>What do you want to today, Jestin?</h1>
    <p>Choose an option</p>
</section>

<Link to="/new-task" className="btn btn-reverse">
    <FaQuestionCircle /> Create New Task
</Link>
<Link to="/tasks" className="btn btn-block">
    <FaTicketAlt /> View Tasks
</Link>
</Fragment>
);
};


export default Home;




