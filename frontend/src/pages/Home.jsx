import { Fragment } from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const Home = () => {

    const { user } = useSelector((state) => state.authReducer);
    let name = user ? user.name : 'Stranger';
return (
<Fragment>
<section className="heading">
    <h1>What do you want to today, {name}?</h1>
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




