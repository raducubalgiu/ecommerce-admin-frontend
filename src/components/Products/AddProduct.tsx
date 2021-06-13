import React, {SyntheticEvent, useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Layout from "../Layout/Layout";
import BackButton from "../UI/BackButton";
import SpinnerButton from "../UI/SpinnerButton";
import {CategoryModel} from "../../models/categoryModel";
import {useHttpGet} from "../../api/use-http";

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [enteredSubCategory, setEnteredSubCategory] = useState('');
    const [enteredBrand, setEnteredBrand] = useState('');
    const [subcategories, setSubcategories] = useState<CategoryModel[]>([]);
    const [brands, setBrands] = useState<CategoryModel[]>([]);
    const history = useHistory();
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const colorRef = useRef<HTMLInputElement>(null);
    const materialRef = useRef<HTMLInputElement>(null);
    const styleRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);

    const selectedSubCategoryHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setEnteredSubCategory(e.currentTarget!.value);
    }

    const selectedBrandHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setEnteredBrand(e.currentTarget!.value);
    }

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:8000/api/admin/products', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_name: titleRef.current!.value,
                    product_image: imageRef.current!.value,
                    product_price: priceRef.current!.value,
                    subcategory_id: enteredSubCategory,
                    brand_id: enteredBrand,
                    product_description: descriptionRef.current!.value,
                    product_color: colorRef.current!.value,
                    product_material: materialRef.current!.value,
                    product_style: styleRef.current!.value
                    }
                )
            });
            await res.json();
            history.push('/products');

        } catch (e) {
           setError(e.message);
        }
        setLoading(false);
    }

    // The second argument for custom hook - fetching subcategories
    const applySubcategories = (data: CategoryModel[]) => {
        setSubcategories(data);
    }

    // Fetching subcategories for select option - relation between products and subcategories
    useHttpGet('subcategories', applySubcategories);

    // The second argument for custom hook - fetching brands
    const applyBrands = (data: CategoryModel[] ) => {
        setBrands(data);
    }

    // Fetching brands for select option - relation between products and brands
    useHttpGet('brands', applyBrands);

    let addButton = <button type="submit" className="btn btn-primary">Add SubCategory</button>;

    if(loading) {
        addButton =  <SpinnerButton />;
    }

    return (
        <Layout>
            <h1 className="h3 mb-4 text-gray-800">Add Product</h1>

            <div className="card shadow p-4 mb-4">
                <form onSubmit={submitHandler}>
                    {error && <p>{error}</p>}
                    <div className="form-group">
                        <label htmlFor="product_name">Title</label>
                        <input ref={titleRef} type="text" className="form-control" id="product_name" placeholder="Title" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_description">Description</label>
                        <input ref={descriptionRef} type="text" className="form-control" id="product_description" name="product_description" placeholder="Description" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_color">Color</label>
                        <input ref={colorRef} type="text" className="form-control" id="product_color" name="product_color" placeholder="Color" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_material">Material</label>
                        <input ref={materialRef} type="text" className="form-control" id="product_material" name="product_material" placeholder="Material" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_style">Style</label>
                        <input ref={styleRef} type="text" className="form-control" id="product_style" name="product_style" placeholder="Style" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_image">Image</label>
                        <input ref={imageRef} type="file" className="form-control form-control-file" id="product_image" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_price">Price</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input ref={priceRef} type="text" className="form-control" id="product_price" />
                        </div>
                    </div>

                    <div className="form-group">
                        <select onChange={selectedSubCategoryHandler} className="form-select">
                            <option selected value={"selected"}>Select subcategory</option>
                            {subcategories.map(subcategory => (
                                <option className="form-select" value={subcategory.id}>{subcategory.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <select onChange={selectedBrandHandler} className="form-select">
                            <option selected value={"selected"}>Select brand</option>
                            {brands.map(brand => (
                                <option className="form-select" value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>

                    {addButton}
                </form>
            </div>

            <BackButton />
        </Layout>
    );
}

export default AddProduct;