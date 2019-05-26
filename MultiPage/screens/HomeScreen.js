import React from 'react';
import { Text , Alert, View, Button} from 'react-native';


const HomeScreen = ({navigation}) => (
  <View>
    <Text>Bye!!!</Text>
    <Button onPress={() => {    
        navigation.navigate('Second')
      }}
      title="Press Me"
    />  
  </View>
  
)

export default HomeScreen