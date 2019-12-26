import React from 'react';
import Popup from 'reactjs-popup';
import Painting from '../painting';
import Loading from '../loading';

const key = process.env.REACT_APP_API_KEY
const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${key}&search?p=1&ps=20&role=schilder&imgonly=True`
let query = '20'

class Home extends React.Component {
  
constructor(props){
    super(props);
    
    this.state = {
          objects: [],
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
    .then(transformObject => this.setState({objects: transformObject, isLoading: false}))
    .catch(error => this.setState({ error, isLoading: false }));

}
  
render() {
    
    const { objects, isLoading, error } = this.state;
    
    if(error){
        return <p>{ error.message }</p>
    }

    if(isLoading){
        return <Loading/>
    }
    
    return (
      
        <div className = "grid-container">
        {objects.map(object =>
          
            <div key = {object.id}>
            <Popup trigger = {< img src={object.headerImg} alt="hi"/>}
                    modal
                    closeOnDocumentClick
            >
            <div className="modal">
            
            <div className="content">
                <Painting painting = {object} />
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