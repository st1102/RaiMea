import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';

const styles = {
  img: {
    width: '160px',
    height: '100px',
  }
};

class RestInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restDetail: '',
      restPhotos: [],
    }
  }

  componentDidMount() {
    this.getRestPhoto()
  }

  getRestPhoto(){
    axios
    .get('http://0.0.0.0:3000/train/detail?id=' + this.props.restInfo.id)
    .then((results) => {
      console.log(results)
      this.setState({
        restDetail: results.data,
        restPhotos: results.data.photos,
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
        <Link to={{
            pathname: '/restaurant',
            state: {
              restInfo: this.props.restInfo,
              restDetail: this.state.restDetail,
            },
          }} >{this.props.restInfo.name}</Link>
        {this.state.restPhotos.map((restPhoto) => (
          <img className={classes.img} key={restPhoto} src={restPhoto}/>
        ))}
      </div>
    )
  }
}

RestInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestInfo);
