import React, { Component } from  'react';
import './AddBookmark.css';

export default class AddBookmark extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      url: '', 
      description: '',
      rating: 1, 
    }
  }

  // unable to edit the input fields unless I attached onChange event handlers to each input with methods to update the state when each of these inputs change?!?!
  // surely there must be an easier, more efficient way?

  titleChanged(title) {
    this.setState({
      title // aka title: 'value'
    })
  }

  urlChanged(url) {
    this.setState({
      url
    })
  }

  descriptionChanged(description) {
    this.setState({
      description
    })
  }

  ratingChanged(rating) {
    this.setState({
      rating
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="addbookmark">
        <h2>Add Bookmark</h2>
        <form className="addbookmark__form">
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" id="title" placeholder="Title" 
            value={this.state.title}
            onChange={event => this.titleChanged(event.target.value)}/>
          <label htmlFor="url">Url:</label>
          <input type="text" name="url" id="url" placeholder="url" 
            value={this.state.url}
            onChange={event => this.urlChanged(event.target.value)}/>
          <label htmlFor="description">Description:</label>
          <textarea name="description" id="description" placeholder="description" 
            value={this.state.description}
            onChange={event => this.descriptionChanged(event.target.value)}/>
          <label htmlFor="rating">Rating: </label>
          <input
            type="number"
            name="rating"
            id="rating"
            min="1"
            max="5"
            value={this.state.rating}
            onChange={event => this.ratingChanged(event.target.value)}
          />

          <div className="addbookmark__buttons">
            <button onClick={event => this.props.showForm(false)}>Cancel</button>
            <button type="submit" onClick={event => {
              event.preventDefault();
              this.props.handleAddBookmark(this.state)
            }}>Save</button>
          </div>  
        </form>
      </div>
    );
  }
}
