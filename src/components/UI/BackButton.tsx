import classes from './BackButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const BackButton = () => {
    const history = useHistory();

    return (
        <button onClick={history.goBack} className={classes.button}>
            <FontAwesomeIcon icon={faLongArrowAltLeft} />
        </button>
    );
}

export default BackButton;