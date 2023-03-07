import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, Pressable} from 'react-native';
import adjust, {
  GrayBold,
  GrayFade,
  HeightScreen,
  Oranges,
  WidthScreen,
} from '../../../assets/utils';
const Stack = createNativeStackNavigator();
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenDashboardHotel from './ScreenDashboardHotel';
import ScreenDetailHotel from './ScreenDetailHotel';
import ScreenFilterHotel from './ScreenFilterHotel';
import ScreenFormPayment from './ScreenFormPayment';
import ScreenProcess from './ScreenProcess';
import ModalComponent from '../../../assets/Component/ModalComponent';
import {Checkbox} from 'react-native-paper';
import SearchBar from '../../../assets/Component/SearchBar';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';

const StackHotel = () => {
  const {
    HotelReducers: {facilityRoom},
  } = useSelector(state => state);

  return (
    <Stack.Navigator
      screenOptions={{
        header: props => {
          // console.log(props);

          const {navigation, route} = props;
          // console.log(route);
          return (
            <View
              style={{
                width: '100%',
                backgroundColor:
                  route.name === 'DetailHotel' ? 'transparent' : Oranges,
                height: HeightScreen * 0.06,
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: WidthScreen * 0.02,
                justifyContent: 'space-between',
                ...(route.name === 'DetailHotel' && {position: 'absolute'}),
                alignItems: 'center',
              }}>
              <Pressable onPress={() => navigation.goBack()}>
                <Icons
                  name="arrow-left"
                  size={HeightScreen * 0.03}
                  color={'white'}
                />
              </Pressable>

              {route.name === 'FilterHotel' && (
                <ModalComponent
                  ButtonCustoms={({open}) => {
                    return (
                      <Pressable
                        onPress={open}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icons name="filter" size={adjust(10)} color="white" />
                        <Text style={{fontSize: adjust(10), color: 'white'}}>
                          Filter
                        </Text>
                      </Pressable>
                    );
                  }}
                  isTransparent={true}
                  ContainerStyleContent={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'flex-end',
                  }}
                  ContentCustoms={({close}) => {
                    return (
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: HeightScreen * 0.9,
                          borderTopLeftRadius: adjust(10),
                          borderTopRightRadius: adjust(10),
                          padding: adjust(10),
                          justifyContent: 'space-between',
                        }}>
                        {/* TopPart */}
                        <View>
                          <View>
                            <Text
                              style={{
                                fontSize: adjust(12),
                                color: Oranges,
                                fontWeight: 'bold',
                              }}>
                              Filter Results
                            </Text>
                            <Text
                              style={{fontSize: adjust(9), color: GrayFade}}>
                              Showing results based on categories
                            </Text>
                          </View>

                          <View>
                            <View
                              style={{
                                marginVertical: adjust(10),
                                borderBottomWidth: 1,
                                borderBottomColor: GrayFade,
                              }}>
                              <Text
                                style={{
                                  fontSize: adjust(12),
                                  color: GrayFade,
                                  fontWeight: 'bold',
                                }}>
                                Area
                              </Text>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Checkbox status="checked" color={Oranges} />
                              <Text>Bantul</Text>
                            </View>
                          </View>
                          <View>
                            <View
                              style={{
                                marginVertical: adjust(10),
                                borderBottomWidth: 1,
                                borderBottomColor: GrayFade,
                              }}>
                              <Text
                                style={{
                                  fontSize: adjust(12),
                                  color: GrayFade,
                                  fontWeight: 'bold',
                                }}>
                                Fasilitas
                              </Text>
                            </View>
                            {facilityRoom.map((val, index) => {
                              return (
                                <View
                                  key={index}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Checkbox
                                    status={
                                      val.status ? 'checked' : 'unchecked'
                                    }
                                    color={Oranges}
                                  />
                                  <Text>{val.name}</Text>
                                </View>
                              );
                            })}
                          </View>
                        </View>
                        {/* BottomPart */}
                        <TouchableOpacity
                          onPress={close}
                          style={{
                            width: '100%',
                            backgroundColor: Oranges,
                            padding: adjust(7),
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: adjust(5),
                          }}>
                          <Text style={{color: 'white', fontWeight: 'bold'}}>
                            Apply
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              )}
            </View>
          );
        },
      }}
      initialRouteName="Dashboard Hotel">
      <Stack.Screen name="Dashboard Hotel" component={ScreenDashboardHotel} />
      <Stack.Screen name="FilterHotel" component={ScreenFilterHotel} />
      <Stack.Screen name="DetailHotel" component={ScreenDetailHotel} />
      <Stack.Screen name="FormPaymentHotel" component={ScreenFormPayment} />
      <Stack.Screen name="Process" component={ScreenProcess} />
    </Stack.Navigator>
  );
};

export default StackHotel;
