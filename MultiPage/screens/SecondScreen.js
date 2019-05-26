import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableHighlight, Button } from 'react-native';


//todo: make the ball expand and contract 
//      change the angle when the ball hits the wall - modify xSpeed or ySpeed
class SecondScreen extends React.Component {
	constructor() {
       super();
       this.state = { 
            x: 150, 
	          y: 10,
					  xInc: true,
					  yInc: true,
					  xSpeed: 0,
					  ySpeed: 4,
					  diameter: 60,
            seconds: 0,
            tapped: false,
						curYPos:0,
						jump:false,
						
						pipeX: 50,
						pipeY: 0,
						pipeHeight: Math.round((Math.random()*140)+170),
						pipeWidth: 70,
            };
	}

   
	timerEvent = () => {
		//get the dimensions of the screen
		let deviceWidth = Dimensions.get('window').width;
		let deviceHeight = Dimensions.get('window').height;
		
		//update the current x coordinates
		let curX = this.state.x;
		let curXDir = this.state.xInc;
		if (curXDir) {
			curX += this.state.xSpeed;
			if (curX > deviceWidth-this.state.diameter) {
				curXDir = false;
			}
		}
		else  {
			curX -= this.state.xSpeed;
			if (curX < 0) {
				curXDir = true;
			}
		}
		
		//update the current y coordinates
		let curY = this.state.y;
		let curYDir = this.state.yInc;
    let yVel = this.state.ySpeed;
    let curyPosition = this.state.curYPos;
		let isJumping = this.state.jump;
		let isTapped = this.state.tapped;
        
    if(isTapped && yVel>0){
      isJumping=true;
			curyPosition = curY;
			yVel = yVel*-1;
    }
    
		if(isJumping && this.state.y<=curyPosition-40){
			yVel = yVel*-1;
			isJumping = false;
			isTapped = false;
		}
		
		if (curY<deviceHeight-140) {
			curY += yVel;
		}
		else  {
			yVel=0;
		}

		//update state with local variables
        this.setState( {x: curX, y: curY, xInc: curXDir, yInc: curYDir, ySpeed:yVel, curYPos: curyPosition, jump: isJumping, tapped: isTapped} );
    };
  
  componentDidMount() {
    setInterval( this.timerEvent, 40 );  
  }
  
  ballStyle = function(options) {
     return {
      position: "absolute",
      right: this.state.x,
      top: this.state.y,
      height: this.state.diameter,
		  width: this.state.diameter,
		  borderRadius: this.state.diameter/2,
		  backgroundColor: 'red',
     }
 }
 
 topPipe = function(options) {
		return {
		 position: "absolute",
		 right: this.state.pipeX,
		 top: this.state.pipeY,
		 height: this.state.pipeHeight,
			width: this.state.pipeWidth,
			backgroundColor: 'green',
		}
}

bottomPipe = function(options) {
	 return {
		position: "absolute",
		right: this.state.pipeX,
		top: this.state.pipeY+this.state.pipeHeight+120,
		height: Dimensions.get('window').height,
		 width: this.state.pipeWidth,
		 backgroundColor: 'green',
	 }
}
  
   render() {
      return (
      	    <View style={styles.container}>
								<Text>Telemetry </Text>
								<Text>x: {this.state.pipeX}</Text> 
			          <Text>y: {this.state.pipeY}</Text>
							  <Text>height: {this.state.pipeHeight}</Text>
							  <Text>width: {this.state.pipeWidth}</Text>
							  
                
								<View style={this.topPipe()}>
                  
          		  </View>
								<View style={this.bottomPipe()}>
                  
          		  </View>
								<View style={this.ballStyle()}>
                  
          		  </View>
								
                <View style={styles.timerView}>
									<Button onPress={() => {    
										this.setState({ 
											tapped: true,
										})
							    }}
							      title="Press Me"
							    />  
                </View>            
              
      		  </View>
      
	  );
  }
}
function round(n) {
  if (!n) {
    return 0;
  }
  return Math.round(n);
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
	  backgroundColor: 'lightblue',
	  },
  timerView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
        fontSize: 60,
        textAlign: 'center',
        color: 'black',
    },
});
export default SecondScreen