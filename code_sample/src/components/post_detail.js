import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions/index';

class PostDetail extends Component {

  componentWillMount() {
    if(!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    // you can also access id by this.props.post.id
    // but at the time delete btn get rendered, post data may not be ready,
    // however, URL is always there, so it is better to use URL params
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if(!post) {
      return <div>Loading...</div>
    }
    return (
        <div>
          <Link to="/">Go Back</Link>
          <button className="btn btn-danger float-right"
            onClick={this.onDeleteClick.bind(this)}>
            Delete Post
          </button>
          <h3>{post.title}</h3>
          <h6>Categories: {post.categories}</h6>
          <p>{post.content}</p>
        </div>
    );
  }
}

// the second parameter of mapStateToProps refer to the component's props
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostDetail);
