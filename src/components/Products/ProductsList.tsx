import {ProductsModel} from "../../models/productsModel";
import {useHttpDelete, useHttpGet} from "../../api/use-http";
import { Link } from 'react-router-dom';

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
                    <td><strong>{product.id}</strong></td>
                    <td>{product.product_name}<span className="badge badge-info p-1 ml-2">{product.supercategory.name}</span></td>
                    <td>{product.brand.name}</td>
                    <td>{product.product_details.product_color}</td>
                    <td>{product.product_details.product_material}</td>
                    <td>{product.product_details.product_style}</td>
                    <td><img src={product.product_image} alt="" width={50}/></td>
                    <td>${product.product_price}</td>
                    <td><Link to={`/products/${product.id}/edit`} className="btn btn-sm btn-warning">Edit</Link></td>
                    <td><button onClick={() => deleteItemHandler(product.id)} className="btn btn-sm btn-danger">Delete</button></td>
                </tr>
            ))}
        </>
    );
}

export default ProductsList;