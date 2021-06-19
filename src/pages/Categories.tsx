import React, {useEffect, useState} from 'react';
import CategoriesList from "../components/Categories/CategoriesList";
import Layout from "../components/Layout/Layout";
import {CategoryModel} from "../models/categoryModel";
import Spinner from "../components/UI/Spinner";
import AddCategories from "../components/Categories/AddCategories";
import {useHttpGet} from "../api/use-http";
import Pagination from "../components/UI/Pagination";
import SearchSort from "../components/UI/SearchSort";

const Categories = (props: { items: CategoryModel[] }) => {
    const [allCategories, setAllCategories] = useState<CategoryModel[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<CategoryModel[]>([]);
    const [filters, setFilters] = useState({
        s: '',
        sort: true
    })

    // Second argument for useHttpGet
    const applyData = (data: CategoryModel[]) => {
        setAllCategories(data);
        setFilteredCategories(data);
    }
    // Custom hook - get Categories
    const { error, loading } = useHttpGet('categories', applyData);

    // Add Category to the state
    const addCategoryHandler = (obj: any) => {
        setFilteredCategories(categories => categories.concat(obj));
    }

    // Delete Item from state
    const deleteItemHandler = (id:number) => {
        setFilteredCategories((categories) => categories.filter(category => category.id !== id));
    }

    useEffect(() => {
        let categories = allCategories.filter(category => category.name.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0);

        if(filters.sort === false) {
            categories.sort((a, b) => {
                if(a.id > b.id) {
                    return 1;
                }
                if(a.id < b.id) {
                    return -1;
                }

                return 0;
            })
        } else if(filters.sort === true) {
            categories.sort((a, b) => {
                if(a.id > b.id) {
                    return -1;
                }
                if(a.id < b.id) {
                    return 1;
                }

                return 0;
            })
        }

        setFilteredCategories(categories);

    }, [filters]);

    return (
        <Layout>
            <h1 className="h3 mb-4 text-gray-800">Categories</h1>
            <div className="card shadow p-4">
                {/* Display categories */}
                {!loading && <div className="row">
                    <div className="col-md-4 mb-4">
                        <AddCategories
                            onAddCategory={addCategoryHandler}
                        />
                    </div>

                    <div className="col-md-8">
                        <SearchSort
                        items={filteredCategories}
                        filters={filters}
                        setFilters={setFilters}
                        />

                        <p className="mb-3">Results: <strong>{filteredCategories.length}</strong></p>
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
                                    <CategoriesList
                                        categories={filteredCategories}
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

export default Categories;