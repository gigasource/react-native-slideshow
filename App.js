/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import {
  SlideShow,
  convertToReactAnimation,
  SUPPORTED_IMAGE,
  SUPPORTED_VIDEO
} from './src';
import _ from 'lodash';

let timeCount = 0;
setInterval(() => {
  timeCount += 1;
}, 200);

function normalize(playlist) {
  return playlist.map(play => {
    let _play = _.cloneDeep(play);
    if (SUPPORTED_VIDEO.includes(_play.media.ext)) _play.media.type = 'video';
    if (SUPPORTED_IMAGE.includes(_play.media.ext)) _play.media.type = 'image';
    _play.media.source = _play.media.src;
    _play.effect = convertToReactAnimation(_play.effect)
    return _play;
  })
}

export default class TestApp extends React.Component {

  constructor(props) {
    super(props);
    this.count = 0;
    this.state = {
      currentPlayList: normalize([
        { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'fadeIn', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'fadeInUpBig', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'fadeInDownBig', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'fadeInLeftBig', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'fadeInRightBig', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'bounceIn', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'bounceInUp', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'bounceInDown', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'bounceInLeft', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'bounceInRight', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'zoomIn', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'zoomInDown', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'zoomInUp', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'zoomInLeft', duration: 2900 },
        // { media: { name: 'src3', src: 'https://cdn.cnn.com/cnnnext/dam/assets/200311211631-donald-trump-oval-office-march-11-2020-04-super-tease.jpg', ext: '.jpg' }, effect: 'zoomInRight', duration: 2900 },
        { media: { name: 'src6', src: 'https://pmcvariety.files.wordpress.com/2019/03/trump-1.jpg?w=1000&h=563&crop=1', ext: '.jpg' }, effect: 'zoomIn', duration: 5000 },
        { media: { name: 'src7', src: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg', ext: '.jpg' }, effect: 'zoomIn', duration: 5000 },
        { media: { name: 'src1', src: 'https://www.w3schools.com/html/mov_bbb.mp4', ext: '.mp4' }, effect: 'slideInLeft' },
        { media: { name: 'src1', src: 'https://www.w3schools.com/html/mov_bbb.mp4', ext: '.mp4' }, effect: 'slideInLeft' },
        { media: { name: 'src4', src: 'https://cdn.vox-cdn.com/thumbor/EkmIcicIZE54-6FFYUGUu3T2VP8=/0x0:5376x3694/1200x800/filters:focal(2913x1187:3773x2047)/cdn.vox-cdn.com/uploads/chorus_image/image/66063202/1175942533.jpg.0.jpg', ext: '.jpg' }, effect: 'zoomIn', duration: 5000 },
        { media: { name: 'src2', src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4', ext: '.mp4' }, effect: 'slideInLeft' },
        { media: { name: 'src5', src: 'https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_1MB.mp4', ext: '.mp4' }, effect: 'slideInLeft', duration: 0 }
      ]),
      currentContentIndex: 0,
    };
    this.status = [];
    this.slideShowRef = React.createRef();
    this.preTime = null;
  }

  setNextContentCallback() {
    // let { currentIndex } = this.state;
    this.setState({ currentContentIndex: (this.state.currentContentIndex + 1) % this.state.currentPlayList.length });
  }

  round(_time) {
    return _time - _time % 100;
  }

  render() {
    if (this.slideShowRef.current) {
      if (!this.preTime) this.preTime = timeCount;
      const nodeFlag = this.slideShowRef.current.nodeFlag;
      let currentSource = this.slideShowRef.current.props.currentContent.media.source;
      let currentType;
      let nextSource = this.slideShowRef.current.props.nextContent.media.source;
      let nextType;
      if (this.slideShowRef.current.props.currentContent.media.type === 'video') {
        currentType = 'video';
      } else if (this.slideShowRef.current.props.currentContent.media.type === 'image') {
        currentType = 'image';
      }
      if (this.slideShowRef.current.props.nextContent.media.type === 'video') {
        nextType = 'video';
      } else if (this.slideShowRef.current.props.nextContent.media.type === 'image') {
        nextType = 'image';
      }
      this.status.push({
        count: this.count + 1,
        nodeFlag: nodeFlag,
        current: {
          source: currentSource,
          type: currentType
        },
        next: {
          source: nextSource,
          type: nextType
        },
        duration: (timeCount - this.preTime) * 200,
      });
      this.preTime = timeCount;
      this.count += 1;
    }
    let { currentContentIndex, currentPlayList } = this.state;
    let currentContent = currentPlayList[currentContentIndex];
    let nextContent = currentPlayList[(currentContentIndex + 1) % currentPlayList.length];
    return (
      <SlideShow key={2} ref={this.slideShowRef} currentContent={currentContent} nextContent={nextContent} setNextContentCallback={this.setNextContentCallback.bind(this)}/>);
  }
}
