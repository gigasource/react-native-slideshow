# React native Slideshow

### Install
```aidl
npm install github:gigasource/react-native-slideshow#split-video
```

### Usage
Example:
```javascript
import {
  SlideShow,
  convertToReactAnimation,
  SUPPORTED_IMAGE,
  SUPPORTED_VIDEO
} from './src/index';
// normalize function for contents in playlist
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
// Create an component to render slideshow
export default class TestApp extends React.Component {         
  constructor(props) {
    super(props);
    this.state = {
      currentPlayList: normalize(SomePlaylist), // SomePlaylist must be an array of contents
      currentContentIndex: 0,
    };
  }
  // Custom function to set contents' order
  setNextContentCallback() {
    this.setState({ currentContentIndex: (this.state.currentContentIndex + 1) % this.state.currentPlayList.length });
  }
  render() {
    let { currentContentIndex, currentPlayList } = this.state;
      let currentContent = currentPlayList[currentContentIndex];
      let nextContent = currentPlayList[(currentContentIndex + 1) % currentPlayList.length];
      return (
        <SlideShow key={...} currentContent={currentContent} nextContent={nextContent} setNextContentCallback={this.setNextContentCallback.bind(this)}/>);
  }
}
```         
Content in playlist must be normalized before putting in Slideshow with this format:
```json
{ "media": 
  { "source": 
    { "uri": /* uri to the file */ }, 
    "type": /* video or image */ 
  }, 
  "duration": /* duration in milliseconds */, 
  "effect": /* supported effect */ 
}
```
*convertToReactAnimation, SUPPORTED_IMAGE, SUPPORTED_VIDEO* from this library can be used to normalize the data as the example above.

Animation list which is supported by this library (image only):
```aidl
'fadeIn',
'slideInUp',
'slideInDown',
'slideInLeft',
'slideInRight',
'bounceIn',
'bounceInUp',
'bounceInDown',
'bounceInLeft',
'bounceInRight',
'zoomIn',
'zoomInDown',
'zoomInUp',
'zoomInLeft',
'zoomInRight'
```

### Limitation
Loading video in background make image animation unsmoothly.
