import Layout from "../components/Layout/Layout";
import AddBrand from "../components/Brands/AddBrand";
import BrandsList from "../components/Brands/BrandsList";
import {useState} from "react";
import {CategoryModel} from "../models/categoryModel";
import Spinner from "../components/UI/Spinner";
import Pagination from "../components/UI/Pagination";
import {useHttpGet} from "../api/use-http";

const Brands = () => {
    const [brands, setBrands] = useState<CategoryModel[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // The second argument from custom hook
    const applyData = (data: CategoryModel[]) => {
        setBrands(data);
    }
    // Custom Hook for GET request - fetching the brands
    const {error, loading} = useHttpGet('brands', applyData);

    // Add Brand
    const addBrandHandler = (obj: any) => {
        setBrands(brands => brands.concat(obj));
    }

    // Delete Item
    const deleteItemHandler = (id:number) => {
        setBrands((brands) => brands.filter(brand => brand.id !== id));
    }

    const filterBrandHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget?.value);
    }

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
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="search-input">
                                <input onChange={filterBrandHandler} type="text" className="form-control bg-light small" placeholder="Search brand..."
                                       aria-label="Search" aria-describedby="basic-addon2" />
                            </div>

                            <div className="sort">
                                Sort
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
                                    <BrandsList
                                        brands={brands}
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