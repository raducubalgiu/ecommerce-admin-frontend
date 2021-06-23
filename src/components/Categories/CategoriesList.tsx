import {CategoryModel} from "../../models/categoryModel";
import {useHttpDelete} from "../../api/use-http";
import { Link } from 'react-router-dom';

const CategoriesList = (props: { categories: CategoryModel[]; onDeleteItem: (id:number) => void }) => {
    const deleteHandler = (id:number) => {
        deleteData(id);
    }

    const updateState = (id:number) => {
        props.onDeleteItem(id);
    }

    const { deleteData } = useHttpDelete('categories', updateState);

    return (
        <>
            { props.categories.map(category => (
                <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{new Date(category.updated_at).toLocaleDateString()}</td>
                    <td>
                        <div className="button-group">
                            <Link to={`/categories/${category.id}/edit`} className="btn btn-sm btn-info">Edit</Link>
                            <button onClick={() => deleteHandler(category.id)} className="btn btn-sm btn-danger">Delete</button>
                        </div>
                    </td>
                </tr>
            )) }
        </>
    );
}

export default CategoriesList;