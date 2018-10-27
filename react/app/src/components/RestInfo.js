import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';

const styles = {

};

class RestInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restPhotoList: [],
    }
  }

  componentDidMount() {
    this.getRestPhoto()
  }

  getRestPhoto(){
    axios
    .get('http://0.0.0.0:3000/train/photo?VENUE_ID=' + this.props.restInfo.id)
    .then((results) => {
      console.log(results)
      this.setState({
        restPhotoList: results.data.response.photos.items,
      })
      console.log(this.state)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        {this.props.restInfo.name}
        {this.state.restPhotoList.map((photoInfo) => (
          <img src={photoInfo.prefix+'300x500'+photoInfo.suffix}/>
        ))}
      </div>
    )
  }
}

RestInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestInfo);
