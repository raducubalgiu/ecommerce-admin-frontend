import Layout from "../Layout/Layout";
import React, {SyntheticEvent, useEffect, useState} from "react";
import { useParams, useHistory } from 'react-router-dom';
import SpinnerButton from "../UI/SpinnerButton";
import BackButton from "../UI/BackButton";

const EditBrand = () => {
    const {id} = useParams<{id:string}>();
    const history = useHistory();
    const [enteredBrand, setEnteredBrand] = useState('');
    const [loading, setLoading] = useState(false);

    const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setEnteredBrand(e.currentTarget!.value);
    }

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/admin/brands/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: enteredBrand})
            });
            await res.json();
            history.push('/brands');
        } catch (e) {
            // Error
        }
        setLoading(false);
    }

    useEffect(() => {
        (
            async () => {
                const res = await fetch(`http://localhost:8000/api/admin/brands/${id}`, {credentials: 'include'});
                const data = await res.json();
                setEnteredBrand(data.name);
            }
        )();
    }, [id]);

    let addButton;
    if(enteredBrand.trim() !== '' && !loading) {
        addButton = <button type="submit" className="btn btn-primary btn-block">Update Brand</button>
    } else if(loading) {
        addButton =  <SpinnerButton />;
    }  else {
        addButton = <button type="submit" className="btn btn-primary btn-block" disabled>Update Brand</button>
    }

    return (
        <Layout>
            <div className="col col-md-4">
                <h1 className="h4 mb-4 text-gray-800">Edit Brand</h1>

                <div className="card shadow p-4 mb-4">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <input onChange={inputChangeHandler} value={enteredBrand} type="text" className="form-control" placeholder="Insert Brand.."/>
                        </div>

                        {addButton}
                    </form>
                </div>

                <BackButton />
            </div>
        </Layout>
    );
}

export default EditBrand;