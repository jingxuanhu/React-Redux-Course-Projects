import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { createPost } from '../actions/index';
// reduxForm and connect are almost identical
// we need to use reduxForm function to wrap PostsNew component

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post successfully created, we use this.context.router.push
        // to navigate to index page
        this.context.router.push('/');
      });
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    // these variables are on Redux application state, they are diff from plain form fields
    // redux-form gives them extra properties and methods
    // we need to pass these objects into our React form component
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>
        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title){
    errors.title = 'Please enter a title';
  }
  if(!values.categories){
    errors.categories = 'Please enter a categories';
  }
  if(!values.content){
    errors.content = 'Please enter a content';
  }

  return errors;
}

// reduxForm( formConfig, mapStateToProps, mapDispatchToProps )
export default reduxForm({
  form: 'PostsIndexForm',
  // the form key must be the same as what we define in reducer
  // the form value can be any value, does not need to == component's name
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
// behind the scene, these fields are set on application state.
// redux-form pull up the user input from component level state
// onto application level state
