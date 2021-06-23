import React, {SyntheticEvent, useState} from "react";
import {CategoryModel} from "../../models/categoryModel";
import SpinnerButton from "../UI/SpinnerButton";
import {useHttpGet, useHttpPost} from "../../api/use-http";

const AddSubcategories = () => {
    const [enteredName, setEnteredName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | number>('');
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    // Getting the subcategory name from the input and update the state
    const enteredNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEnteredName(e.currentTarget.value);
    }
    const selectedCategoryHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.currentTarget!.value);
    }

    // Fetching categories
    const applyCategories = (data: any) => {
        setCategories(data);
    }

    useHttpGet('categories', applyCategories);

    // Sending data
    const {sendData, loading, error} = useHttpPost('subcategories', {
        name: enteredName,
        category_id: selectedCategory
    }, null);

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();

        sendData();
    }
    // Validation
    let addButton;

    if(enteredName.trim() !== '' && !loading && selectedCategory !== 'selected' && selectedCategory > 0) {
        addButton = <button type="submit" className="btn btn-primary btn-block">Add Subcategory</button>
    } else if(loading) {
        addButton =  <SpinnerButton className="btn btn-primary btn-user btn-block" />;
    }  else {
        addButton = <button type="submit" className="btn btn-primary btn-block" disabled>Add Category</button>
    }

    return (
        <form onSubmit={submitHandler}>
            {!loading && error && <div className="alert alert-danger" role="alert">
                <p>{error}</p>
            </div>}

            <div className="form-group">
                <input onChange={enteredNameHandler} type="text" className="form-control" placeholder="Insert subcategory.."/>
            </div>

            <div className="form-group">
                <select onChange={selectedCategoryHandler} className="form-select">
                    <option selected value={"selected"}>Select Category</option>
                    {categories.map(category => (
                        <option className="form-select" value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            {addButton}
        </form>
    );
}

export default AddSubcategories;