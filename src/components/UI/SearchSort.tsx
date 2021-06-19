import React, {useState} from 'react';
import {Filters} from "../../models/filtersModel";
import {CategoryModel} from "../../models/categoryModel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountUpAlt, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import {ProductsModel} from "../../models/productsModel";

const SearchSort = (props: {
    items: CategoryModel[] | ProductsModel[]
    filters: Filters;
    setFilters: (filters: Filters) => void
}) => {

    const [sort, setSort] = useState(true);

    const searchHandler = (s: string) => {
        props.setFilters({
            ...props.filters,
            s
        });
    }

    const sortHandler = () => {
        setSort((sort) => !sort);

        props.setFilters({
            ...props.filters,
            sort
        })
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="search-input me-4">
                    <input  onChange={e => searchHandler(e.target.value)} type="text" className="form-control bg-light small" placeholder="Search brand..."
                            aria-label="Search" aria-describedby="basic-addon2" />
                </div>

                <div className="sort">
                    <button onClick={sortHandler} className="btn btn-outline-primary">
                        {!sort && <FontAwesomeIcon icon={ faSortAmountUpAlt } className="icon-sort" />}
                        {sort && <FontAwesomeIcon icon={ faSortAmountDown } className="icon-sort" />}
                    </button>
                </div>
            </div>
        </>
    );
};

export default SearchSort;