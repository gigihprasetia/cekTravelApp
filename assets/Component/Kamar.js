import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import adjust, {Greens, HeightScreen, Oranges, WidthScreen} from '../utils';
import moment from 'moment';
import {DatePickerModal} from 'react-native-paper-dates';
import ModalComponent from './ModalComponent';
import Icon from 'react-native-vector-icons/Entypo';
import TabelPesananRoomHotel from './TabelPesananRoomHotel';
const Kamar = props => {
  const [open, setOpen] = React.useState(false);
  const HotelStore = useSelector(state => state.HotelReducers.hotelRules);
  const dispatch = useDispatch();

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({startDate, endDate}) => {
      setOpen(false);
      dispatch({
        type: 'setDate',
        startDate,
        endDate,
      });
    },
    [setOpen, HotelStore.startDate, HotelStore.endDate],
  );

  return (
    <View style={{flex: 1}}>
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

            backgroundColor: Oranges,
            borderRadius: 5,
            padding: 5,
          }}>
          <View>
            <Text
              style={{fontSize: adjust(10), color: 'white', marginBottom: 5}}>
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
              }}>
              <Text style={{fontSize: adjust(9), color: 'black'}}>
                {moment(HotelStore.startDate).format('dddd, DD-MM-yyyy')} -{' '}
                {moment(HotelStore.endDate).format('dddd, DD-MM-yyyy')}
              </Text>
            </TouchableOpacity>
          </View>
          <DatePickerModal
            locale="en"
            mode="range"
            visible={open}
            onDismiss={onDismiss}
            startDate={HotelStore.startDate}
            endDate={HotelStore.endDate}
            onConfirm={onConfirm}
          />

          <View>
            <Text
              style={{fontSize: adjust(10), color: 'white', marginBottom: 5}}>
              Kamar
            </Text>

            <ModalComponent
              ButtonCustoms={() => (
                <View
                  style={{
                    width: '100%',
                    height: 40,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: adjust(9), color: 'black'}}>
                    Adult {HotelStore.adult} , Childern {HotelStore.children} ,
                    Room {HotelStore.room}
                  </Text>
                </View>
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
                              adult: HotelStore.adult - 1,
                              children: HotelStore.children,
                              room: HotelStore.room,
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
                          {HotelStore.adult}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch({
                              type: 'setPerson',
                              adult: HotelStore.adult + 1,
                              children: HotelStore.children,
                              room: HotelStore.room,
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
                              adult: HotelStore.adult,
                              children: HotelStore.children - 1,
                              room: HotelStore.room,
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
                          {HotelStore.children}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch({
                              type: 'setPerson',
                              adult: HotelStore.adult,
                              children: HotelStore.children + 1,
                              room: HotelStore.room,
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
                      <Text>Room</Text>
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
                              adult: HotelStore.adult,
                              children: HotelStore.children,
                              room: HotelStore.room - 1,
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
                          {HotelStore.room}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch({
                              type: 'setPerson',
                              adult: HotelStore.adult,
                              children: HotelStore.children,
                              room: HotelStore.room + 1,
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
                backgroundColor: 'rgba(52, 52, 52, 0.5)',
              }}
              isTransparent={true}
            />
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'green',
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 5,
            }}>
            <Text style={{color: 'white', fontSize: adjust(10)}}>
              Check Ketersediaan Kamar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TabelPesananRoomHotel />
    </View>
  );
};

export default Kamar;
