import {
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import React from 'react';
import {HeightScreen, Oranges} from '../../../assets/utils';
import DatePicker from 'react-native-date-ranges';

export default function ScreenDashboardHotel() {
  const dataImage = [
    'https://www.travelclub.co.id/wp-content/uploads/2018/08/travel_ajasapa.blogspot.com_.jpg',
    'https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp',
    'https://cdn-2.tstatic.net/tribunnews/foto/bank/images/gaya-traveling-orang-indonesia-kamu-masuk-yang-mana-nih.jpg',
  ];
  return (
    <SafeAreaView>
      <ScrollView>
        <SwiperFlatList
          index={0}
          showPagination
          data={dataImage}
          renderItem={({item}) => (
            <Image
              style={{
                width: Dimensions.get('window').width,
                height: HeightScreen * 0.22,
              }}
              source={{uri: item}}
            />
          )}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'gray',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              height: HeightScreen * 0.2,
              backgroundColor: Oranges,
              position: 'relative',
              top: -10,
              borderRadius: 5,
              padding: 5,
            }}>
            <DatePicker
              style={{
                width: '100%',
                height: 36,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 5,
              }}
              blockBefore={true}
              customStyles={{
                placeholderText: {fontSize: 14, color: 'white'}, // placeHolder style
                headerStyle: {backgroundColor: Oranges}, // title container style
                headerMarkTitle: {color: 'white'}, // title mark style
                headerDateTitle: {fontSize: 15}, // title Date style
                contentInput: {fontSize: 14}, //content text container style
                contentText: {fontSize: 14}, //after selected text Style
              }} // optional
              centerAlign // optional text will align center or not
              allowFontScaling={true} // optional
              ButtonStyle={{
                backgroundColor: Oranges,
                borderWidth: 1,
                borderRadius: 10,
                marginHorizontal: 20,
                borderColor: '#fff',
              }}
              ButtonTextStyle={{
                color: '#fff',
                alignSelf: 'center',
                padding: 10,
                fontSize: 16,
              }}
              placeholder={'Checkin   -   Checkout'}
              mode={'range'}
              markText={'Check In - Check Out'}
              ButtonText="Select"
              onConfirm={text => console.log(text)}
              outFormat={'DD-MM-YYYY'}
              customButton={props => {
                console.log(props);
                return <Button title="hai" />;
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
