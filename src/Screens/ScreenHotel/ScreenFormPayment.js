import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {inquiryProcess, processPayment} from '../../../assets/API/funtionPost';
import moment from 'moment';
import adjust, {
  formatter,
  GrayBold,
  GrayFade,
  Oranges,
  WidthScreen,
} from '../../../assets/utils';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';
import axios from 'axios';
import {APIV2} from '../../../assets/API';
import ModalComponent from '../../../assets/Component/ModalComponent';
const ScreenFormPayment = props => {
  const dataHotel = useSelector(state => state);
  const [identitasPemesanInput, setIdentitasPemesanInput] = useState({
    title: {
      value: '',
      status: false,
      message: '',
    },
    nama: {
      value: '',
      status: false,
      message: '',
    },
    identitas: {
      value: '',
      status: false,
      message: '',
    },
    nomorIdentitas: {
      value: '',
      status: false,
      message: '',
    },
    email: {
      value: '',
      status: false,
      message: '',
    },
    noTelephone: {
      value: '',
      status: false,
      message: '',
    },
  });
  // console.log(dataHotel)
  const [dataPemesan, setDataPemesan] = useState({
    status: false,
    data: null,
  });
  const [selectPayment, setSelectPayment] = useState('');

  const {navigation} = props;

  useEffect(() => {
    const getDetailinquiry = async key => {
      await APIV2.get(`/booking/inquiry-detail`, {params: {key: key}})
        .then(val => {
          // console.log(val,"hahah")
          setDataPemesan({
            status: true,
            data: val.data.data,
          });
        })
        .catch(e => console.log(e));
    };

    inquiryProcess(
      {
        addons: [],
        adult: dataHotel.HotelReducers.hotelRules.adult,
        checkin: moment(dataHotel.HotelReducers.hotelRules.startDate).format(
          'DD MMM YYYY',
        ),
        checkout: moment(dataHotel.HotelReducers.hotelRules.endDate).format(
          'DD MMM YYYY',
        ),
        children: dataHotel.HotelReducers.hotelRules.children,
        room_id: dataHotel.HotelReducers.selectedRoom.id,
      },
      inquir => getDetailinquiry(inquir.data.data.inquiry_key),
    );
  }, []);

  const titleTemplate = ['Mr', 'Mrs'];
  const identitasTemplate = ['KTP'];

  const validate = text => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return true;
    } else {
      return false;
    }
  };

  // console.log(dataPemesan, 'pemesan');

  const allValidation = (data, callback) => {
    if (data.title.value === '') {
      setIdentitasPemesanInput({
        ...identitasPemesanInput,
        title: {
          ...identitasPemesanInput.title,
          message: 'harus diisi',
          status: false,
        },
      });
    } else if (data.nama.value === '') {
      setIdentitasPemesanInput({
        ...identitasPemesanInput,
        nama: {
          ...identitasPemesanInput.nama,
          message: 'harus diisi',
          status: false,
        },
      });
    } else if (data.identitas.value === '') {
      setIdentitasPemesanInput({
        ...identitasPemesanInput,
        identitas: {
          ...identitasPemesanInput.identitas,
          message: 'harus diisi',
          status: false,
        },
      });
    } else if (data.nomorIdentitas.value === '') {
      setIdentitasPemesanInput({
        ...identitasPemesanInput,
        nomorIdentitas: {
          ...identitasPemesanInput.nomorIdentitas,
          message: 'harus diisi',
          status: false,
        },
      });
    } else if (data.email.value === '' || validate(data.email.value)) {
      setIdentitasPemesanInput({
        ...identitasPemesanInput,
        email: {
          ...identitasPemesanInput.email,
          message: 'harus diisi dengan format email yang tepat',
          status: false,
        },
      });
    } else if (
      data.noTelephone.value === '' ||
      data.noTelephone.value.length < 10
    ) {
      setIdentitasPemesanInput({
        ...identitasPemesanInput,
        noTelephone: {
          ...identitasPemesanInput.noTelephone,
          message: 'nomor telephone tidak valid',
          status: false,
        },
      });
    } else {
      callback();
    }
  };
  // console.log(dataPemesan);

  return (
    <SafeAreaView style={{flex: 1, height: '100%', padding: 5}}>
      <ScrollView>
        {/* RangkumanPemesanan */}
        <View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: GrayBold,
              paddingBottom: 5,
              marginBottom: 5,
              borderBottomColor: Oranges,
            }}>
            <Text
              style={{
                color: Oranges,
                fontSize: adjust(13),
                fontWeight: 'bold',
              }}>
              Rangkuman Pemesanan
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              borderWidth: 1,
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 4,
              borderColor: GrayFade,
            }}>
            <Text style={{color: GrayBold, fontSize: adjust(10)}}>Tanggal</Text>
            <Text style={{color: GrayFade, fontSize: adjust(10)}}>
              {moment(dataHotel.HotelReducers.hotelRules.startDate).format(
                'DD MMM YYYY',
              )}{' '}
              -{' '}
              {moment(dataHotel.HotelReducers.hotelRules.endDate).format(
                'DD MMM YYYY',
              )}
            </Text>
          </View>

          <View
            style={{
              marginVertical: 5,
              borderWidth: 1,
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 4,
              borderColor: GrayFade,
            }}>
            <Text style={{color: GrayBold, fontSize: adjust(10)}}>Tamu</Text>
            <Text style={{color: GrayFade, fontSize: adjust(10)}}>
              {dataHotel.HotelReducers.hotelRules.adult +
                dataHotel.HotelReducers.hotelRules.children}{' '}
              Orang
            </Text>
          </View>
        </View>
        {/* CARD PESANAN */}
        {dataPemesan.status ? (
          <View
            style={{
              marginTop: 10,
              borderWidth: 1,
              borderColor: GrayFade,
              padding: 5,
              borderRadius: 5,
            }}>
            <Image
              source={{uri: dataPemesan.data.hotel.medias[0]}}
              style={{flex: 1, height: 150, borderRadius: 5}}
            />
            <Text
              style={{
                fontSize: adjust(13),
                fontWeight: 'bold',
                color: GrayBold,
              }}>
              {dataPemesan.data.hotel.name}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontSize: adjust(10),
                  fontWeight: 'bold',
                  color: GrayBold,
                }}>
                {formatter(dataPemesan.data.room_price)} X{' '}
                {dataPemesan.data.total_day} malam
              </Text>
              <Text
                style={{
                  fontSize: adjust(10),
                  fontWeight: 'bold',
                  color: GrayBold,
                }}>
                {formatter(dataPemesan.data.base_price)}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: GrayFade,
                marginBottom: 10,
                paddingBottom: 5,
              }}>
              <Text
                style={{
                  fontSize: adjust(10),
                  fontWeight: 'bold',
                  color: GrayBold,
                }}>
                Pajak
              </Text>
              <Text
                style={{
                  fontSize: adjust(10),
                  fontWeight: 'bold',
                  color: GrayBold,
                }}>
                {formatter(dataPemesan.data.tax)}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: adjust(10),
                  fontWeight: 'bold',
                  color: GrayBold,
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontSize: adjust(10),
                  fontWeight: 'bold',
                  color: GrayBold,
                }}>
                {formatter(dataPemesan.data.final_price)}
              </Text>
            </View>
          </View>
        ) : (
          <ActivityIndicator color={Oranges} />
        )}
        {/* IdentitasPemesan */}
        <View style={{marginVertical: 10}}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: GrayBold,
              paddingBottom: 5,
              marginBottom: 10,
              borderBottomColor: Oranges,
            }}>
            <Text
              style={{
                color: Oranges,
                fontSize: adjust(13),
                fontWeight: 'bold',
              }}>
              Identitas Pemesan
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: WidthScreen * 0.5}}>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>Title</Text>
              <Text style={{color: 'red', fontSize: adjust(9)}}>
                {identitasPemesanInput.title.message}
              </Text>
              <SelectDropdown
                buttonStyle={{
                  height: 30,
                  borderWidth: 1,
                  borderColor: GrayFade,
                  borderRadius: 5,
                  // display: 'flex',
                }}
                defaultButtonText={'title'}
                buttonTextStyle={{
                  fontSize: adjust(10),
                  color: GrayFade,
                }}
                dropdownStyle={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}
                rowTextStyle={{color: Oranges, fontSize: adjust(9)}}
                rowStyle={{height: 30}}
                data={titleTemplate}
                onSelect={(selectedItem, index) => {
                  setIdentitasPemesanInput({
                    ...identitasPemesanInput,
                    title: {
                      value: selectedItem,
                      message: '',
                      status: false,
                    },
                  });
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
                renderDropdownIcon={() => <Icon name="arrow-drop-down" />}
              />
            </View>
          </View>
          <View>
            <View style={{marginVertical: 5}}>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>Nama</Text>
              <Text style={{color: GrayFade, fontSize: adjust(9)}}>
                Seperti di KTP/Paspor/SIM (tanpa tanda baca dan gelar)
              </Text>
              <Text style={{color: 'red', fontSize: adjust(9)}}>
                {identitasPemesanInput.nama.message}
              </Text>
              <TextInput
                placeholder="example: cektravel"
                style={{
                  borderWidth: 1,
                  height: 35,
                  borderColor: GrayFade,
                  borderRadius: 5,
                  marginTop: 5,
                  paddingHorizontal: 10,
                }}
                keyboardType={'default'}
                onChangeText={nama =>
                  setIdentitasPemesanInput({
                    ...identitasPemesanInput,
                    nama: {
                      value: nama,
                      message: '',
                      status: false,
                    },
                  })
                }
              />
            </View>
          </View>
          <View style={{width: WidthScreen * 0.5}}>
            <Text style={{color: GrayBold, fontSize: adjust(10)}}>
              Identitas
            </Text>
            <Text style={{color: 'red', fontSize: adjust(9)}}>
              {identitasPemesanInput.identitas.message}
            </Text>
            <SelectDropdown
              buttonStyle={{
                height: 30,
                borderWidth: 1,
                borderColor: GrayFade,
                borderRadius: 5,
                // display: 'flex',
              }}
              defaultButtonText={'Identitas'}
              buttonTextStyle={{
                fontSize: adjust(10),
                color: GrayFade,
              }}
              dropdownStyle={{
                backgroundColor: 'white',
                borderRadius: 10,
              }}
              rowTextStyle={{color: Oranges, fontSize: adjust(9)}}
              rowStyle={{height: 30}}
              data={identitasTemplate}
              onSelect={(selectedItem, index) => {
                setIdentitasPemesanInput({
                  ...identitasPemesanInput,
                  identitas: {
                    value: selectedItem,
                    message: '',
                    status: false,
                  },
                });
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
              renderDropdownIcon={() => <Icon name="arrow-drop-down" />}
            />
          </View>
          <View>
            <View style={{marginVertical: 5}}>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                Nomor Identitas
              </Text>
              <Text style={{color: 'red', fontSize: adjust(9)}}>
                {identitasPemesanInput.nomorIdentitas.message}
              </Text>
              <TextInput
                placeholder="number"
                style={{
                  borderWidth: 1,
                  height: 35,
                  borderColor: GrayFade,
                  borderRadius: 5,
                  marginTop: 5,
                  paddingHorizontal: 10,
                }}
                keyboardType={'numeric'}
                onChangeText={nomorIdentitas =>
                  setIdentitasPemesanInput({
                    ...identitasPemesanInput,
                    nomorIdentitas: {
                      value: nomorIdentitas,
                      message: '',
                      status: false,
                    },
                  })
                }
              />
            </View>
          </View>
          <View>
            <View style={{marginVertical: 5}}>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>Email</Text>
              <Text style={{color: 'red', fontSize: adjust(9)}}>
                {identitasPemesanInput.email.message}
              </Text>
              <Text style={{color: GrayFade, fontSize: adjust(9)}}>
                e-tiket akan dikirimkan ke email ini
              </Text>
              <TextInput
                placeholder="Example@gmail.com"
                style={{
                  borderWidth: 1,
                  height: 35,
                  borderColor: GrayFade,
                  borderRadius: 5,
                  marginTop: 5,
                  paddingHorizontal: 10,
                }}
                keyboardType={'email-address'}
                onChangeText={email =>
                  setIdentitasPemesanInput({
                    ...identitasPemesanInput,
                    email: {
                      value: email,
                      message: '',
                      status: false,
                    },
                  })
                }
              />
            </View>
          </View>
          <View>
            <View style={{marginVertical: 5}}>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                Nomor Telephone
              </Text>
              <Text style={{color: 'red', fontSize: adjust(9)}}>
                {identitasPemesanInput.noTelephone.message}
              </Text>
              <TextInput
                placeholder="No Telephone"
                style={{
                  borderWidth: 1,
                  height: 35,
                  borderColor: GrayFade,
                  borderRadius: 5,
                  marginTop: 5,
                  paddingHorizontal: 10,
                }}
                keyboardType={'numeric'}
                onChangeText={nomorTelephone =>
                  setIdentitasPemesanInput({
                    ...identitasPemesanInput,
                    noTelephone: {
                      value: nomorTelephone,
                      message: '',
                      status: false,
                    },
                  })
                }
              />
            </View>
          </View>
        </View>

        <ModalComponent
          ButtonCustoms={({open}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  // open();
                  allValidation(identitasPemesanInput, () => open());
                }}
                style={{
                  flex: 1,
                  backgroundColor: Oranges,
                  padding: 10,
                  marginVertical: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: adjust(10),
                  }}>
                  Lanjut Pembayaran
                </Text>
              </TouchableOpacity>
            );
          }}
          isTransparent={true}
          ContainerStyleContent={{
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
          ContentCustoms={({close}) => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 5,
                  width: WidthScreen * 0.8,
                }}>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Pilih Pembayaran</Text>
                  <TouchableOpacity
                    onPress={() => {
                      close();
                    }}>
                    <Icon name="close" color={'red'} />
                  </TouchableOpacity>
                </View>
                <Text>Virtual Account</Text>
                {/* <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    marginTop: 10,
                    padding: 5,
                    borderColor: GrayFade,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                    BNI Virtual Account
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    marginTop: 10,
                    padding: 5,
                    borderColor: GrayFade,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                    Permata Virtual Account
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    marginTop: 10,
                    padding: 5,
                    borderColor: GrayFade,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                    BRI Virtual Account
                  </Text>
                </TouchableOpacity> */}
                {[
                  {name: 'BNI VIRTUAL ACCOUNT', code: 'bni'},
                  {name: 'PERMATA VIRTUAL ACCOUNT', code: 'permata'},
                  {name: 'BRI VIRTUAL ACCOUNT', code: 'bri'},
                ].map(val => {
                  return (
                    <TouchableOpacity
                      key={val.code}
                      onPress={() =>
                        processPayment(
                          {
                            email: identitasPemesanInput.email.value,
                            id_number:
                              identitasPemesanInput.nomorIdentitas.value,
                            id_type: identitasPemesanInput.identitas.value,
                            inquiry_key: dataPemesan.data.inquiry_key,
                            name: identitasPemesanInput.nama.value,
                            payment_method: 'bank_transfer_virtual_account',
                            payment_provider: val.code,
                            phone: identitasPemesanInput.noTelephone.value,
                            title: identitasPemesanInput.title.value,
                          },
                          value => {
                            navigation.reset({
                              index: 0,
                              routes: [
                                {
                                  name: 'Process',
                                  params: value.data.data.booking_code,
                                },
                              ],
                            });
                          },
                        )
                      }
                      style={{
                        borderWidth: 1,
                        marginTop: 10,
                        padding: 5,
                        borderColor: GrayFade,
                        borderRadius: 5,
                      }}>
                      <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                        {val.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          }}
        />
        <Text
          style={{color: GrayBold, fontSize: adjust(10), marginVertical: 10}}>
          Dengan menekan tombol, kamu menyetujui Kebijakan Privasi dan Syarat &
          Ketentuan kami
        </Text>
        {/* LANJUT PEMBAYARAN */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenFormPayment;
