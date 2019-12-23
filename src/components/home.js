import React from 'react';
import Popup from 'reactjs-popup';
import Painting from './painting'

const key = process.env.REACT_APP_API_KEY
const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${key}&search?p=1&ps=20&role=schilder&imgonly=True`

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
    const Modal = () => (
        <Popup
        trigger={<button className="button"> Open Modal </button>}
        modal
        closeOnDocumentClick
      >
        <span> Modal content </span>
      </Popup>
    
    );

    
    const { hits, isLoading, error } = this.state;
    
    if(error){
        return <p>{ error.message }</p>
    }

    if(isLoading){
        return <p>Loading...</p>
    }
    
    return (
      <ul>
        {hits.map(hit =>
          <li key={hit.id}>
            <Popup trigger = {< img  src={hit.img} alt=""/>}
                    modal
                    closeOnDocumentClick
                    >
            <h1>{hit.title}</h1>


            </Popup>
          </li>
        )}
      </ul>
    );
  }
}

function transformObject(data){

    const cleanedObjects  = data.artObjects.map(object => {
        //console.log(object)
        return{
            title: object.title,
            img: object.webImage.url,
            headerImage: object.headerImage.url,
            id: object.id
        }
    })
     console.log(cleanedObjects)
     return cleanedObjects
  }

export default Home