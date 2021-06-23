import Layout from "../components/Layout/Layout";
import React, {useEffect, useState} from "react";
import {CategoryModel} from "../models/categoryModel";
import {useHttpGet} from "../api/use-http";
import SearchSort from "../components/UI/SearchSort";
import Pagination from "../components/UI/Pagination";
import Spinner from "../components/UI/Spinner";
import SuperCategoriesList from "../components/SuperCategories/SuperCategoriesList";
import AddSuperCategories from "../components/SuperCategories/AddSuperCategories";

const SuperCategories = (props: { items: CategoryModel[] }) => {
    const [allSuperCategories, setAllSuperCategories] = useState<CategoryModel[]>([]);
    const [filteredSuperCategories, setFilteredSuperCategories] = useState<CategoryModel[]>([]);
    const [filters, setFilters] = useState({
        s: '',
        sort: true
    })

    // Second argument for useHttpGet
    const applyData = (data: CategoryModel[]) => {
        setAllSuperCategories(data);
        setFilteredSuperCategories(data);
    }
    // Custom hook - get Categories
    const { error, loading } = useHttpGet('supercategories', applyData);

    // Add Category to the state
    const addSuperCategoryHandler = (obj: any) => {
        setAllSuperCategories(supercategories => supercategories.concat(obj));
        setFilteredSuperCategories(supercategories => supercategories.concat(obj));
    };

    // Delete Item from state
    const deleteItemHandler = (id:number) => {
        setAllSuperCategories((supercategories) => supercategories.filter(supercategory => supercategory.id !== id));
        setFilteredSuperCategories((supercategories) => supercategories.filter(supercategory => supercategory.id !== id));
    }

    useEffect(() => {
        let supercategories = allSuperCategories.filter(supercategory => supercategory.name.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0);

        if(filters.sort) {
            supercategories.sort((a, b) => {
                if(a.id > b.id) {
                    return -1;
                }
                if(a.id < b.id) {
                    return 1;
                }

                return 0;
            })
        } else if(!filters.sort) {
            supercategories.sort((a, b) => {
                if(a.id > b.id) {
                    return 1;
                }
                if(a.id < b.id) {
                    return -1;
                }

                return 0;
            })
        }

        setFilteredSuperCategories(supercategories);

    }, [filters]);

    return (
        <Layout>
            <h1 className="h3 mb-4 text-gray-800">Supercategories</h1>
            <div className="card shadow p-4">
                {/* Display categories */}
                {!loading && <div className="row">
                    <div className="col-md-4 mb-4">
                        <AddSuperCategories
                            onAddSuperCategories={addSuperCategoryHandler}
                        />
                    </div>

                    <div className="col-md-8">
                        <SearchSort
                            items={filteredSuperCategories}
                            filters={filters}
                            setFilters={setFilters}
                            placeholder="Search category..."
                        />

                        <div className="table table-responsive">
                            <p className="mb-3 mt-3">Results: <strong>{filteredSuperCategories.length}</strong></p>
                            <table className="table" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                <tr>
                                    <th><strong>#</strong></th>
                                    <th>Name</th>
                                    <th>Updated at</th>
                                    <th>Edit / Delete</th>
                                </tr>
                                </thead>

                                <tfoot>
                                <tr>
                                    <th><strong>#</strong></th>
                                    <th>Name</th>
                                    <th>Updated at</th>
                                    <th>Edit / Delete</th>
                                </tr>
                                </tfoot>

                                <tbody>
                                    <SuperCategoriesList
                                        supercategories={filteredSuperCategories}
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

export default SuperCategories;