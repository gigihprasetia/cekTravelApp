import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import adjust, {formatter, GrayBold, GrayFade, Oranges} from '../utils';

const PesananSayaPayment = ({paymentStatus = []}) => {
  return paymentStatus.length === 0 ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Belum ada Pemesanan</Text>
    </View>
  ) : (
    <FlatList
      data={paymentStatus}
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
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                {item.hotel.name}
              </Text>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                {item.total_adult + item.total_child} tamu
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
                  Tanggal
                </Text>
                <Text style={{color: GrayFade, fontSize: adjust(9)}}>
                  {item.checkin}
                </Text>
              </View>
              <View>
                <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                  Booking Code
                </Text>
                <Text style={{color: GrayFade, fontSize: adjust(9)}}>
                  {item.booking_code}
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
                  Cetak e-Ticket
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

export default React.memo(PesananSayaPayment);
