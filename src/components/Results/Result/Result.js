import React from 'react';

import './Result.css';

export default function Result(props) {
    let title = props.document.title.replace(/[^A-Za-z0-9 ,]/g, "")
    let summary = props.document.summary.replace(/[^A-Za-z0-9 ,]/g, "").substring(0, 100) + "...."
    let image_src = "/images/categories/"+props.document.category+".jpg"
    
    return(
    <div className="card result">
        <a href={`/details/${props.document.id}`}>
            <img className="card-img-top" src={image_src} alt={title}></img>
            <div className="card-body">
                <h6 className="title-style">{title}</h6>
                <p className="summary-style">{summary}</p>
            </div>
        </a>
    </div>
    );
}
