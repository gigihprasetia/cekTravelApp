import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, Pressable} from 'react-native';
import {HeightScreen, Oranges, WidthScreen} from '../../../assets/utils';
const Stack = createNativeStackNavigator();
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenDashboardHotel from './ScreenDashboardHotel';
import ScreenDetailHotel from './ScreenDetailHotel';
import ScreenFilterHotel from './ScreenFilterHotel';
import ScreenFormPayment from './ScreenFormPayment';
import ScreenProcess from './ScreenProcess';

const StackHotel = () => {
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
                paddingHorizontal: WidthScreen * 0.02,
                justifyContent: 'center',
                ...(route.name === 'DetailHotel' && {position: 'absolute'}),
              }}>
              <Pressable onPress={() => navigation.goBack()}>
                <Icons
                  name="arrow-left"
                  size={HeightScreen * 0.03}
                  color={'white'}
                />
              </Pressable>
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
