import {useState} from 'react';
import CategoriesList from "../components/Categories/CategoriesList";
import Layout from "../components/Layout/Layout";
import {CategoryModel} from "../models/categoryModel";
import Spinner from "../components/UI/Spinner";
import AddCategories from "../components/Categories/AddCategories";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons'
import {useHttpGet} from "../api/use-http";
import Pagination from "../components/UI/Pagination";

const Categories = () => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    // Second argument for useHttpGet
    const applyData = (data: CategoryModel[]) => {
        setCategories(data);
    }
    // Custom hook - get Categories
    const { error, loading } = useHttpGet('categories', applyData);

    // Add Category to the state
    const addCategoryHandler = (obj: any) => {
        setCategories(categories => categories.concat(obj));
    }

    // Delete Item from state
    const deleteItemHandler = (id:number) => {
        setCategories((categories) => categories.filter(category => category.id !== id));
    }

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
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="search-input">
                                <input type="text" className="form-control bg-light small" placeholder="Search category..."
                                       aria-label="Search" aria-describedby="basic-addon2" />
                            </div>

                            <div className="sort ml-2">
                               <button className="btn btn-outline-primary">
                                   <FontAwesomeIcon icon={faSortAmountDownAlt}/>
                               </button>
                            </div>
                        </div>

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
                                        categories={categories}
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