import Layout from "../components/Layout/Layout";
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import ProductsList from "../components/Products/ProductsList";
import {ProductsModel} from "../models/productsModel";
import Spinner from "../components/UI/Spinner";
import {useHttpGet} from "../api/use-http";
import Pagination from "../components/UI/Pagination";
import SearchSort from "../components/UI/SearchSort";

const Products = (props: { items: ProductsModel[] }) => {
    const [allProducts, setAllProducts] = useState<ProductsModel[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductsModel[]>([])
    const [filters, setFilters] = useState({
        s: '',
        sort: true
    });

    // The second argument from custom hook
    const applyData = (data: ProductsModel[]) => {
        setAllProducts(data);
        setFilteredProducts(data);
    }
    // Custom Hook for get requests
    const {error, loading} = useHttpGet('products', applyData);

    const deleteItemHandler = (id: number) => {
        setFilteredProducts(filteredProducts => filteredProducts.filter(product => product.id !== id));
    }

    useEffect(() => {
        let products = allProducts.filter(product => product.product_name.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
            product.brand.name.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0
        );

        if(filters.sort === true) {
            products.sort((a, b) => {
                if(a.id > b.id) {
                    return -1;
                }
                if(a.id < b.id) {
                    return 1;
                }

                return 0;
            })
        } else if(filters.sort === false) {
            products.sort((a, b) => {
                if(a.id > b.id) {
                    return 1;
                }
                if(a.id < b.id) {
                    return -1;
                }

                return 0;

            })
        }

        setFilteredProducts(products);

    }, [filters]);

    return (
        <Layout>
            <h1 className="h3 mb-4 text-gray-800">Brands</h1>
            <div className="card shadow p-4">
                {/* Display products */}
                {!loading && <div className="card-content">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <SearchSort
                            items={filteredProducts}
                            filters={filters}
                            setFilters={setFilters}
                            placeholder="Search product..."
                        />

                        <div className="add-button">
                            <Link to="/add-product" className="btn btn-primary btn-inline">Add Product</Link>
                        </div>
                    </div>

                    <div className="row">
                        <p className="mb-3">Results: <strong>{filteredProducts.length}</strong></p>
                        <div className="table table-responsive">
                            <table className="table" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                <tr>
                                    <th><strong>#</strong></th>
                                    <th>Title</th>
                                    <th>Brand</th>
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
                                    <th>Brand</th>
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
                                    products={filteredProducts}
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