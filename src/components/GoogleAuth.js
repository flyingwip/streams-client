import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {
  componentDidMount() {
    // first load the needed functions
    window.gapi.load('client:auth2', () => {
      // initialize the client with the email scope
      window.gapi.client
        .init({
          clientId:
            '97228766734-mtia32i55pn4qfn00l3ftpi77gsc9vgd.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          // get a reference to the auth initialized auth object
          this.auth = window.gapi.auth2.getAuthInstance()
          // if we want to update the name on the screen
          // use state to re-render the component
          this.onAuthChange(this.auth.isSignedIn.get())

          // through the isSingedIn prototype we can access to the listen method
          this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
  }
  // set it up as a arrow function so that is context is bound to the component
  onAuthChange = (isSignedIn) => {
    isSignedIn
      ? this.props.signIn(this.auth.currentUser.get().getId())
      : this.props.signOut()
  }

  onSignInClick = () => this.auth.signIn()

  onSignOutClick = () => this.auth.signOut()

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      )
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)
