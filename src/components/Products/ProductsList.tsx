import {ProductsModel} from "../../models/productsModel";
import {useHttpDelete} from "../../api/use-http";

const ProductsList = (props: {products: ProductsModel[]; onDeleteItem: (id:number) => void}) => {

    const deleteItemHandler = (id: number) => {
        deleteData(id);
    }

    const updateState = (id:number) => {
        props.onDeleteItem(id);
    }

    const { deleteData } = useHttpDelete('products', updateState);

    return (
        <>
            {props.products.map(product => (
                <tr key={product.id}>
                    <td><strong>#</strong></td>
                    <td>{product.product_name}</td>
                    <td>{product.product_details.product_description}</td>
                    <td>{product.product_details.product_color}</td>
                    <td>{product.product_details.product_material}</td>
                    <td>{product.product_details.product_style}</td>
                    <td>{product.product_image}</td>
                    <td>${product.product_price}</td>
                    <td><button className="btn btn-sm btn-warning">Edit</button></td>
                    <td><button onClick={() => deleteItemHandler(product.id)} className="btn btn-sm btn-danger">Delete</button></td>
                </tr>
            ))}
        </>
    );
}

export default ProductsList;