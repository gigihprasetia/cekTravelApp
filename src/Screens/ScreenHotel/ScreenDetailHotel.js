import {
  Image,
  SafeAreaView,
  SafeAreaViewBase,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {getDetailHotel} from '../../../assets/API/functionget';
import {useState} from 'react';
import adjust, {
  GrayBold,
  GrayFade,
  HeightScreen,
  Oranges,
} from '../../../assets/utils';
import Icon from 'react-native-vector-icons/Entypo';
import Umum from '../../../assets/Component/Umum';
import Kamar from '../../../assets/Component/Kamar';
import Fasilitas from '../../../assets/Component/Fasilitas';
import Lokasi from '../../../assets/Component/Lokasi';
import LoadingPage from '../../../assets/Component/LoadingPage';
import {useDispatch, useSelector} from 'react-redux';
import {getRoomAvaliable} from '../../../assets/API/funtionPost';

import moment from 'moment';

export default function ScreenDetailHotel(props) {
  const searchField = useSelector(state => state.HotelReducers.hotelRules);
  const dispatch = useDispatch();
  const [dataHotel, setDataHotel] = useState(null);
  const [dataRoomAvaliable, setDataRoomAvaliable] = useState({
    status: false,
    data: [],
  });
  const [showIndex, setShowIndex] = useState(0);
  const [showMenu, setShowMenu] = useState('Umum');
  const {
    route: {
      params: {slug},
    },
  } = props;
  const {navigation} = props;
  const isToken = useSelector(
    state => state.UserReducers.isAuthenticated.token,
  );

  useEffect(() => {
    dispatch({
      type: 'selectedRoom',
      data: {
        id: '',
        code: '',
        floor: '',
        room_type: '',
      },
      descriptionKamar: '',
    });
    getDetailHotel(isToken, slug, res => setDataHotel(res.data.data));
    getRoomAvaliable(
      isToken,
      {
        checkin: moment(searchField.startDate).format('DD MMM YYYY'),
        checkout: moment(searchField.endDate).format('DD MMM YYYY'),
        slug,
        adult: searchField.adult,
        children: searchField.children,
        total_night: searchField.total_night,
      },
      room => {
        setDataRoomAvaliable({
          status: true,
          data: room.data.data,
        });
      },
    );
  }, []);

  return dataHotel === null ? (
    <LoadingPage />
  ) : (
    <SafeAreaView
      style={{flex: 1, height: HeightScreen, backgroundColor: 'white'}}>
      <ScrollView>
        {/* IMAGEPreview */}
        <View style={{flex: 1}}>
          <Image
            source={{uri: dataHotel.hotel.media[showIndex]}}
            style={{flex: 1, height: HeightScreen * 0.25}}
          />
          <View style={{flex: 1, flexDirection: 'row'}}>
            {dataHotel.hotel.media.map((val, index) => {
              return (
                <Pressable
                  onPress={() => setShowIndex(index)}
                  style={{flex: 1, margin: 1}}
                  key={index}>
                  <Image
                    source={{uri: val}}
                    style={{
                      flex: 1,
                      height: HeightScreen * 0.1,
                      opacity: showIndex === index ? 0.7 : 1,
                    }}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
        {/* CONTENT */}
        <View style={{flex: 1, paddingHorizontal: 5, marginTop: 10}}>
          <Text style={styles.h1}>{dataHotel.hotel.name}</Text>
          <Text style={styles.h2}>
            {dataHotel.hotel.district_name}, {dataHotel.hotel.city_name},{' '}
            {dataHotel.hotel.province_name}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{...styles.h2, marginRight: 10}}>
              {dataHotel.hotel.rate}
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              {[...Array(dataHotel.hotel.rate).keys()].map(val => {
                return (
                  <Icon
                    key={val}
                    name="star"
                    size={adjust(10)}
                    color={Oranges}
                  />
                );
              })}
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            height: HeightScreen * 0.05,
            flexDirection: 'row',
            paddingHorizontal: 5,
          }}>
          {['Umum', 'Fasilitas', 'Kamar', 'Lokasi'].map(val => {
            return (
              <Pressable
                key={val}
                onPress={() => setShowMenu(val)}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: showMenu === val ? Oranges : GrayFade,
                }}>
                <Text
                  style={{
                    fontSize: adjust(10),
                    color: showMenu === val ? Oranges : GrayBold,
                  }}>
                  {val}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={{flex: 1, paddingHorizontal: 5, marginTop: 10}}>
          {showMenu === 'Umum' && (
            <Umum
              nameHotel={dataHotel.hotel.name}
              text={dataHotel.hotel.welcome_text}
            />
          )}
          {showMenu === 'Fasilitas' && (
            <Fasilitas fasilitas={dataHotel.facilities} />
          )}
          {showMenu === 'Kamar' && (
            <Kamar
              isToken={isToken}
              hotel={dataHotel.hotel}
              slug={slug}
              room={dataRoomAvaliable}
              navigation={navigation}
            />
          )}
          {showMenu === 'Lokasi' && (
            <Lokasi
              latitude={dataHotel.hotel.latitude}
              longitude={dataHotel.hotel.longitude}
              shortDestination={dataHotel.destinations}
              address={dataHotel.hotel.address}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: adjust(15),
    color: 'black',
  },
  h2: {
    fontSize: adjust(11),
    color: 'black',
  },
});
