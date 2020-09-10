import React from 'react'
// reduxForm == connect
import { Field, reduxForm } from 'redux-form'

class StreamCreate extends React.Component {
  renderInput({ input }) {
    return <input {...input} />
  }

  render() {
    return (
      <form>
        <Field name="title" component={this.renderInput} />
        <Field name="description" component={this.renderInput} />
      </form>
    )
  }
}

// redux forms takes only a single argument
// a configuration
// at present we only need to provide a name
// now the component has a ton of props
export default reduxForm({
  form: 'streamCreate',
})(StreamCreate)
