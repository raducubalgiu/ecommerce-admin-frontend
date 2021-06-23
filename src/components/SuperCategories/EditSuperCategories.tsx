import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import SpinnerButton from "../UI/SpinnerButton";
import Layout from "../Layout/Layout";
import BackButton from "../UI/BackButton";

const EditSuperCategories = () => {
    const {id} = useParams<{id:string}>();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [enteredSuperCategory, setEnteredSuperCategory] = useState('');


    const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEnteredSuperCategory(e.currentTarget!.value);
    }

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/admin/supercategories/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: enteredSuperCategory})
            });
            await res.json();
            history.push('/supercategories');
        } catch (e) {
            // Error
        }
        setLoading(false);
    }

    useEffect(() => {
        (
            async () => {
                const res = await fetch(`http://localhost:8000/api/admin/supercategories/${id}`, {credentials: 'include'});
                const data = await res.json();
                setEnteredSuperCategory(data.name);
            }
        )();
    }, [id]);

    let addButton;
    if(enteredSuperCategory.trim() !== '' && !loading) {
        addButton = <button type="submit" className="btn btn-primary btn-block">Update SuperCategory</button>
    } else if(loading) {
        addButton =  <SpinnerButton className="btn btn-primary btn-user btn-block" />;
    }  else {
        addButton = <button type="submit" className="btn btn-primary btn-block" disabled>Update SuperCategory</button>
    }

    return (
        <Layout>
            <div className="col col-md-4">
                <h1 className="h4 mb-4 text-gray-800">Edit Super Category</h1>

                <div className="card shadow p-4 mb-4">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <input onChange={inputChangeHandler} value={enteredSuperCategory} type="text" className="form-control" placeholder="Insert Super Category.."/>
                        </div>

                        {addButton}
                    </form>
                </div>

                <BackButton />
            </div>
        </Layout>
    );
};

export default EditSuperCategories;