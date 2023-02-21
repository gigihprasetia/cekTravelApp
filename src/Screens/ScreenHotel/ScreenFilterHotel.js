import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import adjust, {
  GrayBold,
  GrayFade,
  HeightScreen,
  Greens,
  Oranges,
} from '../../../assets/utils';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

import CardHotel from '../../../assets/Component/cardHotel';
import {Slider} from '@miblanchard/react-native-slider';
import {Button, Checkbox} from 'react-native-paper';
import LoadingPage from '../../../assets/Component/LoadingPage';
import {getHotelAvaliable} from '../../../assets/API/funtionPost';
import moment from 'moment';

export default function ScreenFilterHotel(props) {
  const [filter, setFilter] = useState({
    active: false,
    resultFilter: {},
  });
  const [dataHotel, setDatahotel] = useState({
    status: false,
    data: [],
  });
  const {navigation} = props;
  const searchField = useSelector(state => state.HotelReducers.hotelRules);
  const isToken = useSelector(
    state => state.UserReducers.isAuthenticated.token,
  );

  useEffect(() => {
    getHotelAvaliable(
      isToken,
      {
        checkin: moment(searchField.startDate).format('DD MMM YYYY'),
        checkout: moment(searchField.endDate).format('DD MMM YYYY'),
        adult: searchField.adult,
        children: searchField.children,
      },
      hotel =>
        setDatahotel({
          status: true,
          data: hotel.data.data,
        }),
    );
  }, []);
  // console.log(searchField);

  return !dataHotel.status ? (
    <LoadingPage />
  ) : (
    <SafeAreaView style={{flex: 1, height: '100%'}}>
      {dataHotel.data.length === 0 ? (
        <View
          style={{
            flex: 1,
            height: '95%',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: adjust(10), color: GrayBold}}>
            Hotel Yang Anda Cari Tidak Tersedia
          </Text>
          <Button
            // buttonColor={Greens}
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={{marginTop: 10}}>
            <Text style={{fontSize: adjust(9), color: GrayBold}}>
              Kembali Ke Pencarian
            </Text>
          </Button>
        </View>
      ) : (
        <View style={{flex: 1, height: '95%', backgroundColor: 'white'}}>
          {!filter.active && (
            <FlatList
              numColumns={2}
              keyExtractor={items => items.id}
              data={dataHotel.data}
              renderItem={({item}) => {
                return (
                  <CardHotel
                    onPress={() =>
                      navigation.navigate('DetailHotel', {
                        slug: item.slug,
                      })
                    }
                    data={item}
                  />
                );
              }}
            />
          )}
        </View>
      )}

      <View
        style={{
          height: 40,
          backgroundColor: filter.active ? 'red' : Oranges,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {filter.active && (
          <View
            style={{
              position: 'absolute',
              bottom: 40,
              width: '100%',
              backgroundColor: 'white',
              borderWidth: 1,
              zIndex: 20,
              padding: 5,
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
              borderColor: GrayFade,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <Text style={{fontSize: adjust(14), color: Oranges}}>
                Filter Result
              </Text>
              <Text style={{fontSize: adjust(14), color: GrayBold}}>Reset</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: 5,
              }}>
              <Text style={{fontSize: adjust(12), color: Oranges}}>
                Kisaran Harga Permalam
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginVertical: 12}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text>Rp 0</Text>
                <View style={{width: '100%'}}>
                  <Slider
                    minimumValue={0}
                    maximumValue={16}
                    thumbTintColor={Oranges}
                    trackStyle={{backgroundColor: Oranges}}
                    onValueChange={e => console.log(e)}
                  />
                </View>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text>Rp 16.000.000</Text>
                <View style={{width: '100%'}}>
                  <Slider
                    minimumValue={0}
                    maximumValue={16}
                    thumbTintColor={Oranges}
                    trackStyle={{backgroundColor: Oranges}}
                    onValueChange={e => console.log(e)}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginVertical: 5,
              }}>
              <Text style={{fontSize: adjust(12), color: Oranges}}>Area</Text>
              {['Depok', 'Catur Tunggal', 'Malioboro', 'Mlati'].map(
                (val, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Checkbox />
                      <Text style={{fontSize: adjust(10), color: GrayBold}}>
                        {val}
                      </Text>
                      <Text style={{fontSize: adjust(10), color: GrayFade}}>
                        {' '}
                        ( 25 properti )
                      </Text>
                    </View>
                  );
                },
              )}
            </View>
            <View
              style={{
                flex: 1,
                marginVertical: 5,
              }}>
              <Text style={{fontSize: adjust(12), color: Oranges}}>
                Fasilitas
              </Text>
              {['Wifi', 'Swimming Pool', 'Parking', 'Restaurant'].map(
                (val, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Checkbox />
                      <Text style={{fontSize: adjust(10), color: GrayBold}}>
                        {val}
                      </Text>
                    </View>
                  );
                },
              )}
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={() =>
            setFilter({
              ...filter,
              active: !filter.active,
            })
          }
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>
            {filter.active ? 'Close' : 'Filter'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
