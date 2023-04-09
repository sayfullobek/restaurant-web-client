import React from 'react'

export const Pagination = ({perPage, totalData, paginate}) => {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(totalData / perPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number + 1)} className="page-link" style={{cursor: 'pointer'}}>
                            {number + 1}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}