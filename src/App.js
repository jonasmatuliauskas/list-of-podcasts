import React from 'react';
import nextId from 'react-id-generator';
import AddPodcast from './AddPodcast/AddPodcast';
import NoResultMessage from './NoResultMessage/NoResultMessage';
import './App.css';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      name: '',
      youtubeLink: '',
      podcasts: []
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.addPodcastHandler = this.addPodcastHandler.bind(this);
  }

  inputChangeHandler = (event) => {
    if (event.target.name === 'name') {
      this.setState({ name: event.target.value })
    } else if (event.target.name === 'youtubeLink') {
      this.setState({ youtubeLink: event.target.value })
    }
  }

  addPodcastHandler = (event) => {
    event.preventDefault();

    const newPodcast = {
      id: nextId(),
      name: this.state.name,
      youtubeLink: this.state.youtubeLink
    }
    
    this.setState({
      name: '',
      youtubeLink: '',
      podcasts: [ 
        ...this.state.podcasts, 
        newPodcast 
      ]
    })
  }

  deletePodcastHandler = (id) => {
    const podcastIndex = this.state.podcasts.findIndex(podcast => {
      return podcast.id === id;
    });
    let copyPodcasts = [...this.state.podcasts];
    copyPodcasts.splice(podcastIndex, 1);
    
    this.setState({
      podcasts: copyPodcasts
    })
  }

  render() {
    let podcastList = null;

    if (this.state.podcasts.length > 0) {
      podcastList = (
        <ul>
          {this.state.podcasts.map((podcast, index) => {
            return <AddPodcast
              no={index}
              name={podcast.name}
              youtubeLink={podcast.youtubeLink}
              delete={this.deletePodcastHandler.bind(this, podcast.id)}
              key={podcast.id} />
            }
          )}
        </ul>
      )
    } else {
      podcastList = ( 
        <div>
          <NoResultMessage text="You don't have any podcasts." />
        </div>
      )
    }

    return (
    <div className="App">
      <div>
        <h2>Add new podcast</h2>
        <form onSubmit={this.addPodcastHandler}>
          <div>
            <label>
            Podcast name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.inputChangeHandler} 
              required
              autoFocus />
            </label>
          </div>
          <div>
            <label>
            Podcast Youtube link:
            <input
              type="text" 
              name="youtubeLink"
              value={this.state.youtubeLink}
              onChange={this.inputChangeHandler} 
              required />
            </label>
          </div>
          <div className="mt-small">
            <input type="submit" value="Add to list" />
          </div>
        </form>
      </div>
      <div>
        <h2>List of podcasts</h2>
        {podcastList}
      </div>
    </div>
    );
  }
}

export default App;
