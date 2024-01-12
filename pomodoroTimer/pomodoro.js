
//'use strict';

//const e = React.createElement;

class Pomodoro extends React.Component{
    constructor(props){
      super(props);
      this.state={
        sessionLength: 25,
        breakLength: 5,
        secondsPassed: 0,
        sessionSecondsLeft: 0,
        sessionMinutesLeft: 25,
        breakSecondsLeft: 0,
        breakMinutesLeft: 5,
        sessionMinutesDisplay:"25",
        sessionSecondsDisplay:"00",
        breakMinutesDisplay:"05",
        breakSecondsDisplay:"00",
        currentMode: "Session",
        started: 0,
      };
      this.handleBreakInc=this.handleBreakInc.bind(this);
      this.handleBreakDec=this.handleBreakDec.bind(this);
      this.handleSessionDec=this.handleSessionDec.bind(this);
      this.handleSessionInc=this.handleSessionInc.bind(this);
      this.timerStart=this.timerStart.bind(this);
      this.timerStop=this.timerStop.bind(this);
      this.reset=this.reset.bind(this);
      this.switchMode=this.switchMode.bind(this);
    }
    
  
    handleBreakInc(){
      let newLength = this.state.breakLength+1;
      newLength > 60? newLength=60:console.log("");
      let newLengthString = newLength.toString();
      this.setState({
        breakLength: newLength,
        breakSecondsLeft: 0,
        breakMinutesLeft: newLength,
        breakMinutesDisplay:newLengthString,
        breakSecondsDisplay:"00",
        started:0,
        secondsPassed:0
        
        });
      }
    
      handleBreakDec(){
      let newLength = this.state.breakLength-1;
      newLength < 1? newLength=1:console.log("");
      let newLengthString = newLength.toString();
      this.setState({
        breakLength: newLength,
        breakSecondsLeft: 0,
        breakMinutesLeft: newLength,
        breakMinutesDisplay:newLengthString,
        breakSecondsDisplay:"00",
        started:0,
        secondsPassed:0
        
      });
      }
    
      handleSessionInc(){
      let newLength = this.state.sessionLength+1;
      newLength > 60? newLength=60:console.log("");
      let newLengthString = newLength.toString();
      this.setState({
        sessionLength: newLength,
        sessionSecondsLeft: 0,
        sessionMinutesLeft: newLength,
        sessionMinutesDisplay:newLengthString,
        sessionSecondsDisplay:"00",
        started:0,
        secondsPassed:0
        
      });
      }
    
     handleSessionDec(){
      let newLength = this.state.sessionLength-1;
      newLength < 1? newLength=1:console.log("");
      let newLengthString = newLength.toString();
      this.setState({
        sessionLength: newLength,
        sessionSecondsLeft: 0,
        sessionMinutesLeft: newLength,
        sessionMinutesDisplay:newLengthString,
        sessionSecondsDisplay:"00",
        started:0,
        secondsPassed:0
        
      });
      }
    
    
    
    timerStart(){ 
      this.setState({started:1});
      
      var x = setInterval(()=>{
      this.state.started==1?this.setState({secondsPassed: this.state.secondsPassed+1}):console.log("counter bypass");
   
         ((this.state.secondsPassed-1-(this.state.sessionLength*60)==0)&& this.state.currentMode=="Session")?this.switchMode():console.log("same mode");
         ((this.state.secondsPassed-1-(this.state.breakLength*60)==0)&& this.state.currentMode=="Break")?this.switchMode():console.log("same mode"); /* check if the timer is down to zero.  If so switch mode*/
        
      
          if(this.state.currentMode=="Session"&&this.state.started!=0){
           let minutesLeft=Math.floor(((this.state.sessionLength*60)-this.state.secondsPassed)/60);
           let minslft = minutesLeft.toString();
           minslft.length == 1 ? minslft = "0"+ minslft: console.log("ternary");   /*doesn't work with .length(). Gives a leading zero to comply with the mm:ss format requirement*/
           let secondsLeft=((this.state.sessionLength*60)-this.state.secondsPassed)%60;
           let secslft = secondsLeft.toString();
           secslft.length == 1 ? secslft = "0"+ secslft: console.log("ternary");   /*doesn't work with .length()*/
           this.setState({
             sessionSecondsLeft:secondsLeft,
             sessionMinutesLeft:minutesLeft,
             sessionMinutesDisplay: minslft,
             sessionSecondsDisplay: secslft
             });
         }
        else if(this.state.currentMode=="Break"&&this.state.started!=0){
           let minutesLeft=Math.floor(((this.state.breakLength*60)-this.state.secondsPassed)/60);
           let minslft = minutesLeft.toString();
           minslft.length == 1 ? minslft = "0"+ minslft: console.log("ternary");   /*doesn't work with .length()*/
           let secondsLeft=((this.state.breakLength*60)-this.state.secondsPassed)%60;
           let secslft = secondsLeft.toString();
           secslft.length == 1 ? secslft = "0"+ secslft: console.log("ternary");   /*doesn't work with .length()*/
           this.setState({
             breakSecondsLeft:secondsLeft,
             breakMinutesLeft:minutesLeft,
             breakMinutesDisplay: minslft,
             breakSecondsDisplay: secslft
            });
        }
        
       if(this.state.started==0){   /*seem like the clearInterval needs to be in the scope as the setInterval() function*/
         clearInterval(x);
       }
      
       
      },1000)
      
      }
      
