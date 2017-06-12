import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
// reduxForm is a function helper, reduxForm and connect are almost identical
// we need to use reduxForm function to wrap PostsNew component

class PostsNew extends Component {

  onFormSubmit(values) {
    // this === component
    // pass in two parameters to action creator and call the callback manually
    this.props.createPost(values, () => {
      // blog post successfully created
      // Route gives this component a history property
      this.props.history.push('/');
    });
  }

  renderField(field) {
    // field.input has props and event handlers
    // field.meta.error === errors.fieldName <string>
    const { meta: { touched, error } } = field;
    // const { touched, error } = field.meta;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }
  render() {
    const { handleSubmit } = this.props; // handleSubmit is given by reduxForm to this.porps
    // Each field === each state of this form
    // component on the Field takes a function or a component helps on UI, where Field is only a data wrapper, not a UI component
    // any attribute we give Field will be attached to field which get passed into component function
    return (
      <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        <Field
          label="Title" name="title" component={this.renderField}
        />
        <Field
          label="Categories" name="categories" component={this.renderField}
        />
        <Field
          label="Post Content" name="content" component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title:'asf', categories:'afwg', content:'asgeb' }
  const errors = {};

  // validate the inputs from 'values'
  if(!values.title || values.title.length < 3){
    errors.title = 'Please enter a title that is at least 3 characters';
  }
  if(!values.categories){
    errors.categories = 'Please enter a categories';
  }
  if(!values.content){
    errors.content = 'Please enter a content';
  }

  // if errors is empty, the form is fine to submit
  // if errors has *any* property, redux form assume form is invalid
  return errors;
}

// Redux-Form is just responsible for handling state and validation
// It is not responsible for taking data and save somewhere ot posting to server behavior
// reduxForm( formConfig, mapStateToProps, mapDispatchToProps )
export default reduxForm({
  form: 'PostsNewForm',
  // the form key must be the same as what we define in reducer
  // the form value is form's name, can be any value, does not need to == component's name, but has to be unique
  validate
})(
  connect(null, { createPost })(PostsNew)
);
