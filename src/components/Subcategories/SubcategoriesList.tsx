import {CategoryModel} from "../../models/categoryModel";
import {useHttpDelete} from "../../api/use-http";


const SubcategoriesList = (props: {subcategories: CategoryModel[]; onDeleteSubcategories: (id: number) => void}) => {
    const deleteItemHandler = (id:number) => {
        deleteData(id);
    }

    const updateState = (id:number) => {
        props.onDeleteSubcategories(id);
    }

    const { deleteData } = useHttpDelete('subcategories', updateState);

    return (
        <>
            { props.subcategories.map(subcategory => (
                <tr key={subcategory.id}>
                    <td>{subcategory.id}</td>
                    <td>{subcategory.name}</td>
                    <td>{new Date(subcategory.updated_at).toLocaleDateString()}</td>
                    <td><button className="btn btn-sm btn-warning">Edit</button></td>
                    <td><button onClick={() => deleteItemHandler(subcategory.id)} className="btn btn-sm btn-danger">Delete</button></td>
                </tr>
            )) }
        </>
    );
}

export default SubcategoriesList;