import { Link } from 'react-router-dom';

const Pagination = () => {
    return (
        <ul className="pagination justify-content-center">
            <li className="page-item disabled">
                <span className="page-link">Previous</span>
            </li>
            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
            <li className="page-item active" aria-current="page">
                <span className="page-link">2</span>
            </li>
            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
            <li className="page-item">
                <Link className="page-link" to="#">Next</Link>
            </li>
        </ul>
    );
}

export default Pagination;