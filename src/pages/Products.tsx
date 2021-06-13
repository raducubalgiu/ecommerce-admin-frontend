import Layout from "../components/Layout/Layout";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductsList from "../components/Products/ProductsList";
import {ProductsModel} from "../models/productsModel";
import Spinner from "../components/UI/Spinner";
import {useHttpGet} from "../api/use-http";
import Pagination from "../components/UI/Pagination";

const Products = () => {
    const [products, setProducts] = useState<ProductsModel[]>([]);

    // The second argument from custom hook
    const applyData = (data: ProductsModel[]) => {
        setProducts(data);
    }
    // Custom Hook for get requests
    const {error, loading} = useHttpGet('products', applyData);

    const deleteItemHandler = (id: number) => {
        setProducts(products => products.filter(product => product.id !== id));
    }

    return (
        <Layout>
            <h1 className="h3 mb-4 text-gray-800">Brands</h1>
            <div className="card shadow p-4">
                {/* Display products */}
                {!loading && <div className="card-content">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="search-product d-flex align-items-center">
                            <div className="search-input">
                                <input type="text" className="form-control bg-light small" placeholder="Search product..."
                                       aria-label="Search" aria-describedby="basic-addon2" />
                            </div>

                            <div className="sort-button ml-4">
                                Sort
                            </div>
                        </div>

                        <div className="add-button">
                            <Link to="/add-product" className="btn btn-primary btn-inline">Add Product</Link>
                        </div>
                    </div>

                    <div className="row">
                        <div className="table table-responsive">
                            <table className="table" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                <tr>
                                    <th><strong>#</strong></th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Color</th>
                                    <th>Material</th>
                                    <th>Style</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>

                                <tfoot>
                                <tr>
                                    <th><strong>#</strong></th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Color</th>
                                    <th>Material</th>
                                    <th>Style</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </tfoot>

                                <tbody>
                                <ProductsList
                                    products={products}
                                    onDeleteItem={deleteItemHandler}
                                />
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-2">
                        <Pagination />
                    </div>
                </div>}
                {/* Display spinner if loading */}
                {loading && <Spinner />}

                {/* Display error if error */}
                {!loading && error && <p>{error}</p>}
            </div>
        </Layout>
    );
}

export default Products;