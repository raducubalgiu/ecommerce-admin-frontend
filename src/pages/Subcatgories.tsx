import React, {useState} from 'react';
import Layout from "../components/Layout/Layout";
import AddSubcategories from "../components/Subcategories/AddSubcategories";
import {useHttpGet} from "../api/use-http";
import {CategoryModel} from "../models/categoryModel";
import Spinner from "../components/UI/Spinner";
import SubcategoriesList from "../components/Subcategories/SubcategoriesList";

const Subcategories = () => {
    const [subcategories, setSubcategories] = useState<CategoryModel[]>([]);

    const applySubcategories = (data: any) => {
        setSubcategories(data);
    }

    const {loading, error} = useHttpGet('subcategories', applySubcategories);

    return (
        <Layout>
            <h1 className="h3 mb-4 text-gray-800">Subcategories</h1>

            <div className="card shadow p-4">
                {/* Show Subcategories */}
                {!loading && <div className="row">
                    <div className="col-md-4 mb-4">
                        <AddSubcategories />
                    </div>

                    <div className="col-md-8">
                        <SubcategoriesList
                            subcategories={subcategories}
                        />
                    </div>
                </div>}
                {loading && <Spinner />}
            </div>
        </Layout>
    );
}

export default Subcategories;