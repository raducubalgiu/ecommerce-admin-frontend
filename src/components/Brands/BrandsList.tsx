import {CategoryModel} from "../../models/categoryModel";
import { Link } from 'react-router-dom';
import {useHttpDelete} from "../../api/use-http";

const BrandsList = (props: { brands: CategoryModel[]; onDeleteItem: (id:number) => void }) => {

    // delete handler - onClick
    const deleteHandler = (brandId: number) => {

        // fire the async function from custom hook - receives id as parameter
        deleteData(brandId);
    }

    // The second argument from the custom hook
    const updateState = (id:number) => {
        props.onDeleteItem(id);
    }

    // Custom Hook for deleting data - (DELETE method)
    const {deleteData, loading } = useHttpDelete('brands', updateState);

    return (
        <>
            { props.brands.map(brand => (
                <tr key={brand.id}>
                    <td>{brand.id}</td>
                    <td>{brand.name}</td>
                    <td>{new Date(brand.updated_at).toLocaleDateString()}</td>
                    <td>
                        <div className="buton-group">
                            <Link to={`/brands/${brand.id}/edit`} className="btn btn-sm btn-info">Edit</Link>
                            {!loading && <button onClick={() => deleteHandler(brand.id)} className="btn btn-sm btn-danger">Delete</button>}
                            {loading && <button onClick={() => deleteHandler(brand.id)} className="btn btn-sm btn-danger">
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                <span className="sr-only">Loading...</span>
                            </button>}
                        </div>
                    </td>
                </tr>
            )) }
        </>
    );
};

export default BrandsList;