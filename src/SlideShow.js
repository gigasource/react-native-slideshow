import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Slide from './Slide';
import ReactPlayer from 'react-player';
import * as Animatable from 'react-native-animatable';

function getDeviceDimensions() {
  return {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  };
}

class SlideShow extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.nodeFlag = true;
    this.slide = [{ step: 'next' }, { step: 'next' }];
    this.videoSlide = {
      opacity: 0,
      source: null,
    };
    this.isPlaying = false;
    this.preRender(props);
    this.videoRef = React.createRef();
  }
  onBeforeFinish({ playedSeconds }) {
    let { currentContent, setNextContentCallback } = this.props;
    if (currentContent.media.type === 'video' && currentContent.duration && currentContent.duration !== 0 && this.isPlaying) {
      if (playedSeconds * 1000 >= currentContent.duration) {
        setNextContentCallback();
        this.isPlaying = false;
      }
    }
  }
  setOnLoad() {
    this.setState({
      isLoading: false
    });
    this.isPlaying = true;
  }
  preRender(props) {
    let { currentContent, nextContent, setNextContentCallback } = props;
    if (currentContent.media.type === 'image') {
      this.nodeFlag = !this.nodeFlag;
      this.slide[Number(this.nodeFlag)] = {
        content: currentContent,
        step: 'current',
        cb: setNextContentCallback,
        animation: currentContent.effect
      };
      this.slide[Number(!this.nodeFlag)].step = 'next';
      this.videoSlide = {
        opacity: 0,
        source: null
      }
    } else {
      if (currentContent.media.type === 'video') {
        const lastSrc = this.videoSlide.source;
        this.videoSlide = {
          opacity: 100,
          source: currentContent.media.source
        };
        if (lastSrc === this.videoSlide.source) this.videoRef.current.seekTo(0, 'seconds');
      }
      this.slide[Number(this.nodeFlag)].step = 'next';
    }
    this.slide[Number(!this.nodeFlag)].content = null;
    if (nextContent.media.type === 'video' && currentContent.media.type !== 'video') {
      this.videoSlide = {
        opacity: 0,
        source: nextContent.media.source
      };
    }
  }
  UNSAFE_componentWillReceiveProps(props) {
    this.preRender(props);
    this.setState({
      isLoading: true
    });
  }
  render() {
    const { currentContent, setNextContentCallback } = this.props;
    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Slide key={'slide0'}
               key2={'slide0'}
               content={this.slide[0].content}
               animation={this.slide[0].animation}
               step={this.slide[0].step}
               onFinish={this.slide[0].cb}
               getDeviceDimensions={getDeviceDimensions}/>
        <Slide key={'slide1'}
               key2={'slide1'}
               content={this.slide[1].content}
               animation={this.slide[1].animation}
               step={this.slide[1].step}
               onFinish={this.slide[1].cb}
               getDeviceDimensions={getDeviceDimensions}/>
        <Animatable.View
          key={`video0`}
          style={{
            ...{ opacity: this.videoSlide.opacity },
            ...StyleSheet.absoluteFillObject,
            ...getDeviceDimensions(),
            zIndex: 2
          }}
          // animation={this.props.animation}
          duration={300}>
          <ReactPlayer
            ref={this.videoRef}
            volume={0}
            muted={true}
            onReady={() => {
              this.setOnLoad.bind(this)();
            }}
            style={{
              'left': '50%',
              'minHeight': '100%',
              'minWidth': '100%',
              'position': 'absolute',
              'top': '50%',
              'transform': 'translate(-50%, -50%)'
            }}
            url={this.videoSlide.source}
            onProgress={this.onBeforeFinish.bind(this)}
            onEnded={setNextContentCallback}
            playing={currentContent.media.type === 'video' ? true : this.state.isPlaying}
            loop={false}
          />
        </Animatable.View>
      </View>
    );
  }
}
export default SlideShow;


