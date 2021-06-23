import React, {SyntheticEvent, useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Layout from "../Layout/Layout";
import BackButton from "../UI/BackButton";
import {CategoryModel} from "../../models/categoryModel";
import {useHttpGet, useHttpPost} from "../../api/use-http";
import SpinnerButton from "../UI/SpinnerButton";

const COLORS = [{name: 'red'}, {name: 'orange'}, {name: 'yellow'}, {name: 'green'}, {name: 'blue'}, {name: 'purple'}, {name: 'pink'}, {name: 'brown'}, {name: 'gray'}, {name: 'black'}, {name: 'white'}];
const STYLES = [{name: 'Casual'}, {name: 'Office'}];
const MATERIALS = [{name: 'Cotton'}, {name: 'Denim'}, {name: 'In'}, {name: 'Poliester'}, {name: 'Reiat'}, {name: 'Synthetic'}];

const AddProduct = () => {
    const [supercategories, setSuperCategories] = useState<CategoryModel[]>([]);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [subcategories, setSubcategories] = useState<CategoryModel[]>([]);
    const [brands, setBrands] = useState<CategoryModel[]>([]);
    const [title, setTitle] = useState('');
    const [material, setMaterial] = useState('');
    const [style, setStyle] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [superCategory, setSuperCategory] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [brand, setBrand] = useState('');
    const history = useHistory();

    const selectedSupercategoryHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setSuperCategory(e.currentTarget!.value);
    }
    const selectedCategoryHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget!.value);
    }
    const selectedSubcategoryHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setSubCategory(e.currentTarget!.value);
    }
    const selectedBrandHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setBrand(e.currentTarget!.value);
    }
    const selectedColorHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setColor(e.currentTarget!.value);
    }
    const selectedStyleHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setStyle(e.currentTarget!.value);
    }
    const selectedMaterialHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setMaterial(e.currentTarget!.value);
    }

    // Fetching Super Categories
    const applySuperCategories = (data: CategoryModel[]) => {
        setSuperCategories(data);
    }
    useHttpGet('supercategories', applySuperCategories);

    // Fetching Categories
    const applyCategories = (data: CategoryModel[]) => {
        setCategories(data);
    }
    useHttpGet('categories', applyCategories);

    // Fetching Sub Categories
    const applySubcategories = (data: CategoryModel[]) => {
        setSubcategories(data);
    }
    useHttpGet('subcategories', applySubcategories);

    // Fetching Brands
    const applyBrands = (data: CategoryModel[] ) => {
        setBrands(data);
    }
    useHttpGet('brands', applyBrands);

    const applyData = (data: any) => {
        history.push('/products');
    }

    // Sending data
    const { sendData, loading } = useHttpPost('products', {
        product_name: title,
        product_image: image,
        product_price: price,
        supercategory_id: superCategory,
        category_id: category,
        subcategory_id: subCategory,
        brand_id: brand,
        product_color: color,
        product_material: material,
        product_style: style

    }, applyData);

    // Submit Handler - send data
    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        sendData();
    }

    // Validation for brand input
    let addButton = <button type="submit" className="btn btn-primary">Add Brand</button>;

    if(loading) {
        addButton = <SpinnerButton className="btn btn-primary btn-user" />
    }

    return (
        <Layout>
            <h1 className="h3 mb-4 text-gray-800">Add Product</h1>

            <div className="card shadow p-4 mb-4">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="product_name">Title</label>
                        <input onChange={e => setTitle(e.target.value)} type="text" className="form-control" id="product_name" placeholder="Title" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_image">Image</label>
                        <input onChange={e => setImage(e.target.value)} type="file" className="form-control form-control-file" id="product_image" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_price">Price</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input onChange={e => setPrice(e.target.value)} type="text" className="form-control" id="product_price" />
                        </div>
                    </div>

                    <div className="form-group">
                        <select onChange={selectedMaterialHandler} className="form-select">
                            <option selected value={"selected"}>Select material</option>
                            {MATERIALS.map(material => (
                                <option className="form-select" value={material.name}>{material.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <select onChange={selectedStyleHandler} className="form-select">
                            <option selected value={"selected"}>Select style</option>
                            {STYLES.map(style => (
                                <option className="form-select" value={style.name}>{style.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <select onChange={selectedColorHandler} className="form-select">
                            <option selected value={"selected"}>Select color</option>
                            {COLORS.map(color => (
                                <option className="form-select" value={color.name}>{color.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <select onChange={selectedSupercategoryHandler} className="form-select">
                            <option selected value={"selected"}>Select supercategory</option>
                            {supercategories.map(supercategory => (
                                <option className="form-select" value={supercategory.id}>{supercategory.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <select onChange={selectedCategoryHandler} className="form-select">
                            <option selected value={"selected"}>Select Category</option>
                            {categories.map(category => (
                                <option className="form-select" value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <select onChange={selectedSubcategoryHandler} className="form-select">
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