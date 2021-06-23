import {CategoryModel} from "../../models/categoryModel";
import { useHttpGet } from "../../api/use-http";
import classes from "../../pages/Subcategories.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusSquare} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import Spinner from "../UI/Spinner";

const SubcategoriesList = (props: {subcategories: CategoryModel[]}) => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    const applyCategories = (data:any) => {
        setCategories(data);
    }

    const { loading } = useHttpGet('categories', applyCategories);

    return (
        <>
            {!loading && <ul className={classes['list-group']}>
                {categories.map((category) => (
                    <li className={classes['main-list']} key={category.id}>
                        <button className="btn btn-block btn-primary">
                            <div className="d-flex align-items-center justify-content-between p-1">
                                <div className="placeholder">{category.name}</div>
                                <div className="icon"><FontAwesomeIcon icon={faMinusSquare} /></div>
                            </div>
                        </button>

                        <ul className="second-list mb-2">
                            {props.subcategories.filter(subcategory => subcategory.category_id === category.id).map(subcategory => (
                                <li key={subcategory.id} className={classes['second-list-item']}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="placeholder">
                                            {subcategory.name}
                                        </div>
                                        <div className="buttons-group">
                                            <button className="btn btn-sm btn-info">Edit</button>
                                            <button className="btn btn-sm btn-danger">Delete</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>}
            {loading && <Spinner />}
        </>
    );
}

export default SubcategoriesList;