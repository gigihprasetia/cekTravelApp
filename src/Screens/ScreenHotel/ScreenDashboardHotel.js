import {
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import React, {useEffect} from 'react';
import adjust, {
  HeightScreen,
  Oranges,
  WidthScreen,
  Greens,
} from '../../../assets/utils';
import {getHotel} from '../../../assets/API/functionget';
import SearchBar from '../../../assets/Component/SearchBar';
import {useState} from 'react';
import CardHotel from '../../../assets/Component/cardHotel';

export default function ScreenDashboardHotel(props) {
  const [dataHotel, setDatahotel] = useState([]);
  const {navigation} = props;
  useEffect(() => {
    getHotel(res => setDatahotel(res));
  }, []);

  // console.log(dataHotel);
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <FlatList
        ListHeaderComponent={<SearchBar />}
        numColumns={2}
        keyExtractor={items => items.id}
        data={dataHotel}
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
    </SafeAreaView>
  );
}
