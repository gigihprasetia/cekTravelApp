import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import adjust, {
  formatter,
  GrayBold,
  GrayFade,
  HeightScreen,
  Oranges,
  WidthScreen,
} from '../utils';
import {Button, Checkbox} from 'react-native-paper';
import ModalComponent from './ModalComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

const TabelPesananRoomHotel = ({
  description,
  hotel,
  searchField,
  navigation,
}) => {
  // console.log(description, hotel);
  // console.log(searchField);
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: GrayBold,
        margOutVertical: 15,
        padding: 10,
        marginVertical: 15,
      }}>
      <View>
        {/* PRICE AND PERMALAM */}
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text>{formatter(description.price)}</Text>
            <Text>Permalam</Text>
          </View>
          <Text>{hotel.rate}</Text>
        </View>
        {/* CARD CHECKIN AND CHECKOUT */}
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: GrayBold,
            marginTop: 10,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 5,
              borderBottomWidth: 1,
              borderBottomColor: GrayBold,
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                CheckIn
              </Text>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                {moment(searchField.startDate).format('DD MMM YYYY')}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderLeftWidth: 1,
                borderLeftColor: GrayBold,
                alignItems: 'center',
              }}>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                CheckOut
              </Text>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                {moment(searchField.endDate).format('DD MMM YYYY')}
              </Text>
            </View>
          </View>
          <View style={{padding: 5}}>
            <Text>Tamu</Text>
            <Text> {searchField.adult + searchField.children}</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={{fontSize: adjust(10), color: GrayBold}}>
            {' '}
            {formatter(description.price)} X {searchField.total_night} Malam
          </Text>
          <Text style={{fontSize: adjust(11), color: Oranges}}>
            {' '}
            {formatter(parseInt(description.price) * searchField.total_night)}
          </Text>
        </View>

        {/* ADDONS */}
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: Oranges,
            marginTop: 10,
            padding: 5,
          }}>
          <Text style={{color: GrayBold, fontSize: adjust(11)}}>
            Perlu fasilitas tambahan?
          </Text>
          <Text style={{color: GrayBold, fontSize: adjust(10)}}>
            Antar Jemput | Tour Guide | Makanan
          </Text>
          <ModalComponent
            ButtonCustoms={({open}) => (
              <TouchableOpacity onPress={open}>
                <Text style={{color: Oranges, fontSize: adjust(10)}}>
                  Tambah Addons
                </Text>
              </TouchableOpacity>
            )}
            ContainerStyleContent={{
              flex: 1,
              height: '100%',
              backgroundColor: 'rgba(52, 52, 52, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            isTransparent={true}
            ContentCustoms={({close}) => {
              // console.log(close);
              return (
                <View
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    width: WidthScreen * 0.9,
                  }}>
                  <View>
                    <Text style={{color: GrayBold, fontSize: adjust(11)}}>
                      Tambah Addons
                    </Text>
                  </View>
                  {/* ///////////////// */}
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: GrayBold,
                      marginVertical: 10,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          padding: 10,
                          borderRadius: 20,
                          backgroundColor: '#4ADE80',
                        }}>
                        <Icon
                          name="fastfood"
                          color={'white'}
                          size={adjust(10)}
                        />
                      </View>
                      <Text
                        style={{
                          color: GrayBold,
                          fontSize: adjust(10),
                          marginLeft: 10,
                        }}>
                        Makanan
                      </Text>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Checkbox color="red" status="checked" />
                      <View style={{marginLeft: 5}}>
                        <Text
                          style={{
                            color: GrayBold,
                            fontSize: adjust(10),
                          }}>
                          Makan 3 Kali Sehari
                        </Text>
                        <Text
                          style={{
                            color: GrayBold,
                            fontSize: adjust(10),
                          }}>
                          Rp 56.000 / orang
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: GrayBold,
                      marginVertical: 10,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          padding: 10,
                          borderRadius: 20,
                          backgroundColor: Oranges,
                        }}>
                        <Icon
                          name="directions-car"
                          color={'white'}
                          size={adjust(10)}
                        />
                      </View>
                      <Text
                        style={{
                          color: GrayBold,
                          fontSize: adjust(10),
                          marginLeft: 10,
                        }}>
                        Penjemputan
                      </Text>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Checkbox color="red" status="checked" />
                      <View style={{marginLeft: 5}}>
                        <Text
                          style={{
                            color: GrayBold,
                            fontSize: adjust(10),
                          }}>
                          Jemput dari Bandara Internasional Adisutjipto (JOG)
                        </Text>
                        <Text
                          style={{
                            color: GrayBold,
                            fontSize: adjust(10),
                          }}>
                          Rp 150.000 / orang
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Checkbox color="red" status="checked" />
                      <View style={{marginLeft: 5}}>
                        <Text
                          style={{
                            color: GrayBold,
                            fontSize: adjust(10),
                          }}>
                          Jemput dari Yogyakarta Internasional Adisutjipto (YIA)
                        </Text>
                        <Text
                          style={{
                            color: GrayBold,
                            fontSize: adjust(10),
                          }}>
                          Rp 250.000 / orang
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: GrayBold,
                      marginVertical: 10,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          padding: 10,
                          borderRadius: 20,
                          backgroundColor: '#C084FC',
                        }}>
                        <Icon
                          name="beach-access"
                          color={'white'}
                          size={adjust(10)}
                        />
                      </View>
                      <Text
                        style={{
                          color: GrayBold,
                          fontSize: adjust(10),
                          marginLeft: 10,
                        }}>
                        Wisata
                      </Text>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Checkbox color="red" status="checked" />
                      <View style={{marginLeft: 5}}>
                        <Text
                          style={{
                            color: GrayBold,
                            fontSize: adjust(10),
                          }}>
                          Wisata Candi Borobudur
                        </Text>
                        <Text
                          style={{
                            color: GrayBold,
                            fontSize: adjust(10),
                          }}>
                          Rp 250.000 / orang
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Button
                      onPress={close}
                      buttonColor="red"
                      style={{width: '30%'}}>
                      <Text style={{color: 'white', fontSize: adjust(10)}}>
                        Batal
                      </Text>
                    </Button>
                    <Button buttonColor="#4ADE80" style={{width: '30%'}}>
                      <Text style={{color: 'white', fontSize: adjust(10)}}>
                        Simpan
                      </Text>
                    </Button>
                  </View>
                </View>
              );
            }}
            // isTransparent={true}
          />
        </View>

        <Button
          buttonColor={Oranges}
          style={{marginTop: 10}}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'FormPaymentHotel'}],
            });
          }}>
          <Text style={{color: 'white', fontSize: adjust(10)}}>
            Pesan Sekarang
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default TabelPesananRoomHotel;
