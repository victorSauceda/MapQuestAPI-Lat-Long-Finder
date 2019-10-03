import React from 'react';
import axios from 'axios';
//styling to take out buller points from unordered list
let styles = {
  listStyle: "none"
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      lat: '',
      lng: '',
      mapUrlImgLocation: '',
      readyToRenderLatLng: false
    }
  }
  //handling a change to reset state when a user is enter text into an input box
  handleChanger(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    //posting the url using the mapquest api and a apiKey.NOTE:key must be passed in the URL and not as a paramter due to CORS Policy or this will return error
    axios.post('https://www.mapquestapi.com/geocoding/v1/address?key=6LxrQiGhFDzHxicvwonMCrUjzn9SY1yb', {
      location: this.state.location
    })
      .then((response) => {
        ///grabbing the response data from the mapquest API
        let geoLocationForLat = response.data.results[0].locations[0].latLng.lat;
        let geoLocationForLng = response.data.results[0].locations[0].latLng.lng;
        let locationForMapUrl = response.data.results[0].locations[0].mapUrl

        //setting the state with the data grabbed from the mapquest API
        this.setState({ lat: geoLocationForLat, lng: geoLocationForLng, mapUrlImgLocation: locationForMapUrl, readyToRenderLatLng: true })

      })
      .catch((error) => {
        console.log(error)
      }
      )
  }
  render() {
    return (
      <div className="Location">
        <form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
          <input name='location' type="text" placeholder='enter address' value={this.state.location} onChange={this.handleChanger.bind(this)} />
          <input type="submit" />
        </form>
        {/* conditional rendering(to only be rendered if ready to render state is true. this helps circumvent the issue of the lat and long list items be displayed when the page intially renders) */}
        {this.state.readyToRenderLatLng &&
          <div>
            <ul style={styles}>
              <li>Lat:{this.state.lat}</li>
              <li>Lng:{this.state.lng}</li>
            </ul>
            <img src={this.state.mapUrlImgLocation} alt='mapquest map' />
          </div>
        }
      </div>
    );
  }
}
export default Register;