import { Link } from 'react-router-dom';
import classes from 'BackButton.module.css';

const AddButton = (props: any) => {
    return (
        <div className="text-right">
            <Link to={props.link} className={classes.button}>{props.children}</Link>
        </div>
    );
}

export default AddButton;