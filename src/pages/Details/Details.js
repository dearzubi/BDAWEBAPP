import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import moment from 'moment';
import List from "./ListComponent";

import "./Details.css";

export default function Details() {

  let { id } = useParams();
  
  const [document, setDocument] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // console.log(id);
    axios.get('/api/lookup?id=' + id)
      .then(response => {
      
        const doc = response.data.document;
    
        setDocument(doc);
        
        setIsLoading(false);
      })
      .catch(error => {
      
        console.log(error);
        setIsLoading(false);
      });

  }, [id]);

  // View default is loading with no active tab
  if (!isLoading && document) {
    let image_src = "/images/categories/"+document?.category+".jpg"
    let author = document?.author
    if(author === "" || author == null){
      author = "Unknown"
    }

    let link = ""
    if(document?.id.length > 30){
      let id_len = atob(document?.id).length
      link = atob(document?.id).substr(0, id_len -4 ) + atob(document?.id).slice(-4).replace(/[0-9]/g, "")

    }

    
    
    return (

      <main className="main main--details container fluid">
        <div className="card text-center result-container">
          <div className="card-header main-box">
            <div className="card-body d-flex flex-column p-0">
              <h5 className="card-title bold">{document?.title?.replace(/[^A-Za-z0-9 ,]/g, "")}</h5>
              <p className="card-text">
                <span className='newspaper-info'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill icon" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  </svg>
                  {author}
                </span> 
                <span className='newspaper-info'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-newspaper icon" viewBox="0 0 16 16">
                    <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
                    <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>
                  </svg>
                  {document?.publication}
                </span>
                <span className='newspaper-info'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event-fill icon" viewBox="0 0 16 16">
                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                  {moment(document?.date).format('ll')}
                </span>
               </p>
              <img className="img-top" src={image_src} alt={document?.title?.replace(/[^A-Za-z0-9 ,]/g, "")}></img>
              <div className="summery-text mt-1">
                <span className='bold'>Summary: </span>
                <span>{document?.summary}</span>
              </div>
              <div className="summery-text mt-1">
                <span className='bold'>Content: </span>
                <span>
                  {document?.content.replace(/[^A-Za-z0-9 ,]/g, "")}

                  {link.length > 20 &&
                    <span className="read-externel">
                      <a href={link} rel="noreferrer" target="_blank">Read Original Content <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill icon" viewBox="0 0 16 16">
                        <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
                        </svg>
                      </a>
                    </span>
                  }
                </span>
              </div>
              <List title={"Categories"} list={[document?.category]}/>
              <List title={"Sentiments"} list={[document?.sentiment]}/>
              <List title={"Locations"} list={document?.locations}/>
              <List title={"Organizations"} list={document?.organizations}/>
              <List title={"Persons"} list={document?.persons}/>
              <List title={"Key Phrases"} list={document?.keyPhrases?.map((ph)=>ph.replace(/[^A-Za-z0-9 ,]/g, "")).filter(ph=>ph.split(' ').length>2)}/>
              
                        
    
          </div>
          
          </div>
        </div>
      </main>
    );
  }else{
    return (
      <div className="col-md-9 progress">
        <CircularProgress />
      </div>
    );
  }

}

