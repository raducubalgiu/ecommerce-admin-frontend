import { useState } from "react";
import { useHttpGet } from "../../api/use-http";
import { ProductsModel } from "../../models/productsModel";


const PopularProducts = () => {
    const [products, setProducts] = useState<ProductsModel[]>([]);

    const applyProducts = (data: any) => {
        setProducts(data);
    }

    useHttpGet('products', applyProducts);

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Popular Products</h6>
            </div>

            <div className="card-body">
                {products.map(product => (
                    <p>{product.average_review}</p>
                ))}
            </div>
        </div>
    );
}

export default PopularProducts;