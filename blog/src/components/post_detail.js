import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPost, deletePost } from '../actions/index';

class PostDetail extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick(id) {
    this.props.deletePost(id)
      .then(() => {
        this.context.router.push('/');
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
            onClick={this.onDeleteClick.bind(this, post.id)}>
            Delete Post
          </button>
          <h3>{post.title}</h3>
          <h6>{post.categories}</h6>
          <p>{post.content}</p>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostDetail);
