import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import stripe from 'tipsi-stripe';
import Paymethod from "../components/Paymethod"
import { paydetails } from '../scenes/demodata/demodata';
stripe.setOptions({
  publishableKey:'pk_test_51J7bgeL166DTYkjzGOYMGimy0YRblsJQ2eqXR5M8Y8WZP3XMfazIEsNfEpBlJ1SQdKH450fufsCJW7gS5OGt26wF000B7OgVMm',
})



export default class payment extends PureComponent {
  static title = 'payment fee 30RM'

  state = {
    waiting: false,
    onlinepay: 30,
  }

  storepayment = async () => {
    try {
      this.setState({ waiting: true, onlinepay: null })

      const onlinepay = await stripe.paymentRequestWithCardForm(paydetails)

      this.setState({ waiting: false, onlinepay })
    } catch (error) {
      this.setState({ waiting: false })
    }
  }

  render() {
    const { waiting, onlinepay } = this.state

    return (
      <View style={styles.main}>
        <Text style={styles.top}>pay your shuttle bus monthly fee</Text>
        <Text style={styles.details}>Press here to processed to the payment Page.</Text>
        <Paymethod
          text="Enter you card and pay"
          loading={waiting}
          onPress={this.storepayment}
   
        />
        <View style={styles.pppp}>
          {onlinepay && (
            <Text style={styles.details}>the payment has done: {JSON.stringify(onlinepay)}</Text>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  details: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  pppp: {
    height: 20,
  },
})
