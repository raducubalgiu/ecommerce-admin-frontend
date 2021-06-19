import Layout from "../components/Layout/Layout";
import AddBrand from "../components/Brands/AddBrand";
import BrandsList from "../components/Brands/BrandsList";
import React, {useEffect, useState} from "react";
import {CategoryModel} from "../models/categoryModel";
import Spinner from "../components/UI/Spinner";
import Pagination from "../components/UI/Pagination";
import {useHttpGet} from "../api/use-http";
import SearchSort from "../components/UI/SearchSort";

const Brands = (props: { items: CategoryModel[] }) => {
    const [allBrands, setAllBrands] = useState<CategoryModel[]>([]);
    const [filteredBrands, setFilteredBrands] = useState<CategoryModel[]>([]);
    const [filters, setFilters] = useState({
        s: '',
        sort: true
    });

    // The second argument from custom hook
    const applyData = (data: CategoryModel[]) => {
        setAllBrands(data);
        setFilteredBrands(data);
    }
    // Custom Hook for GET request - fetching the brands
    const {error, loading} = useHttpGet('brands', applyData);

    // Add Brand
    const addBrandHandler = (obj: any) => {
        setFilteredBrands(brands => brands.concat(obj));
    }

    // Delete Item
    const deleteItemHandler = (id:number) => {
        setFilteredBrands((brands) => brands.filter(brand => brand.id !== id));
    }

    // Filtering brands
    useEffect(() => {
        let brands = allBrands.filter(brand => brand.name.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0);

        if(filters.sort === false) {
            brands.sort((a, b) => {
                if(a.id > b.id) {
                    return 1;
                }
                if(a.id < b.id) {
                    return -1;
                }

                return 0;
            })
        } else if(filters.sort === true) {
            brands.sort((a, b) => {
                if(a.id > b.id) {
                    return -1;
                }
                if(a.id < b.id) {
                    return 1;
                }

                return 0;
            })
        }

        setFilteredBrands(brands);
    }, [filters]);

    return (
        <Layout>
            <h1 className="h3 mb-4 text-gray-800">Brands</h1>
            <div className="card shadow p-4">
                {/* Displaying brands */}
                {!loading && <div className="row">
                    <div className="col-md-4 mb-4">
                        <AddBrand onAddBrand={addBrandHandler}/>
                    </div>

                    <div className="col-md-8">
                        <SearchSort
                            items={filteredBrands}
                            filters={filters}
                            setFilters={setFilters}
                        />

                        <p className="mb-3">Results: <strong>{filteredBrands.length}</strong></p>
                        <div className="table table-responsive">
                            <table className="table" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                <tr>
                                    <th><strong>#</strong></th>
                                    <th>Name</th>
                                    <th>Updated at</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>

                                <tfoot>
                                <tr>
                                    <th><strong>#</strong></th>
                                    <th>Name</th>
                                    <th>Updated at</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </tfoot>

                                <tbody>
                                    <BrandsList
                                        brands={filteredBrands}
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

                {/* Show the Spinner if loading */}
                {loading && <Spinner />}

                {/* Display error if error */}
                {!loading && error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
            </div>
        </Layout>
    );
}

export default Brands;