import React, {useEffect} from 'react';
import Layout from "../components/Layout/Layout";
import SubcategoriesList from "../components/Subcategories/SubcategoriesList";
import {useState} from "react";
import {CategoryModel} from "../models/categoryModel";
import Spinner from "../components/UI/Spinner";
import AddSubcategories from "../components/Subcategories/AddSubcategories";
import {useHttpGet} from "../api/use-http";
import Pagination from "../components/UI/Pagination";
import SearchSort from "../components/UI/SearchSort";

const Subcategories = () => {
    const [allSubcategories, seAlltSubcategories] = useState<CategoryModel[]>([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState<CategoryModel[]>([]);
    const [filters, setFilters] = useState({
        s: '',
        sort: true
    })

    const applySubcategories = (data: CategoryModel[]) => {
        seAlltSubcategories(data);
        setFilteredSubcategories(data);
    }
    const {error, loading} = useHttpGet('subcategories', applySubcategories);

    // Add Subcategories
    const addSubcategoriesHandler = (obj: any) => {
        setFilteredSubcategories(subcategories => subcategories.concat(obj));
    }

    const deleteItemHandler = (id:number) => {
        setFilteredSubcategories((subcategories) => subcategories.filter(subcategory => subcategory.id !== id));
    }

    useEffect(() => {
        let subcategories = allSubcategories.filter(subcategory => subcategory.name.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0)

        if(filters.sort === false) {
            subcategories.sort((a, b) => {
                if(a.id > b.id) {
                    return 1;
                }
                if(a.id < b.id) {
                    return -1;
                }

                return 0;
            })
        } else if(filters.sort === true) {
            subcategories.sort((a, b) => {
                if(a.id > b.id) {
                    return -1;
                }
                if(a.id < b.id) {
                    return 1;
                }

                return 0;
            })
        }

        setFilteredSubcategories(subcategories);
    }, [filters]);

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
                        <SearchSort
                            items={filteredSubcategories}
                            filters={filters}
                            setFilters={setFilters}
                        />

                        <p className="mb-3">Results: <strong>{filteredSubcategories.length}</strong></p>
                        <div className="table table-responsive">
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
                                        subcategories={filteredSubcategories}
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