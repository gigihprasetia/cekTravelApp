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
import {CommonActions} from '@react-navigation/native';
import adjust, {
  formatter,
  GrayBold,
  GrayFade,
  Oranges,
  WidthScreen,
} from '../../../assets/utils';
import {useState} from 'react';
import RenderHTML from 'react-native-render-html';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

const ScreenProcess = props => {
  const [dataPayment, setDataPayment] = useState({
    status: false,
    data: null,
    source: {
      html: '',
    },
  });
  const {navigation} = props;
  const isToken = useSelector(
    state => state.UserReducers.isAuthenticated.token,
  );

  // console.log(props);
  useEffect(() => {
    paymentInquirySucsess(isToken, props.route.params, val => {
      // console.log(val.data.data.payment_method.instructions);
      setDataPayment({
        status: true,
        data: val.data.data,
        source: {
          html: val.data.data.payment_method.instructions,
        },
      });
    });
  }, []);

  return dataPayment.status ? (
    <SafeAreaView style={{flex: 1, height: '100%', padding: 5}}>
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
        <View
          style={{
            flex: 1,
            padding: 5,
            borderWidth: 1,
            marginTop: 10,
            borderColor: GrayFade,
            borderRadius: 5,
          }}>
          <View
            style={{
              borderBottomWidth: 1,
              paddingVertical: 5,
              borderBottomColor: Oranges,
            }}>
            <Text
              style={{
                fontSize: adjust(13),
                fontWeight: 'bold',
                color: Oranges,
              }}>
              Instructions
            </Text>
          </View>
          <RenderHTML contentWidth={WidthScreen} source={dataPayment.source} />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'DashboardMain',
                    state: {
                      routes: [{name: 'Pesanan'}],
                    },
                  },
                ],
              }),
            );
          }}
          style={{
            backgroundColor: Oranges,
            flex: 1,
            alignItems: 'center',
            padding: adjust(5),
            marginVertical: adjust(5),
            borderRadius: adjust(5),
          }}>
          <Text
            style={{
              fontSize: adjust(10),
              fontWeight: 'bold',
              color: 'white',
            }}>
            Cek Pembayaran
          </Text>
        </TouchableOpacity>
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
