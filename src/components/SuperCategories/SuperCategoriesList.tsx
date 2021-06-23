import {useHttpDelete} from "../../api/use-http";
import {Link} from "react-router-dom";
import {CategoryModel} from "../../models/categoryModel";

const SuperCategoriesList = (props: { supercategories: CategoryModel[]; onDeleteItem: (id:number) => void }) => {
    const deleteHandler = (id:number) => {
        deleteData(id);
    }

    const updateState = (id:number) => {
        props.onDeleteItem(id);
    }

    const { deleteData } = useHttpDelete('supercategories', updateState);

    return (
        <>
            { props.supercategories.map(supercategory => (
                <tr key={supercategory.id}>
                    <td>{supercategory.id}</td>
                    <td>{supercategory.name}</td>
                    <td>{new Date(supercategory.updated_at).toLocaleDateString()}</td>
                    <td>
                        <div className="button-group">
                            <Link to={`/supercategories/${supercategory.id}/edit`} className="btn btn-sm btn-info">Edit</Link>
                            <button onClick={() => deleteHandler(supercategory.id)} className="btn btn-sm btn-danger">Delete</button>
                        </div>
                    </td>
                </tr>
            )) }
        </>
    );
}

export default SuperCategoriesList;