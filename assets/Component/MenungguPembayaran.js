import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import adjust, {formatter, GrayBold, GrayFade, Oranges} from '../utils';
import {Image} from 'react-native';

const MenungguPembayaran = ({paymentWait = []}) => {
  return paymentWait.length === 0 ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Belum ada Pemesanan</Text>
    </View>
  ) : (
    <FlatList
      data={paymentWait}
      contentContainerStyle={{paddingBottom: adjust(40)}}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        console.log(item);
        return (
          <View
            style={{
              borderWidth: 1,
              padding: adjust(5),
              marginVertical: adjust(5),
              borderColor: GrayBold,
              borderRadius: adjust(5),
            }}>
            <View
              style={{
                flex: 1,
                // flexDirection: 'row',
                // justifyContent: 'space-between',
              }}>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                Tanggal Pemesanan {item.order_date_f}
              </Text>
              <Text style={{color: Oranges, fontSize: adjust(10)}}>
                Bayar Sebelum {item.expired_date_f}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: adjust(5),
              }}>
              <View>
                <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                  Metode Pembayaran
                </Text>
                <Text style={{color: GrayFade, fontSize: adjust(9)}}>
                  {item.payment.payment_name}
                </Text>
                <Image
                  source={{uri: item.payment.payment_ava}}
                  style={{
                    width: adjust(20),
                    height: adjust(20),
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View>
                <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                  Transfer Bank
                </Text>
                <Text style={{color: GrayFade, fontSize: adjust(9)}}>
                  {item.payment.account_number}
                </Text>
              </View>
              <View>
                <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                  Total Bayar
                </Text>
                <Text style={{color: GrayFade, fontSize: adjust(9)}}>
                  {formatter(item.final_price)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Pressable>
                <Text
                  style={{
                    color: Oranges,
                    fontSize: adjust(10),
                    marginHorizontal: adjust(5),
                  }}>
                  Cetak Invoice
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: Oranges,
                  padding: adjust(5),
                  borderRadius: adjust(5),
                }}>
                <Text style={{color: 'white', fontSize: adjust(10)}}>
                  Bayar Tagihan
                </Text>
              </Pressable>
            </View>
          </View>
        );
      }}
      keyExtractor={(item, index) => {
        // console.log(index);
        return index;
      }}
    />
  );
};

export default React.memo(MenungguPembayaran);
