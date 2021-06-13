import React from 'react';
import {SyntheticEvent, useState} from "react";
import SpinnerButton from "../UI/SpinnerButton";
import {CategoryModel} from "../../models/categoryModel";
import {useHttpSend} from "../../api/use-http";

const AddCategories: React.FC<{onAddCategory: (data: {}) => void}> = (props) => {
    const [enteredCategory, setEnteredCategory] = useState('');

    // Getting the input value and sending to the state
    const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEnteredCategory(e.currentTarget.value);
    }

    // The last argument from custom hook - for sending the POST request
    const liftCategories = (data: CategoryModel) => {
        // Clear the field for the input
        setEnteredCategory('');

        // Lifting the state to the CategoriesList component
        props.onAddCategory(data);
    }

    // Custom Hook for sending POST requests
    const {sendData, error, loading} = useHttpSend('categories', {name: enteredCategory}, liftCategories);

    // Submit the form
    const submitHandler = (e:SyntheticEvent) => {
        e.preventDefault();

        // fire the http request for sending the data to the server
        sendData();
    }

    // Validation
    let addButton;
    if(enteredCategory.trim() !== '' && !loading) {
        addButton = <button type="submit" className="btn btn-primary btn-block">Add Category</button>
    } else if(loading) {
        addButton =  <SpinnerButton />;
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
                <input onChange={inputChangeHandler} value={enteredCategory} type="text" className="form-control" placeholder="Insert Category.."/>
            </div>

            {addButton}
        </form>
    );
}

export default AddCategories;