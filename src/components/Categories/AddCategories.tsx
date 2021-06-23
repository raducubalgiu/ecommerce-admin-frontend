import React from 'react';
import {SyntheticEvent, useState} from "react";
import SpinnerButton from "../UI/SpinnerButton";
import {CategoryModel} from "../../models/categoryModel";
import {useHttpGet, useHttpPost} from "../../api/use-http";

const AddCategories: React.FC<{onAddCategory: (data: {}) => void}> = (props) => {
    const [enteredName, setEnteredName] = useState('');

    // Getting the subcategory name from the input and update the state
    const enteredNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEnteredName(e.currentTarget.value);
    }

    // The last argument from custom hook - for sending the POST request - Lifting the state to the SubCategoriesList component
    const liftCategories = (data: CategoryModel) => {
        props.onAddCategory(data);
    }

    // Custom Hook for sending POST requests
    const {sendData, error, loading} = useHttpPost('categories', {
        name: enteredName
    }, liftCategories);


    // OnSubmit - sending the data
    const submitHandler = (e:SyntheticEvent) => {
        e.preventDefault();

        // fire the custom hook for sending the data to the server
        sendData();
    }

    // Validation
    let addButton;
    if(enteredName.trim() !== '' && !loading) {
        addButton = <button type="submit" className="btn btn-primary btn-block">Add Category</button>
    } else if(loading) {
        addButton =  <SpinnerButton className="btn btn-primary btn-user btn-block" />;
    }  else {
        addButton = <button type="submit" className="btn btn-primary btn-block" disabled>Add Category</button>
    }

    return (
        <form onSubmit={submitHandler}>
            {!loading && error &&
            <div className="alert alert-danger" role="alert">
                {error}
            </div>}

            <div className="form-group">
                <input onChange={enteredNameHandler} value={enteredName} type="text" className="form-control" placeholder="Insert category.."/>
            </div>

            {addButton}
        </form>
    );
}

export default AddCategories;