    switchMode(){
      let switchModeVar = "";
      (this.state.currentMode=="Session")?switchModeVar="Break":switchModeVar="Session";
      this.setState({
        currentMode:switchModeVar,
        secondsPassed:0
        
      });
      console.log("mode switched");
      document.getElementById("beep").play();
    }  
    
    
    timerStop(){        /*the timer is continually running. This sets a variable so that the clearinterval part triggers*/
      this.setState({
      started:0
      });
      }
    
    reset(){
      this.timerStop();
      this.setState({
        sessionLength: 25,
        breakLength: 5,
        secondsPassed: 0,
        sessionSecondsLeft: 0,
        sessionMinutesLeft: 25,
        breakSecondsLeft: 0,
        breakMinutesLeft: 5,
        currentMode: "Session",
        sessionMinutesDisplay:"25",
        sessionSecondsDisplay:"00",
        breakMinutesDisplay:"05",
        breakSecondsDisplay:"00",
        started: 0,
        });
      document.getElementById("beep").load();
    }
   
    
  
  render(){
    return (    
    
      <div id="background-image-wrapper">
      <h1>Pomodoro Timer</h1>
      <div id="controls-container">
        <div id="break-label" className="subdivisions" >Break Length</div>
        <div id="session-label" className="subdivisions" >Session Length</div>
        <div id="buttons">
            <div id="break-increment" className="subdivisions1" onClick={this.handleBreakInc}>Break Increment</div>
            <div id="break-length" className="subdivisions" style={{textAlign:"center"}}>{this.state.breakLength}</div>
            <div id="break-decrement" className="subdivisions1" onClick={this.handleBreakDec}>Break Decrement</div>
        </div>
        <div id="buttons2">
            <div id="session-increment" className="subdivisions1" onClick={this.handleSessionInc} >Session Increment</div>
            <div id="session-length" className="subdivisions" style={{textAlign:"center"}}>{this.state.sessionLength}</div>
            <div id="session-decrement" className="subdivisions1" onClick={this.handleSessionDec}>Session Decrement</div>
        </div>
      </div>  
      <h2 id="timer-label" style={{textAlign:"center"}}>{this.state.currentMode}</h2>
      <div id="time-left" style={{textAlign:"center"}}>{this.state.currentMode=="Session"?this.state.sessionMinutesDisplay:this.state.breakMinutesDisplay}:{this.state.currentMode=="Session"?this.state.sessionSecondsDisplay:this.state.breakSecondsDisplay}</div>
      <div id="start-stop-reset-container">
        {this.state.started==0?
          <div id="start_stop" className="subdivisions1" onClick={this.timerStart}>start/stop</div>:
          <div id="start_stop" className="subdivisions1" onClick={this.timerStop}>start/stop</div>}  {/* change the function of the button depending upon the state of the timer.*/}
        <div id="reset" className="subdivisions1" onClick={this.reset}>reset</div>
        <audio id="beep" src="http://soundbible.com/grab.php?id=2012&type=mp3" type="audio/mpeg" />
        
      </div>
      </div>  
    
           
    );
  }
  };
  
  
  ReactDOM.render(<Pomodoro />,document.getElementById("target"));

 // ReactDOM.render(e(Pomodoro),document.getElementById("target"));

 



