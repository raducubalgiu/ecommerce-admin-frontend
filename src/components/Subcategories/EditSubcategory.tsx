import Layout from "../Layout/Layout";
import BackButton from "../UI/BackButton";
import React, {SyntheticEvent, useEffect, useState} from "react";

const EditSubcategory = () => {
    return (
        <Layout>
            <div className="col col-md-4">
                <h1 className="h4 mb-4 text-gray-800">Edit Subcategory</h1>

                <div className="card shadow p-4 mb-4">
                    <form >
                        <div className="form-group">
                            <input  type="text" className="form-control" placeholder="Insert Subcategory.."/>
                        </div>


                    </form>
                </div>

                <BackButton />
            </div>
        </Layout>
    );
}

export default EditSubcategory;