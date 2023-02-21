import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import adjust, {
  formatter,
  GrayBold,
  GrayFade,
  Greens,
  HeightScreen,
  Oranges,
  WidthScreen,
} from '../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-paper';
import ModalComponent from './ModalComponent';
import SelectDropdown from 'react-native-select-dropdown';
import {getRoomLayoutAvaliable} from '../API/funtionPost';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useState} from 'react';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const CardRoom = props => {
  const [loadingLayout, setLoadingLayout] = useState(false);
  const {data} = props;
  const {hotel} = props;
  const {isToken} = props;
  const searchField = useSelector(state => state.HotelReducers.hotelRules);
  const selectedRoom = useSelector(state => state.HotelReducers.selectedRoom);
  const [onSelectRoom, setOnSelectRoom] = useState({
    id: '',
    code: '',
    floor: '',
    room_type: '',
  });
  const [dataLayout, setDataLayout] = useState([]);
  const dispatch = useDispatch();

  const countries = [
    'Menghadap Kota',
    'Menghadap Garden',
    'Menghadap Kolam Renang',
  ];

  // console.log(
  //   searchField.adult,
  //   searchField.startDate,
  //   searchField.endDate,
  //   searchField.children,
  //   hotel.slug,
  //   data.id,
  // );
  // console.log(selectedRoom);
  return (
    <View style={{margin: 5}}>
      <Image
        style={{flex: 1, height: 100, borderRadius: 10}}
        source={{uri: data.media[0]}}
      />
      <View style={{padding: 1}}>
        <Text style={{fontSize: adjust(10), color: GrayBold}}>{data.name}</Text>
        <Text style={{fontSize: adjust(9), color: Oranges}}>
          sisa kamar {data.room_available}
        </Text>
        <Text style={{fontSize: adjust(9), color: GrayBold}}>
          {formatter(data.price)} / malam
        </Text>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="single-bed" />
          <Text style={{fontSize: adjust(9), color: GrayBold, marginLeft: 3}}>
            {data.max_person} Tamu
          </Text>
        </View>
        <View>
          <ModalComponent
            ButtonCustoms={({open}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    open(() => {
                      setLoadingLayout(true);
                      getRoomLayoutAvaliable(
                        isToken,
                        {
                          adult: searchField.adult,
                          checkin: moment(searchField.startDate).format(
                            'DD MMM YYYY',
                          ),
                          checkout: moment(searchField.endDate).format(
                            'DD MMM YYYY',
                          ),
                          children: searchField.children,
                          hotel_slug: hotel.slug,
                          room_type_id: data.id,
                        },
                        value => {
                          setDataLayout(value.data.data);
                          setLoadingLayout(false);
                        },
                      );
                    })
                  }
                  style={{
                    marginVertical: 5,
                    backgroundColor:
                      data.id === onSelectRoom.room_type ||
                      data.id === selectedRoom.room_type
                        ? Greens
                        : Oranges,
                    padding: 5,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}>
                  <Text style={{fontSize: adjust(9), color: 'white'}}>
                    {data.id === onSelectRoom.room_type ||
                    data.id === selectedRoom.room_type
                      ? `Kamar Dipilih ${selectedRoom.code}`
                      : 'Pilih Kamar'}
                  </Text>
                </TouchableOpacity>
              );
            }}
            ContainerStyleContent={{
              backgroundColor: 'rgba(52, 52, 52, 0.5)',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              alignItems: 'center',
            }}
            isTransparent={true}
            ContentCustoms={({close}) => (
              <View
                style={{
                  padding: 5,
                  width: WidthScreen * 0.8,
                  // height: HeightScreen * 0.9,
                  borderWidth: 1,
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <SelectDropdown
                  buttonStyle={{
                    height: 25,
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: Oranges,
                    borderColor: GrayBold,
                  }}
                  defaultButtonText={'Choose Room'}
                  buttonTextStyle={{fontSize: adjust(10), color: 'white'}}
                  dropdownStyle={{backgroundColor: 'white', borderRadius: 10}}
                  rowTextStyle={{color: Oranges, fontSize: adjust(9)}}
                  rowStyle={{height: 30}}
                  data={countries}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
                {loadingLayout ? (
                  <ActivityIndicator color={Oranges} />
                ) : (
                  <View style={{width: '100%', height: HeightScreen * 0.4}}>
                    <ScrollView
                      style={{
                        width: '100%',
                        borderWidth: 1,
                        borderColor: GrayFade,
                        borderRadius: 10,
                        marginTop: 10,
                      }}>
                      {dataLayout.map((room, index) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              // dispatch({
                              //   type: 'selectedRoom',
                              //   data: {
                              //     id: room.id,
                              //     code: room.code,
                              //     floor: room.floor,
                              //     room_type: room.room_type,
                              //   },
                              // })
                              setOnSelectRoom({
                                id: room.id,
                                code: room.code,
                                floor: room.floor,
                                room_type: room.room_type,
                              });
                            }}
                            key={room.id}
                            style={{
                              flex: 1,
                              // width: WidthScreen *,
                              padding: 3,
                              borderWidth: 1,
                              borderColor:
                                onSelectRoom.id === room.id ||
                                selectedRoom.id === room.id
                                  ? Greens
                                  : GrayBold,
                              margin: 5,
                              borderRadius: 5,
                              backgroundColor:
                                onSelectRoom.id === room.id ||
                                selectedRoom.id === room.id
                                  ? Greens
                                  : 'white',
                            }}>
                            <Text
                              style={{
                                color:
                                  onSelectRoom.id === room.id ||
                                  selectedRoom.id === room.id
                                    ? 'white'
                                    : GrayBold,
                              }}>
                              {room.code}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                )}

                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setOnSelectRoom({
                        id: '',
                        code: '',
                        floor: '',
                        room_type: '',
                      }),
                        close();
                    }}
                    style={{
                      width: WidthScreen * 0.3,
                      backgroundColor: 'red',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 5,
                      borderRadius: 10,
                    }}>
                    <Text style={{color: 'white'}}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({
                        type: 'selectedRoom',
                        data: onSelectRoom,
                        descriptionKamar: data,
                      });
                      setOnSelectRoom({
                        id: '',
                        code: '',
                        floor: '',
                        room_type: '',
                      }),
                        close();
                    }}
                    style={{
                      width: WidthScreen * 0.3,
                      backgroundColor: Greens,
                      display: 'flex',
                      alignItems: 'center',
                      padding: 5,
                      borderRadius: 10,
                    }}>
                    <Text style={{color: 'white'}}>Select</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default CardRoom;
