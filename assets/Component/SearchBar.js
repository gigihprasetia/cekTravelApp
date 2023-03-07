import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {Component, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {debounce} from 'lodash';
import adjust, {
  GrayBold,
  GrayFade,
  Greens,
  HeightScreen,
  Oranges,
  WidthScreen,
} from '../utils';
import moment from 'moment';
import {DatePickerModal} from 'react-native-paper-dates';
import ModalComponent from './ModalComponent';
import Icon from 'react-native-vector-icons/Entypo';
import {locationHotel} from '../API/functionget';

const SearchBar = props => {
  const HotelStore = useSelector(state => state.HotelReducers.hotelRules);
  const dispatch = useDispatch();
  const {navigation} = props;
  const [open, setOpen] = React.useState(false);
  const [inputval, setInputVal] = React.useState('Hotel di sekitar anda');
  const [autoActive, setAutoActive] = React.useState(false);
  const isToken = useSelector(
    state => state.UserReducers.isAuthenticated.token,
  );
  const [stateType, setStateType] = React.useState({
    isLoading: false,
    inputValue: '',
    dataQuery: [
      {
        code: 'NOT',
        name: 'Pencarian Tidak Ditemukan',
        type: null,
      },
    ],
  });

  const onchangeText = e => {
    setStateType({
      ...stateType,
      isLoading: true,
      inputValue: e,
    });
    debounceReasponse(e);
  };

  const debounceReasponse = useCallback(
    debounce(e => {
      locationHotel(isToken, val => {
        setStateType({
          inputValue: e,
          isLoading: false,
          dataQuery: val.data.data,
        });
      });
    }, 1000),
    [],
  );

  // console.log(stateType);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({startDate, endDate}) => {
      const diffTime = endDate.getTime() - startDate.getTime();
      const diffDay = diffTime / (1000 * 3600 * 24);
      setOpen(false);
      dispatch({
        type: 'setDate',
        startDate,
        endDate,
        total_night: Math.floor(diffDay),
      });
    },
    [setOpen, HotelStore.startDate, HotelStore.endDate],
  );

  // const AutocompleteLocation = React.useMemo(() => {
  //   const datas = ['Yogyakarta', 'Bantul', 'Gunungkidul'].filter(val => {
  //     return val.toLowerCase().search(inputval.toLowerCase()) != -1;
  //   });
  //   return datas;
  // }, [inputval]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <View
        style={{
          width: '90%',
          height: HeightScreen * 0.25,
          backgroundColor: Oranges,
          borderRadius: 5,
          padding: 5,
        }}>
        <View>
          <Text style={{fontSize: adjust(10), color: 'white', marginBottom: 5}}>
            Location
          </Text>

          <View
            style={{
              width: '100%',
              height: 40,
              backgroundColor: 'white',
              borderRadius: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              name="location-pin"
              size={adjust(15)}
              style={{paddingHorizontal: adjust(5)}}
            />
            <TextInput
              style={{paddingHorizontal: 10, flex: 1, color: GrayFade}}
              placeholder={'location'}
              value={stateType.inputValue}
              onChangeText={e => {
                setStateType({
                  ...stateType,
                  isLoading: true,
                  inputValue: e,
                });
                onchangeText(e);
              }}
              onFocus={() => {
                setAutoActive(true);
              }}
              // onBlur={() => {
              //   setAutoActive(false);
              // }}
            />
          </View>
          {/* AUTOCOMPLETE */}
          {autoActive && (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                padding: 5,
                backgroundColor: 'white',
                zIndex: 40,
                top: 60,
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 5,
              }}>
              {stateType.dataQuery.map((val, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      paddingVertical: 5,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => {
                      if (val.type === null) {
                        return null;
                      } else {
                        setAutoActive(false);
                        setStateType({
                          ...stateType,
                          inputValue: val.name,
                        });
                      }
                    }}>
                    <View>
                      <Text style={{fontSize: adjust(10), color: GrayBold}}>
                        {val.name}
                      </Text>
                    </View>
                    <Text style={{fontSize: adjust(8), color: Oranges}}>
                      {val.type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        <View>
          <Text style={{fontSize: adjust(10), color: 'white', marginBottom: 5}}>
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
          <Text style={{fontSize: adjust(10), color: 'white', marginBottom: 5}}>
            Kamar
          </Text>

          <View
            style={{
              width: '100%',

              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '45%'}}>
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
                    }}>
                    <Text style={{fontSize: adjust(9), color: 'black'}}>
                      Adult {HotelStore.adult} , Childern {HotelStore.children}{' '}
                      , Baby {HotelStore.baby}
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
                                adult: HotelStore.adult - 1,
                                children: HotelStore.children,
                                baby: HotelStore.baby,
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
                                baby: HotelStore.baby,
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
                                baby: HotelStore.baby,
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
                                baby: HotelStore.baby,
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
                                adult: HotelStore.adult,
                                children: HotelStore.children,
                                baby: HotelStore.baby - 1,
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
                            {HotelStore.baby}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              dispatch({
                                type: 'setPerson',
                                adult: HotelStore.adult,
                                children: HotelStore.children,
                                baby: HotelStore.baby + 1,
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
              onPress={() => {
                dispatch({
                  type: 'locationHotel',
                  data: stateType.inputValue,
                });
                navigation.push('FilterHotel');
              }}
              style={{
                width: '45%',
                height: HeightScreen * 0.055,
                backgroundColor: Greens,
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: adjust(11), color: 'white'}}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(SearchBar);
