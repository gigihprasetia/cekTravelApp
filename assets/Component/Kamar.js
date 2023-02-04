import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import adjust, {
  GrayBold,
  Greens,
  HeightScreen,
  Oranges,
  WidthScreen,
} from '../utils';
import moment from 'moment';
import {DatePickerModal} from 'react-native-paper-dates';
import ModalComponent from './ModalComponent';
import Icon from 'react-native-vector-icons/Entypo';
import TabelPesananRoomHotel from './TabelPesananRoomHotel';
import CardHotel from './cardHotel';
import CardRoom from './CardRoom';
import {useState} from 'react';
import {getRoomAvaliable} from '../API/funtionPost';
import {ActivityIndicator} from 'react-native';
const Kamar = props => {
  const dispatch = useDispatch();
  const {room} = props;
  const {navigation} = props;
  const {hotel} = props;
  const [open, setOpen] = React.useState(false);
  const [rooms, setRooms] = useState([...room.data]);
  const {slug} = props;
  const [loading, setOnLoading] = useState(false);
  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const searchField = useSelector(state => state.HotelReducers.hotelRules);
  const hotelStore = useSelector(state => state);

  const onConfirm = React.useCallback(
    ({startDate, endDate}) => {
      const diffTime = endDate.getTime() - startDate.getTime();
      const diffDay = diffTime / (1000 * 3600 * 24);

      // console.log(Math.floor(diffDay));
      setOpen(false);
      dispatch({
        type: 'setDate',
        startDate,
        endDate,
        total_night: Math.floor(diffDay),
      });
    },
    [setOpen, searchField.startDate, searchField.endDate],
  );

  // console.log(searchField);
  // console.log(hotelStore);
  return (
    <View style={{flex: 1}}>
      <View>
        <View style={{borderBottomWidth: 1, borderBottomColor: Oranges}}>
          <Text style={{fontSize: adjust(12), color: Oranges, marginBottom: 5}}>
            Kamar Yang Tersedia
          </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            {rooms.map((val, index) => {
              return (
                <View key={index} style={{width: WidthScreen * 0.4}}>
                  {/* <CardHotel /> */}
                  {loading ? (
                    <ActivityIndicator color={Oranges} />
                  ) : (
                    <CardRoom hotel={hotel} data={val} />
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <View
          style={{
            width: '100%',

            backgroundColor: 'white',
            borderRadius: 5,
            padding: 5,
          }}>
          <View>
            <Text
              style={{fontSize: adjust(10), color: GrayBold, marginBottom: 5}}>
              CheckIn - CheckOut
            </Text>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={{
                width: '100%',
                height: 40,
                backgroundColor: 'white',
                borderRadius: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: GrayBold,
              }}>
              <Text style={{fontSize: adjust(9), color: 'black'}}>
                {moment(searchField.startDate).format('dddd, DD-MM-yyyy')} -{' '}
                {moment(searchField.endDate).format('dddd, DD-MM-yyyy')}
              </Text>
            </TouchableOpacity>
          </View>
          <DatePickerModal
            locale="en"
            mode="range"
            visible={open}
            onDismiss={onDismiss}
            startDate={searchField.startDate}
            endDate={searchField.endDate}
            onConfirm={onConfirm}
          />

          <View>
            <Text
              style={{fontSize: adjust(10), color: GrayBold, marginBottom: 5}}>
              Kamar
            </Text>

            <ModalComponent
              ButtonCustoms={({open}) => (
                <TouchableOpacity
                  onPress={open}
                  style={{
                    width: '100%',
                    height: 40,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: GrayBold,
                  }}>
                  <Text style={{fontSize: adjust(9), color: 'black'}}>
                    Adult {searchField.adult} , Childern {searchField.children}{' '}
                    , Baby {searchField.baby}
                  </Text>
                </TouchableOpacity>
              )}
              ContentCustoms={({close}) => (
                <View
                  style={{
                    width: WidthScreen * 0.8,
                    height: HeightScreen * 0.4,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: Oranges,
                  }}>
                  <View
                    style={{
                      // backgroundColor: 'red',
                      width: '90%',
                      height: '90%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: HeightScreen * 0.06,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 2,
                        paddingHorizontal: 10,
                      }}>
                      <Text>Adult</Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch({
                              type: 'setPerson',
                              adult: searchField.adult - 1,
                              children: searchField.children,
                              baby: searchField.baby,
                            });
                          }}>
                          <Icon
                            name="circle-with-minus"
                            size={WidthScreen * 0.08}
                            color={'red'}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: adjust(15),
                            width: WidthScreen * 0.1,
                            textAlign: 'center',
                          }}>
                          {searchField.adult}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch({
                              type: 'setPerson',
                              adult: searchField.adult + 1,
                              children: searchField.children,
                              baby: searchField.baby,
                            });
                          }}>
                          <Icon
                            name="circle-with-plus"
                            size={WidthScreen * 0.08}
                            color={'green'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: HeightScreen * 0.06,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 2,
                        paddingHorizontal: 10,
                        marginTop: 10,
                      }}>
                      <Text>Childern</Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch({
                              type: 'setPerson',
                              adult: searchField.adult,
                              children: searchField.children - 1,
                              baby: searchField.baby,
                            });
                          }}>
                          <Icon
                            name="circle-with-minus"
                            size={WidthScreen * 0.08}
                            color={'red'}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: adjust(15),
                            width: WidthScreen * 0.1,
                            textAlign: 'center',
                          }}>
                          {searchField.children}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch({
                              type: 'setPerson',
                              adult: searchField.adult,
                              children: searchField.children + 1,
                              baby: searchField.baby,
                            });
                          }}>
                          <Icon
                            name="circle-with-plus"
                            size={WidthScreen * 0.08}
                            color={'green'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        height: HeightScreen * 0.06,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 2,
                        paddingHorizontal: 10,
                        marginTop: 10,
                      }}>
                      <Text>Baby</Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch({
                              type: 'setPerson',
                              adult: searchField.adult,
                              children: searchField.children,
                              baby: searchField.baby - 1,
                            });
                          }}>
                          <Icon
                            name="circle-with-minus"
                            size={WidthScreen * 0.08}
                            color={'red'}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: adjust(15),
                            width: WidthScreen * 0.1,
                            textAlign: 'center',
                          }}>
                          {searchField.baby}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch({
                              type: 'setPerson',
                              adult: searchField.adult,
                              children: searchField.children,
                              baby: searchField.baby + 1,
                            });
                          }}>
                          <Icon
                            name="circle-with-plus"
                            size={WidthScreen * 0.08}
                            color={'green'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'red',
                        paddingHorizontal: 30,
                        paddingVertical: 5,
                        borderRadius: 5,
                      }}
                      onPress={() => close()}>
                      <Text style={{color: 'white'}}>close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              ContainerStyleContent={{
                backgroundColor: 'rgba(52, 52, 52, 0.5)',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                alignItems: 'center',
              }}
              isTransparent={true}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setOnLoading(true);
              getRoomAvaliable(
                {
                  checkin: moment(searchField.startDate).format('DD MMM YYYY'),
                  checkout: moment(searchField.endDate).format('DD MMM YYYY'),
                  slug,
                  adult: searchField.adult,
                  children: searchField.children,
                  total_night: searchField.total_night,
                },
                val => {
                  setRooms([...val.data.data]);
                  setOnLoading(false);
                },
              );
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
            }}
            style={{
              flex: 1,
              backgroundColor: 'green',
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 5,
            }}>
            {loading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text style={{color: 'white', fontSize: adjust(10)}}>
                Check Ketersediaan Kamar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {hotelStore.HotelReducers.selectedRoom.descriptionKamar === '' ? null : (
        <TabelPesananRoomHotel
          navigation={navigation}
          hotel={hotel}
          description={hotelStore.HotelReducers.selectedRoom.descriptionKamar}
          searchField={searchField}
        />
      )}
    </View>
  );
};

export default Kamar;
