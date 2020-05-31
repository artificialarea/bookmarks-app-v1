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
  // surely there must be an easier, more efficient way, no?

  titleChanged(title) {
    this.setState({
      title // ala title: 'value'
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

  handleSubmit(event) {
    event.preventDefault();
    const {title, url, description, rating} = this.state;
    const bookmark = {title, url, description, rating};
    const urlFetch = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
    const options = {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        "Authorization": "Bearer $2a$10$Y69Ld.zBy31musESl98VHOs1ZUlvHDWAJ4rRE9uSNl9gO7ZvBB0WS",
        "Content-Type": "application/json",
      }
    };
    console.log(this.state)
    fetch(urlFetch, options)
      .then(response => {
        if(!response.ok) {
          throw new Error ('Something went wrong. Please try again later.')
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          title: '',
          url: '',
          description: '',
          rating: 1,
        });
        this.props.handleAddBookmark(bookmark);
      })
      .catch(err => {
        console.log(err.message);
        this.setState({
          error: err.message
        })
      });


  }

  render() {
    // console.log(this.state)
    const error = this.state.error
      ? <div className="error">{this.state.error}</div>
      : '';

    return (
      <div className="addbookmark">
        <h2>Add Bookmark</h2>
        { error }
        <form 
          className="addbookmark__form" 
          onSubmit={event => this.handleSubmit(event)}
        >
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
            <button type="submit">Save</button>
            {/* This does indeed update App state, but as it doesn't POST data back to API, it's useless */}
            {/* <button type="submit" onClick={event => {
              event.preventDefault();
              this.props.handleAddBookmark(this.state)
            }}>Save</button> */}
          </div>  
        </form>
      </div>
    );
  }
}
