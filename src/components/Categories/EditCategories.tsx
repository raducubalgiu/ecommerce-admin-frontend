import Layout from "../Layout/Layout";
import BackButton from "../UI/BackButton";
import React, {SyntheticEvent, useEffect, useState} from "react";
import SpinnerButton from "../UI/SpinnerButton";
import {useHistory, useParams} from "react-router-dom";

const EditCategories = () => {
    const {id} = useParams<{id:string}>();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [enteredCategory, setEnteredCategory] = useState('');


    const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEnteredCategory(e.currentTarget!.value);
    }

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/admin/categories/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: enteredCategory})
            });
            await res.json();
            history.push('/categories');
        } catch (e) {
            // Error
        }
        setLoading(false);
    }

    useEffect(() => {
        (
            async () => {
                const res = await fetch(`http://localhost:8000/api/admin/categories/${id}`, {credentials: 'include'});
                const data = await res.json();
                setEnteredCategory(data.name);
            }
        )();
    }, [id]);

    let addButton;
    if(enteredCategory.trim() !== '' && !loading) {
        addButton = <button type="submit" className="btn btn-primary btn-block">Update Category</button>
    } else if(loading) {
        addButton =  <SpinnerButton className="btn btn-primary btn-user btn-block" />;
    }  else {
        addButton = <button type="submit" className="btn btn-primary btn-block" disabled>Update Category</button>
    }

    return (
        <Layout>
            <div className="col col-md-4">
                <h1 className="h4 mb-4 text-gray-800">Edit Category</h1>

                <div className="card shadow p-4 mb-4">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <input onChange={inputChangeHandler} value={enteredCategory} type="text" className="form-control" placeholder="Insert Category.."/>
                        </div>

                        {addButton}
                    </form>
                </div>

                <BackButton />
            </div>
        </Layout>
    );
}

export default EditCategories;