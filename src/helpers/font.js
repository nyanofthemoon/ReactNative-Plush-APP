'use strict'

// https://github.com/rebeccahughes/react-native-device-info
// https://github.com/rebeccahughes/react-native-device-info/blob/master/RNDeviceInfo/RNDeviceInfo.m

const DeviceInfo = require('react-native-device-info')

export function getCorrectFontSizeForResolution(size) {
  if ('iPhone OS' === DeviceInfo.getSystemName()) {
    switch(DeviceInfo.getModel()) {

      case 'Simulator':
        return size * 1.10

      case 'iPhone 5c':
        return size * 0.66

      case 'iPhone 5':
      case 'iPhone 5s':
        return size * 1

      case 'iPhone 6':
      case 'iPhone 6s':
      case 'iPhone SE':
        return size * 1.10

      default:
      case 'iPhone 6 Plus':
      case 'iPhone 6s Plus':
        return size * 1.5

    }
  } else {
    return size
  }
}




/*
import { PixelRatio, Dimensions } from 'react-native'

export function getCorrectFontSizeF(screenWidth, screenHeight, currentFont){

  let screenWidth = Dimensions.get('window').width
  let screenHeight = Dimensions.get('window').height

  let devRatio = PixelRatio.get();
  let factor = (((screenWidth*devRatio)/320)+((screenHeight*devRatio)/640))/2.0;
  let maxFontDifferFactor = 5; //the maximum pixels of font size we can go up or down
  // console.log("The factor is: "+factor);
  if(factor<=1){
    return currentFont-float2int(maxFontDifferFactor*0.3);
  }else if((factor>=1) && (factor<=1.6)){
    return currentFont-float2int(maxFontDifferFactor*0.1);
  }else if((factor>=1.6) && (factor<=2)){
    return currentFont;
  }else if((factor>=2) && (factor<=3)){
    return currentFont+float2int(maxFontDifferFactor*0.65);
  }else if (factor>=3){
    return currentFont+float2int(maxFontDifferFactor);
  }

}

function float2int (value) {
  return value | 0;
}
  */