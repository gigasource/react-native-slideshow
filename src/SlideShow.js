import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Slide from './Slide';
import Video from 'react-native-video';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import _ from 'lodash';

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
    this.count = 1;
    this.nodeFlag = true;
    this.slide = [{ step: 'next' }, { step: 'next' }];
    this.videoSlide = {
      opacity: 0,
      source: null,
    };
    this.isPlaying = false;
    this.preRender(props);
  }
  onBeforeFinish(_time) {
    let { currentContent, setNextContentCallback } = this.props;
    if (currentContent.media.type === 'video' && currentContent.duration && currentContent.duration != 0 && this.isPlaying) {
      if (_time.currentTime * 1000 >= currentContent.duration) {
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
        this.videoSlide = {
          opacity: 100,
          source: currentContent.media.source
        };
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
    this.videoSlide.source = resolveAssetSource(this.videoSlide.source);

    if (currentContent.media.type === 'video' && this.videoSlide.source) {
      this.videoSlide.source.mainVer = this.count++;
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
        <Video
          key={`video0`}
          resizeMode={'contain'}
          useNativeDriver={true}
          useTextureView={false}
          //animation={this.props.animation}
          onLoad={() => {
            this.setOnLoad.bind(this)();
          }}
          duration={300}
          style={{
            ...{ opacity: this.videoSlide.opacity },
            ...StyleSheet.absoluteFillObject,
            ...getDeviceDimensions(),
            zIndex: 2
          }}
          source={this.videoSlide.source}
          onProgress={this.onBeforeFinish.bind(this)}
          onEnd={setNextContentCallback}
          // onError={setNextContentCallback}
          repeat={false}
          paused={currentContent.media.type === 'video' ? false : !this.state.isLoading}
        />
      </View>
    );
  }
}
export default SlideShow;


