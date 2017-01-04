import React, { Component } from 'react';
import VideoListItem from './video_list_item';

class VideoList extends Component {
  constructor(props) {
    super(props);

    // this.videoItems = props.videos.map((video) => {
    //   return <VideoListItem key={video.etag} video={video} />
    // });
    // console.log(props);
  };


  render() {
    this.videoItems = this.props.videos.map((video) => {
      return (
        <VideoListItem
          key={video.etag}
          video={video}
          onVideoSelect={this.props.onVideoSelect} />
      )
    });
    console.log(this.props.videos);
    return (
      <ul className="col-md-4 list-group">
        {this.videoItems}
      </ul>
    );
  }

}

export default VideoList;
