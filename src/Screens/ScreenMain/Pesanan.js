import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import adjust, {
  GrayBold,
  GrayFade,
  HeightScreen,
  Oranges,
  WidthScreen,
} from '../../../assets/utils';
import CardPesanan from '../../../assets/Component/cardPesanan';
import {useSelector} from 'react-redux';
import LoadingPage from '../../../assets/Component/LoadingPage';
import {Button} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {HistoryPayment, WaitPayment} from '../../../assets/API/functionget';
import PesananSayaPayment from '../../../assets/Component/PesananSayaPayment';
import MenungguPembayaran from '../../../assets/Component/MenungguPembayaran';
export default function Pesanan(props) {
  const dataUser = useSelector(dataUser => dataUser.UserReducers);
  const [optionPayment, setOptionPayment] = useState(true);
  const [waitPayment, setWaitPayment] = useState([]);
  const [myPayment, setMyPayment] = useState([]);
  const isFocused = useIsFocused();
  // console.log(dataUser);
  // console.log(
  //   dataUser.isAuthenticated.token != '',
  //   dataUser.dataUser.statusUser,
  //   'name' in dataUser.dataUser.data,
  // );

  useEffect(() => {
    if (dataUser.dataUser.statusUser) {
      HistoryPayment(dataUser.isAuthenticated.token, val => {
        setMyPayment(val.data.data);
      });
      WaitPayment(dataUser.isAuthenticated.token, val =>
        setWaitPayment(val.data.data),
      );
    }
    console.log('focus');
  }, [isFocused === true && dataUser.dataUser.statusUser]);

  const {navigation} = props;

  console.log(myPayment, waitPayment);

  return !dataUser.dataUser.statusUser ? (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: Oranges,
          fontSize: adjust(15),
          marginBottom: adjust(5),
        }}>
        Anda Belum Login
      </Text>
      <Button
        onPress={() => navigation.navigate('Account')}
        color={Oranges}
        title="login"
      />
    </View>
  ) : (
    <SafeAreaView
      style={{flex: 1, padding: adjust(10), backgroundColor: 'white'}}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: adjust(10),
        }}>
        <View>
          <SvgUri
            width={adjust(35)}
            height={adjust(35)}
            uri={dataUser.dataUser.data.ava}
          />
        </View>

        <Text style={{color: Oranges, fontSize: adjust(15)}}>
          {dataUser.dataUser.data.name}
        </Text>
        <Text style={{color: GrayFade, fontSize: adjust(10)}}>
          {dataUser.dataUser.data.email}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => setOptionPayment(true)}
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: optionPayment ? Oranges : 'white',
            paddingVertical: adjust(5),
            alignItems: 'center',
          }}>
          <Text
            style={{color: Oranges, fontSize: adjust(10), fontWeight: 'bold'}}>
            Menunggu Pembayaran
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOptionPayment(false)}
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: !optionPayment ? Oranges : 'white',
            paddingVertical: adjust(5),
            alignItems: 'center',
          }}>
          <Text
            style={{color: Oranges, fontSize: adjust(10), fontWeight: 'bold'}}>
            Pesanan Saya
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Text>jaja</Text> */}
      {optionPayment ? (
        <MenungguPembayaran paymentWait={waitPayment} />
      ) : (
        <PesananSayaPayment paymentStatus={myPayment} />
      )}
    </SafeAreaView>
  );
}
