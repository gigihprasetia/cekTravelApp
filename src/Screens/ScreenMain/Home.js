import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import adjust, {
  HeightScreen,
  Oranges,
  White,
  WidthScreen,
} from '../../../assets/utils';
import HeadersCom from '../../../assets/Component/HeadersCom';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalComponent from '../../../assets/Component/ModalComponent';
import {orange100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Home = props => {
  const {navigation} = props;

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: White,
        width: '100%',
        alignItems: 'center',
      }}>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{paddingHorizontal: 10}}
        showsVerticalScrollIndicator={false}>
        {/* <HeadersCom /> */}
        <View
          style={{
            flex: 1,
            height: 60,
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Oranges,
          }}>
          <ModalComponent
            ButtonCustoms={() => (
              <View style={{alignItems: 'center', display: 'flex'}}>
                <Material name="airplane" size={25} color={Oranges} />
                <Text style={{fontSize: adjust(8), color: Oranges}}>
                  Pesawat
                </Text>
              </View>
            )}
            ContentCustoms={({close}) => (
              <View
                style={{
                  width: WidthScreen * 0.8,
                  height: HeightScreen * 0.2,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  display: 'flex',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'red',
                }}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    width: '80%',
                    height: '80%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 14, color: 'red'}}>
                    Maaf Belum Tersedia Untuk Fitur Pesawat
                  </Text>
                </View>
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

          <TouchableOpacity
            onPress={() => navigation.navigate('Hotel')}
            style={{alignItems: 'center', display: 'flex'}}>
            <Material name="home-city" size={25} color={Oranges} />
            <Text style={{fontSize: adjust(8), color: Oranges}}>Hotel</Text>
          </TouchableOpacity>
          <ModalComponent
            ButtonCustoms={() => (
              <View style={{alignItems: 'center', display: 'flex'}}>
                <Material name="train" size={25} color={Oranges} />
                <Text style={{fontSize: adjust(8), color: Oranges}}>Train</Text>
              </View>
            )}
            ContentCustoms={({close}) => (
              <View
                style={{
                  width: WidthScreen * 0.8,
                  height: HeightScreen * 0.2,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  display: 'flex',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'red',
                }}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    width: '80%',
                    height: '80%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: adjust(11), color: 'red'}}>
                    Maaf Belum Tersedia Untuk Fitur Kereta Api
                  </Text>
                </View>
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
          <ModalComponent
            ButtonCustoms={() => (
              <View style={{alignItems: 'center', display: 'flex'}}>
                <Material name="bus" size={25} color={Oranges} />
                <Text style={{fontSize: adjust(8), color: Oranges}}>Bus</Text>
              </View>
            )}
            ContentCustoms={({close}) => (
              <View
                style={{
                  width: WidthScreen * 0.8,
                  height: HeightScreen * 0.2,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  display: 'flex',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'red',
                }}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    width: '80%',
                    height: '80%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: adjust(11), color: 'red'}}>
                    Maaf Belum Tersedia Untuk Fitur Bus
                  </Text>
                </View>
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
        {/* ARTICLES */}
        <View
          style={{
            flex: 1,
            marginTop: 10,
            flexDirection: 'row',
            borderBottomColor: Oranges,
            borderBottomWidth: 1,
          }}>
          <Text style={{fontSize: adjust(11), color: 'black'}}>
            LATEST ARTICLES
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 130,
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}>
          <ScrollView
            style={{flex: 1}}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5].map(val => (
              <View
                key={val}
                style={{width: WidthScreen * 0.4, marginHorizontal: 10}}>
                <Image
                  source={{
                    uri: 'https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg?width=660&height=373&fit=crop&format=pjpg&auto=web',
                  }}
                  style={{
                    width: WidthScreen * 0.4,
                    height: 90,
                    borderRadius: 10,
                  }}
                />
                <Text style={{fontSize: adjust(8), color: 'black'}}>
                  Tips Traveling Bersama Dua Anak dari Super Model Laura Muljadi
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* REKOMENDASI LIBURAN*/}
        <View
          style={{
            flex: 1,
            marginTop: 10,
            flexDirection: 'row',
            borderBottomColor: Oranges,
            borderBottomWidth: 1,
          }}>
          <Text style={{fontSize: adjust(11), color: 'black'}}>
            REKOMENDASI LIBURAN{' '}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 130,
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}>
          <ScrollView
            style={{flex: 1}}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5].map(val => (
              <View
                key={val}
                style={{width: WidthScreen * 0.4, marginHorizontal: 10}}>
                <Image
                  source={{
                    uri: 'https://cdn-2.tstatic.net/tribunnews/foto/bank/images/gaya-traveling-orang-indonesia-kamu-masuk-yang-mana-nih.jpg',
                  }}
                  style={{
                    width: WidthScreen * 0.4,
                    height: 90,
                    borderRadius: 10,
                  }}
                />
                <Text style={{fontSize: adjust(8), color: 'black'}}>
                  Tips Traveling Bersama Dua Anak dari Super Model Laura Muljadi
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 10,
            marginBottom: 10,
            flexDirection: 'row',
            borderBottomColor: Oranges,
            borderBottomWidth: 1,
          }}>
          <Text style={{fontSize: adjust(11), color: 'black'}}>
            DESTINATION{' '}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 180,
            marginBottom: 60,
            flexDirection: 'row',
          }}>
          <Image
            style={{flex: 1, borderRadius: 10, marginRight: 5}}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Yogyakarta_Indonesia_Tugu-Yogyakarta-02.jpg',
            }}
          />
          <Image
            style={{flex: 1, borderRadius: 10, marginLeft: 5}}
            source={{
              uri: 'https://img.antaranews.com/cache/800x533/2020/05/26/91A603E9-EBF4-438A-A3AD-89A65E193A59.jpeg.webp',
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
