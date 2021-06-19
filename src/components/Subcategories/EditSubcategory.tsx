import Layout from "../Layout/Layout";
import BackButton from "../UI/BackButton";
import React, {SyntheticEvent, useEffect, useState} from "react";
import SpinnerButton from "../UI/SpinnerButton";
import {useHistory, useParams} from "react-router-dom";

const EditSubcategory = () => {
    const {id} = useParams<{id:string}>();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [enteredSubcategory, setEnteredSubcategory] = useState('');

    const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEnteredSubcategory(e.currentTarget!.value);
    }

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/admin/subcategories/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: enteredSubcategory})
            });
            await res.json();
            history.push('/subcategories');
        } catch (e) {
            // Error
        }
        setLoading(false);
    }

    useEffect(() => {
        (
            async () => {
                const res = await fetch(`http://localhost:8000/api/admin/subcategories/${id}`, {credentials: 'include'});
                const data = await res.json();
                setEnteredSubcategory(data.name);
            }
        )();
    }, [id]);

    let addButton;
    if(enteredSubcategory.trim() !== '' && !loading) {
        addButton = <button type="submit" className="btn btn-primary btn-block">Update Subcategory</button>
    } else if(loading) {
        addButton =  <SpinnerButton />;
    }  else {
        addButton = <button type="submit" className="btn btn-primary btn-block" disabled>Update Subcategory</button>
    }

    return (
        <Layout>
            <div className="col col-md-4">
                <h1 className="h4 mb-4 text-gray-800">Edit Subcategory</h1>

                <div className="card shadow p-4 mb-4">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <input onChange={inputChangeHandler} value={enteredSubcategory} type="text" className="form-control" placeholder="Insert Subcategory.."/>
                        </div>

                        {addButton}
                    </form>
                </div>

                <BackButton />
            </div>
        </Layout>
    );
}

export default EditSubcategory;