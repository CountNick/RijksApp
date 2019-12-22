import React from 'react'

const key = process.env.REACT_APP_API_KEY
const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${key}&type=schilderij&imgonly=True`

class Home extends React.Component {
  
constructor(props){
    super(props);

    this.state = {
          hits: [],
          isLoading: false
      };
  }

componentDidMount(){
    this.setState({ isLoading: true })

    fetch(url)
    .then(res => {
        return res.json()
    })
    .then(data => transformObject(data))
    .then(transformObject => this.setState({hits: transformObject, isLoading: false}))

}
  
render() {
    const { hits, isLoading } = this.state;
    
    if(isLoading){
        return <p>Loading...</p>
    }
    
    return (
      <ul>
        {hits.map(hit =>
          <li key={hit.id}>
            <a href={hit.img}><img src={hit.img} alt=""></img></a>
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