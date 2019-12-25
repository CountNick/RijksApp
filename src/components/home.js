import React from 'react';
import Popup from 'reactjs-popup';
import Painting from './painting';
import Loading from './loading';

const key = process.env.REACT_APP_API_KEY
const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${key}&search?p=1&ps=20&role=schilder&imgonly=True`
let query = '20'

class Home extends React.Component {
  
constructor(props){
    super(props);
    
    this.state = {
          hits: [],
          isLoading: false,
          error: null
      };
  }

componentDidMount(){
    this.setState({ isLoading: true })

    fetch(url)
    .then(res => {
        if(res.ok){
        return res.json()
        } else {
            throw new Error ('Oopsie daysie, something went wrong')
        }
    })
    .then(data => transformObject(data))
    .then(transformObject => this.setState({hits: transformObject, isLoading: false}))
    .catch(error => this.setState({ error, isLoading: false }));

}
  
render() {
    
    const { hits, isLoading, error } = this.state;
    
    if(error){
        return <p>{ error.message }</p>
    }

    if(isLoading){
        return <p>Loading...</p>
    }
    
    return (
      
        <div class = "grid-container">
        {hits.map(hit =>
          
          <div key={hit.id}>
            <Popup trigger = {< img src={hit.headerImg} alt="hi"/>}
                    modal
                    closeOnDocumentClick
            >
            <div className="modal">
                
            <div className="header"><h1>{hit.title}</h1></div>
            
            <div className="content">
            <h3>Schilder: {hit.creator}</h3>
            <img className
            ="popup-img" src = {hit.img} alt = {hit.title}/>
            <h4>Volledige titel: {hit.compTitle}</h4>
            </div>

            </div>

            </Popup>
          </div>
          
        )}
        <button>Laad meer</button>
        </div>
    );
  }
}

function transformObject(data){

    const cleanedObjects  = data.artObjects.map(object => {
        //console.log(object)
        return{
            title: object.title,
            compTitle: object.longTitle,
            img: object.webImage.url,
            headerImg: object.headerImage.url,
            id: object.id,
            creator: object.principalOrFirstMaker,

        }
    })
     console.log(cleanedObjects)
     return cleanedObjects
  }

export default Home