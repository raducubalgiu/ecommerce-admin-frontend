import React from 'react';
import Layout from "../components/Layout/Layout";
import SubcategoriesList from "../components/Subcategories/SubcategoriesList";
import {useState} from "react";
import {CategoryModel} from "../models/categoryModel";
import Spinner from "../components/UI/Spinner";
import AddSubcategories from "../components/Subcategories/AddSubcategories";
import {useHttpGet} from "../api/use-http";
import Pagination from "../components/UI/Pagination";

const Subcategories = () => {
    const [subcategories, setSubcategories] = useState<CategoryModel[]>([]);

    const applySubcategories = (data: CategoryModel[]) => {
        setSubcategories(data);
    }
    const {error, loading} = useHttpGet('subcategories', applySubcategories);

    // Add Subcategories
    const addSubcategoriesHandler = (obj: any) => {
        setSubcategories(subcategories => subcategories.concat(obj));
    }

    const deleteItemHandler = (id:number) => {
        setSubcategories((subcategories) => subcategories.filter(subcategory => subcategory.id !== id));
    }

    return (
        <Layout>
            <h1 className="h3 mb-4 text-gray-800">Subcategories</h1>

            <div className="card shadow p-4">
                {/* Show Subcategories */}
                {!loading && <div className="row">
                    <div className="col-md-4 mb-4">
                        <AddSubcategories
                            onAddSubcategories={addSubcategoriesHandler}
                        />
                    </div>

                    <div className="col-md-8">
                        <div className="table table-responsive">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div className="search-input">
                                    <input type="text" className="form-control bg-light small" placeholder="Search subcategory..."
                                           aria-label="Search" aria-describedby="basic-addon2" />
                                </div>

                                <div className="sort">
                                    Sort
                                </div>
                            </div>

                            <table className="table" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                <tr>
                                    <th><strong>#</strong></th>
                                    <th>Name</th>
                                    <th>Updated_at</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>

                                <tfoot>
                                <tr>
                                    <th><strong>#</strong></th>
                                    <th>Name</th>
                                    <th>Updated_at</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </tfoot>

                                <tbody>
                                    <SubcategoriesList
                                        subcategories={subcategories}
                                        onDeleteSubcategories={deleteItemHandler}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-2">
                        <Pagination />
                    </div>
                </div>}
                {/* Show Spinner if loading */}
                {loading && <Spinner />}

                {/* Show error if error */}
                {!loading && error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
            </div>
        </Layout>
    );
}

export default Subcategories;