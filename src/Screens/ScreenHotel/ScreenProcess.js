import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {paymentInquirySucsess} from '../../../assets/API/functionget';
import adjust, {
  formatter,
  GrayBold,
  Oranges,
  WidthScreen,
} from '../../../assets/utils';
import {useState} from 'react';

const ScreenProcess = props => {
  const [dataPayment, setDataPayment] = useState({
    status: false,
    data: null,
  });
  //   console.log(props);

  useEffect(() => {
    paymentInquirySucsess(props.route.params, val => {
      setDataPayment({
        status: true,
        data: val.data.data,
      });
    });
  }, []);

  console.log(dataPayment);

  return dataPayment.status ? (
    <SafeAreaView style={{flex: 1, height: '100%'}}>
      <ScrollView>
        <Text
          style={{fontSize: adjust(13), color: Oranges, fontWeight: 'bold'}}>
          Transaction Payment
        </Text>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            source={{uri: dataPayment.data.payment_method.image}}
            style={{width: 100, height: 100, resizeMode: 'contain'}}
          />
          <Text
            style={{fontSize: adjust(13), color: Oranges, fontWeight: 'bold'}}>
            {dataPayment.data.va_number}
          </Text>
          <Text
            style={{fontSize: adjust(13), color: GrayBold, fontWeight: 'bold'}}>
            {formatter(dataPayment.data.amount)}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator color={Oranges} />
    </SafeAreaView>
  );
};

export default ScreenProcess;
