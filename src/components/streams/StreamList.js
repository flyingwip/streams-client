import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions'

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams()
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      )
    }
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            EDIT
          </Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button red">
            DELETE
          </Link>
        </div>
      )
    }
  }

  renderList = (list) => {
    return list.map((item) => {
      return (
        <div className="item" key={item.id}>
          {this.renderAdmin(item)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {item.id} - {item.title}
            <div className="description">{item.description}</div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h2>StreamList</h2>
        <div className="ui celled list">
          {this.renderList(this.props.streams)}
        </div>
        {this.renderCreate()}
      </div>
    )
  }
}

const mapStateTopProps = (state) => {
  // convert the object into array
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  }
}

export default connect(mapStateTopProps, { fetchStreams })(StreamList)
