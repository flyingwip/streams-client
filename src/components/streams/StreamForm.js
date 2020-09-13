import React from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  }

  render() {
    return (
      <form
        // redux handleSubmit does the preventDefault for is
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Enter a title"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter a description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

/* if there is a error. Redux form with
 * look for the key value and pass it on component={this.renderInput}
 */

const validate = (formValues) => {
  const errors = {}
  if (!formValues.title) {
    errors.title = 'A title is required.'
  }

  if (!formValues.description) {
    errors.description = 'A description is required.'
  }

  // everything ok return empty object => {}
  return errors
}

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm)
