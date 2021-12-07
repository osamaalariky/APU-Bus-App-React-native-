import React, { PureComponent } from 'react'
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native'
import PropTypes from 'prop-types'

export default class Paymethod extends PureComponent {
  static propTypes = {
    viewcharc: PropTypes.string,

    onPress: PropTypes.func.isRequired,
    waiting: PropTypes.bool,

    vview: PropTypes.bool,
    charc: PropTypes.string.isRequired,

    design: PropTypes.any,
  }

  
  store = (event) => {
    const { waiting, 
      vview, 
      onPress } = this.props
      
      if (waiting || vview) {
        return
      }
      
      if (onPress) {
        onPress(event)
      }
    }
    
    static defaultProps = {
      viewcharc: '',
      waiting: false,
      vview: false,
      design: undefined,
    }
    render() {
      const { charc, viewcharc, waiting, vview, design, ...wait } = this.props
      
      return (
        <TouchableHighlight
        {...wait}
        style={[styles.button, design]}
        underlayColor="rgba(0,0,0,0.5)"
        onPress={this.store}
      >
        <View>
          {waiting && <ActivityIndicator animating size="small" />}
          {!waiting && !vview && <Text>{charc}</Text>}
          {!waiting && vview && <Text>{viewcharc || charc}</Text>}
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 10,
    height: Platform.OS === 'ios' ? 35 : 40,
    minWidth: 160,
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'white',
    alignItems: 'center',
  },
})
