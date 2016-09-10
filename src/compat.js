console.disableYellowBox = true

window.navigator.userAgent = 'react-native'

if (typeof window.Uint8Array != 'function') {
  window.Uint8Array = require('typedarray').Uint8Array
}