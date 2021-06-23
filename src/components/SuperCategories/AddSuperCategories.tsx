import React, {SyntheticEvent, useState} from 'react';
import SpinnerButton from "../UI/SpinnerButton";
import {useHttpPost} from "../../api/use-http";
import {CategoryModel} from "../../models/categoryModel";

const AddSuperCategories: React.FC<{onAddSuperCategories: (data: {}) => void}> = (props ) => {
    const [enteredSuperCategory, setEnteredSuperCategory] = useState('');

    // Getting the input value and sending to the state
    const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEnteredSuperCategory(e.currentTarget.value);
    }

    // The last argument from custom hook - for sending the POST request
    const liftSuperCategories = (data: CategoryModel) => {
        // Clear the field for the input
        setEnteredSuperCategory('');

        // Lifting the state to the CategoriesList component
        props.onAddSuperCategories(data);
    }

    // Custom Hook for sending POST requests
    const {sendData, error, loading} = useHttpPost('supercategories', {name: enteredSuperCategory}, liftSuperCategories);

    // Submit the form
    const submitHandler = (e:SyntheticEvent) => {
        e.preventDefault();

        // fire the http request for sending the data to the server
        sendData();
    }

    // Validation
    let addButton;
    if(enteredSuperCategory.trim() !== '' && !loading) {
        addButton = <button type="submit" className="btn btn-primary btn-block">Add Supercategory</button>
    } else if(loading) {
        addButton =  <SpinnerButton className="btn btn-primary btn-user btn-block" />;
    }  else {
        addButton = <button type="submit" className="btn btn-primary btn-block" disabled>Add Supercategory</button>
    }

    return (
        <form onSubmit={submitHandler}>
            {!loading && error &&
            <div className="alert alert-danger" role="alert">
                {error}
            </div>}

            <div className="form-group">
                <input onChange={inputChangeHandler} value={enteredSuperCategory} type="text" className="form-control" placeholder="Insert Supercategory.."/>
            </div>

            {addButton}
        </form>
    );
}

export default AddSuperCategories;