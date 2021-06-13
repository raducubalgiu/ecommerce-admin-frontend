import React, {SyntheticEvent, useState} from "react";
import {CategoryModel} from "../../models/categoryModel";
import SpinnerButton from "../UI/SpinnerButton";
import {useHttpGet, useHttpSend} from "../../api/use-http";

const AddSubcategories: React.FC<{onAddSubcategories: (data: {}) => void;}> = (props ) => {
    const [enteredName, setEnteredName] = useState('');
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    // Getting the subcategory name from the input and update the state
    const enteredNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEnteredName(e.currentTarget.value);
    }

    // Getting the category name from the select and update the state
    const selectedCategoryHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.currentTarget.value);
    }

    // The last argument from the custom hook for fetching categories data
    const applyCategories = (data: CategoryModel[]) => {
        setCategories(data);
    }

    // Custom hook for fetching the categories (GET method)
    useHttpGet('categories', applyCategories);


    // The last argument from custom hook - for sending the POST request - Lifting the state to the SubCategoriesList component
    const liftSubcategories = (data: CategoryModel) => {
        props.onAddSubcategories(data);
    }

    // Custom Hook for sending POST requests
    const {sendData, error, loading} = useHttpSend('subcategories', {
        name: enteredName,
        category_id: selectedCategory
    }, liftSubcategories);


    // OnSubmit - sending the data
    const submitHandler = (e:SyntheticEvent) => {
        e.preventDefault();

        // fire the custom hook for sending the data to the server
        sendData();
    }

    // Validation
    let addButton;
    if(enteredName.trim() !== '' && !loading && selectedCategory !== 'selected' && selectedCategory !== '') {
        addButton = <button type="submit" className="btn btn-primary btn-block">Add SubCategory</button>
    } else if(loading) {
        addButton =  <SpinnerButton />;
    }  else {
        addButton = <button type="submit" className="btn btn-primary btn-block" disabled>Add SubCategory</button>
    }

    return (
        <form onSubmit={submitHandler}>
            {!loading && error &&
            <div className="alert alert-danger" role="alert">
                {error}
            </div>}

            <div className="form-group">
                <input onChange={enteredNameHandler} value={enteredName} type="text" className="form-control" placeholder="Insert subcategory.."/>
            </div>

            <div className="form-group">
                <select onChange={selectedCategoryHandler} className="form-select" aria-label="Default select example">
                    <option value={"selected"}>Select category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    )) }
                </select>
            </div>

            {addButton}
        </form>
    );
}

export default AddSubcategories;