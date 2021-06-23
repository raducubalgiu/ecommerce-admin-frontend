import React, {SyntheticEvent, useState} from "react";
import SpinnerButton from "../UI/SpinnerButton";
import {useHttpPost} from "../../api/use-http";
import {CategoryModel} from "../../models/categoryModel";

const AddBrand: React.FC<{onAddBrand: (data: {}) => void}> = (props) => {
    const [enteredBrand, setEnteredBrand] = useState('');

    // Getting the data from the input and update the state
    const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEnteredBrand(e.currentTarget!.value);
    }

    // The last argument from custom hook - for sending POST request
    const liftBrands = (data: CategoryModel[]) => {
        // Clear the field for the input
        setEnteredBrand('');

        // Lifting the state to the BrandsList component
        props.onAddBrand(data);
    }

    // Custom Hook for sending POST requests
    const {sendData, loading, error} = useHttpPost('brands', { name: enteredBrand }, liftBrands);

    // OnSubmit - send the request and save data in DB
    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        // fire the custom hook for sending request
        sendData();
    }

    // Validation for brand input
    let addButton;
    if(enteredBrand.trim() !== '' && !loading) {
        addButton = <button type="submit" className="btn btn-primary btn-block">Add Brand</button>
    } else if(loading) {
        addButton =  <SpinnerButton className="btn btn-primary btn-user btn-block" />;
    }  else {
        addButton = <button type="submit" className="btn btn-primary btn-block" disabled>Add Brand</button>
    }

    return (
        <form onSubmit={submitHandler}>
            {!loading && error &&
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>}

            <div className="form-group">
                <input onChange={inputChangeHandler} value={enteredBrand} type="text" className="form-control" placeholder="Insert Brand.."/>
            </div>

            {addButton}
        </form>
    );
}

export default AddBrand;