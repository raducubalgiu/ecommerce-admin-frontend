import { Link } from 'react-router-dom';
import Layout from "./Layout";

const NotFoundPage = () => {
    return (
        <Layout>
            <div className="text-center">
                <div className="error mx-auto">404</div>
                <p className="lead text-gray-800 mb-5">Page Not Found</p>
                <p className="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                <Link to="/">&larr; Back to Dashboard</Link>
            </div>
        </Layout>
    );
}

export default NotFoundPage;