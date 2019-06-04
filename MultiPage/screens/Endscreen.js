import React from 'react';
import { Text , Alert, View, StyleSheet, Button, Dimensions, TouchableHighlight, ImageBackground} from 'react-native';

class HomeText extends React.Component {
    render() {
      return (
        <Text style={styles.score}>{this.props.text}</Text>
        
    );
  }
}

const Endscreen = ({navigation}) => (
  <ImageBackground
          style={styles.background}
          source={{ uri: 'https://amp.businessinsider.com/images/5b8e6a6804f1621c008b58f9-750-375.jpg' }}
      >
  <View style={styles.container}>
  
    
    <View style={styles.button}>
      <HomeText text={'Flappy Bird: Garbage fire edition'}/>
    </View>
    
    <View style={styles.nextButtonContainer}>
      <TouchableHighlight
        style={styles.nextButton}
        onPress={() => {

        }}
      >
        <HomeText text={'Really? I did not think it was possible to lose that fast.'}/>
      </TouchableHighlight>
    </View>
    
    
  </View>
  </ImageBackground>
)
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
	  },
    button: {
          
  				width: Dimensions.get('window').width,	height: 80,
  				borderColor: 'black',
          borderWidth: 3,
          alignItems: 'center',
  				justifyContent: 'center',
  				backgroundColor: 'white',
      },
      nextButtonContainer:{
        height: 450,
        justifyContent: 'flex-end',
      },
      nextButton: {
            
    				width: Dimensions.get('window').width,	height: 80,
    				borderColor: 'black',
            borderWidth: 3,
            alignItems: 'center',
    				justifyContent: 'center',
    				backgroundColor: 'orange',
        },
      score:{
  			fontFamily: 'Roboto',
  			fontWeight: 'bold',
  			fontSize: 20,
  		},
      background: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
      },
});
export default Endscreen