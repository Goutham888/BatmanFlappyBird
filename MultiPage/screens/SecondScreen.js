import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableHighlight, Button, ImageBackground} from 'react-native';


//todo: make the ball expand and contract 
//      change the angle when the ball hits the wall - modify xSpeed or ySpeed
class SecondScreen extends React.Component {
	constructor() {
       super();
       this.state = { 
				 		points: 0,
						addPoints: true,
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
						
						pipeY: 0,
						pipeWidth: 70,
						pipexVel: 2,
						
						pipeX: -150,						
						pipeHeight: Math.round((Math.random()*180)+150),
						
						pipeX2: -375,						
						pipeHeight2: Math.round((Math.random()*180)+150),
						
						pipeX3: -600,						
						pipeHeight3: Math.round((Math.random()*180)+150),
						
						imgAddress: 'https://m.media-amazon.com/images/M/MV5BMTkzNDY5NTg5MF5BMl5BanBnXkFtZTgwNzI4NzM1MjE@._V1_.jpg',
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
		let size = this.state.diameter;
		let isJumping = this.state.jump;
		let isTapped = this.state.tapped;
		let pointCount = this.state.points;
    let shouldAdd = this.state.addPoints;
		
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
		
		let pipeXPos = this.state.pipeX;
		let pXVel = this.state.pipexVel;
		let pipeXPos3 = this.state.pipeX3;
		let pipeXPos2 = this.state.pipeX2;
		let pipeHeight = this.state.pipeHeight;
		let pipeHeight2 = this.state.pipeHeight2;
		let pipeHeight3 = this.state.pipeHeight3;
		let pipeXStep = this.state.pipexVel;
		pipeXPos2+=pXVel;
		pipeXPos3+=pXVel;
		pipeXPos+=pXVel;
		
		
		if(pipeXPos>=350){
			pipeXPos=pipeXPos3-225;
		}
		
		if(pipeXPos2>=350){
			pipeXPos2=pipeXPos-225;
		}
		
		if(pipeXPos3>=350){
			pipeXPos3=pipeXPos2-224;
		}
		//PIPE !
		if(curX<pipeXPos-this.state.pipeWidth/2 && curX>pipeXPos-this.state.pipeWidth && shouldAdd && curY>pipeHeight && curY<pipeHeight+150){
			pointCount+=1;
			shouldAdd=false;
		}
		if((curX-60)<pipeXPos && (curX-60)>pipeXPos-this.state.pipeWidth && (curY<pipeHeight || (curY+80)>pipeHeight+150)){
			yVel=0;
			pipeXStep = 0;
			size-=5;
		}
		if(curX>pipeXPos-this.state.pipeWidth && curX<pipeXPos2 && !shouldAdd){
			shouldAdd=true;
		}
		
		
		//PIPE 2
		if(curX<pipeXPos2-this.state.pipeWidth/2 && curX>pipeXPos2-this.state.pipeWidth && shouldAdd && curY>pipeHeight2 && curY<pipeHeight2+150){
			pointCount+=1;
			shouldAdd=false;
		}
		if((curX-60)<pipeXPos2 && (curX-60)>pipeXPos2-this.state.pipeWidth && (curY<pipeHeight2 || (curY+80)>pipeHeight2+150)){
			yVel=0;
			pipeXStep = 0;
			size-=5;
		}
		if(curX>pipeXPos2-this.state.pipeWidth && curX<pipeXPos3 && !shouldAdd){
			shouldAdd=true;
		}
		
		
		//PIPE 3
		if(curX<pipeXPos3-this.state.pipeWidth/2 && curX>pipeXPos3-this.state.pipeWidth && shouldAdd && curY>pipeHeight3 && curY<pipeHeight3+150){
			pointCount+=1;
			shouldAdd=false;
		}
		if((curX-60)<pipeXPos3 && (curX-60)>pipeXPos3-this.state.pipeWidth && (curY<pipeHeight3 || (curY+80)>pipeHeight3+150)){
			yVel=0;
			pipeXStep = 0;
			size-=5;
		}
		if(curX>pipeXPos3-this.state.pipeWidth && curX<pipeXPos && !shouldAdd){
			shouldAdd=true;
		}
		
		if(size<=0){
			this.props.navigation.navigate('End');
			yVel=4;
			this.setState({diameter: 60});
		}	
		
		let bgImage = this.state.imgAddress;
		
		if(Math.round(pointCount/17)<3){
			bgImage = 'https://www.batman-on-film.com/wp-content/uploads/2018/01/batman1943.jpg';
		}
		else if(Math.round(pointCount/17)<7){
			bgImage = 'https://m.media-amazon.com/images/M/MV5BMTkzNDY5NTg5MF5BMl5BanBnXkFtZTgwNzI4NzM1MjE@._V1_.jpg';
			
		}
		else if(Math.round(pointCount/17)<12){
			bgImage = 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/batman-arkham-ps4-xbox-one/8/8b/Arkham_1970sBatman.jpg?width=640';
			
		}
		else if(Math.round(pointCount/17)<18){
			bgImage = 'http://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/51ce6099e4b0d911b4489b79/578e38e22994cafd4eabc69e/1557985627856/retro-fan-petition-to-have-michael-keaton-removed-as-batman-in-tim-burtons-film-social.jpg?format=1500w';
			
		}
		else if(Math.round(pointCount/17)<25){
			bgImage = 'https://cdn-static.denofgeek.com/sites/denofgeek/files/styles/main_wide/public/hero_1.jpg?itok=yAKQAxfQ';
			
		}
		else{
			bgImage = 'https://cdn.vox-cdn.com/thumbor/zrLnqYnRsJ985kMcmaWRG4moRJI=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/15959061/the_dark_knight_poster_crop_2700.jpg';
			
		}
		//update state with local variables
        this.setState( {x: curX, y: curY, xInc: curXDir, yInc: curYDir, ySpeed:yVel, curYPos: curyPosition, jump: isJumping, tapped: isTapped, pipeX: pipeXPos, pipeX2: pipeXPos2, pipeX3: pipeXPos3, points: pointCount, addPoints: shouldAdd, pipexVel: pipeXStep, diameter: size, imgAddress: bgImage});
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
			borderColor: 'white',
			borderWidth: 2,
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
			borderColor: 'white',
			borderWidth: 2,
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
		 borderColor: 'white',
		 borderWidth: 2,
	 }
}

topPipe2 = function(options) {
	 return {
		position: "absolute",
		right: this.state.pipeX2,
		top: this.state.pipeY,
		height: this.state.pipeHeight2,
		 width: this.state.pipeWidth,
		 backgroundColor: 'green',
		 borderColor: 'white',
		 borderWidth: 2,
	 }
}

bottomPipe2 = function(options) {
	return {
	 position: "absolute",
	 right: this.state.pipeX2,
	 top: this.state.pipeY+this.state.pipeHeight2+121,
	 height: Dimensions.get('window').height,
		width: this.state.pipeWidth,
		backgroundColor: 'green',
		borderColor: 'white',
		borderWidth: 2,
	}
}

topPipe3 = function(options) {
	 return {
		position: "absolute",
		right: this.state.pipeX3,
		top: this.state.pipeY,
		height: this.state.pipeHeight3,
		 width: this.state.pipeWidth,
		 backgroundColor: 'red',
		 borderColor: 'white',
		 borderWidth: 2,
	 }
}

bottomPipe3 = function(options) {
	return {
	 position: "absolute",
	 right: this.state.pipeX3,
	 top: this.state.pipeY+this.state.pipeHeight3+121,
	 height: Dimensions.get('window').height,
		width: this.state.pipeWidth,
		backgroundColor: 'green',
		borderColor: 'white',
		borderWidth: 2,
	}
}

