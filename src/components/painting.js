import React from 'react';

class Painting extends React.Component {
  render() {
  return (
    <React.Fragment>

        <div className="header"><h1>{this.props.painting.title}</h1></div>
    
        <h3>Schilder: {this.props.painting.creator}</h3>
    
        < img src={this.props.painting.img} alt={this.props.painting.title}/>
    
        <h4>Volledige titel: {this.props.painting.compTitle}</h4>
    
    </React.Fragment>

    )
  }
}
export default Painting