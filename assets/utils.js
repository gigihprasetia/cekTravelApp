import {PixelRatio, Dimensions} from 'react-native';

//height and width
export const pixelRatio = PixelRatio.get();
export const WidthScreen = Dimensions.get('window').width;
export const HeightScreen = Dimensions.get('window').height;

//COLOR TEMPLATE
export const Oranges = '#F37021';
export const White = '#FFFFFF';
export const Greens = '#2FA66B';
export const GrayBold = '#565657';
export const GrayFade = '#828285';

export const formatter = val => {
  if (typeof val === 'string') {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(parseInt(val));
  } else {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(val);
  }
};

//Fontdevices

export const adjust = size => {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (WidthScreen < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (HeightScreen < 667) {
      return size;
      // iphone 6-6s
    }
    if (HeightScreen >= 667 && HeightScreen <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }
  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (WidthScreen <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (HeightScreen < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (HeightScreen >= 667 && HeightScreen <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }
  if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (WidthScreen <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (HeightScreen < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (HeightScreen >= 667 && HeightScreen <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  }
  return size;
};

export default adjust;