  /*
		Stage 1: https://www.batman-on-film.com/wp-content/uploads/2018/01/batman1943.jpg
		Stage 2: https://m.media-amazon.com/images/M/MV5BMTkzNDY5NTg5MF5BMl5BanBnXkFtZTgwNzI4NzM1MjE@._V1_.jpg
		Stage 3: https://oyster.ignimgs.com/mediawiki/apis.ign.com/batman-arkham-ps4-xbox-one/8/8b/Arkham_1970sBatman.jpg?width=640
		Stage 4: http://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/51ce6099e4b0d911b4489b79/578e38e22994cafd4eabc69e/1557985627856/retro-fan-petition-to-have-michael-keaton-removed-as-batman-in-tim-burtons-film-social.jpg?format=1500w
		Stage 5: https://cdn-static.denofgeek.com/sites/denofgeek/files/styles/main_wide/public/hero_1.jpg?itok=yAKQAxfQ
		Stage 6: https://cdn.vox-cdn.com/thumbor/zrLnqYnRsJ985kMcmaWRG4moRJI=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/15959061/the_dark_knight_poster_crop_2700.jpg
		
		*/
   render() {
      return (
				<ImageBackground
								style={styles.background}
								source={{ uri: this.state.imgAddress }}
						>
								
					
      	    <View style={styles.container}>
								{/*<Text>Telemetry </Text>
								<Text>shouldAdd {this.state.addPoints}</Text> 
			          <Text>y: {this.state.pipeY}</Text>
							  <Text>height: {this.state.pipeHeight}</Text>
							  <Text>width: {this.state.pipeWidth}</Text>*/}
							  
								<View style={this.ballStyle()}>
                  
          		  </View>
								<View style={this.topPipe()}>
                  
          		  </View>
								<View style={this.bottomPipe()}>
                  
          		  </View>
								<View style={this.topPipe2()}>
                  
          		  </View>
								<View style={this.bottomPipe2()}>
                  
          		  </View>
								<View style={this.topPipe3()}>
                  
          		  </View>
								<View style={this.bottomPipe3()}>
                  
          		  </View>
								<View style={styles.scoreView}>
                  <Text style={styles.score}>{Math.round(this.state.points/17)}</Text>
          		  </View>
								
								
                <View style={styles.timerView}>
									
									<TouchableHighlight
										style={styles.button}
										onPress={() => {    
											this.setState({ 
												tapped: true,
											})
								    }}
									>
										<Text style={styles.score}>JUMP!</Text>
									</TouchableHighlight>
									
                </View>            
              
      		  </View>
      	</ImageBackground>
	  );
  }
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
	  },
		background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  timerView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    
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
		scoreView:{
			width: 60,	height: 60,
			borderColor: 'black',
			borderWidth: 3,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'white',
		},
		score:{
			fontFamily: 'Roboto',
			fontWeight: 'bold',
			fontSize: 20,
		},
	button: {
				width: Dimensions.get('window').width,	height: 80,
				borderColor: 'black',
        borderWidth: 3,
        alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'white',
    },
});
export default SecondScreen