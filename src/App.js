import './App.css';
import React, {useEffect, useMemo, useState} from 'react';
import keyboard from "./images/keyboard.png"

// to add more keys for practice add them here in this array
let arr = ['a','s','d','f', 'j','k','l', ' '];

function App() {
  // for clock
  const [ticking, setTicking ] = useState(false);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  // for text
  const [text, setText] = useState('');
  const [textTobeTyped, setTextTobeTyped] = useState('');
  const [leng, setLeng] = useState(0);

  // for accuracy
  const [totalwordtyped, setTotalwordtyped] = useState(0);
  const [err, setErr] = useState(0);

  // resetting the clock
  function resetting(){
    setTicking(false);
    setMin(0);
    setSec(0);
    setText('');
    setErr(0);
    setTotalwordtyped(0);
    setLeng(0);
  }
  

  // function for generating random string for typing
  function games(){
    let ans = '';
    let i = 0;
    while(i < 30){
      let idx = Math.floor(Math.random()*arr.length);
      ans = ans + arr[idx];
      i++;
    }
    setTextTobeTyped(ans);
  }

  // to run the clock
  useEffect(()=>{
    let timing;
    if(ticking){
      timing = setInterval(()=>{
        if(sec < 60){
          setSec(sec+1);
        }
        if(min < 5 && sec == 59){
          setMin(min+1);
          setSec(0);
        }
  
        if(min == 5 && sec == 0){
          setTicking(false);
          setMin(0);
          setSec(0);
          if(err == 0){
            alert("Accuracy=>100%")
          }else{
            alert("Accuracy=>"+(((totalwordtyped-err)/totalwordtyped)*100).toFixed(2)+"%");
          }
          setText('');
          setErr(0);
          setTotalwordtyped(0);
          setLeng(0);
        }
      }, 1000)
    }
    return ()=>clearInterval(timing);
  },[min, sec, ticking])


  // to generate the the new string as soon as the last string is completed for typing
  useEffect(()=>{
    if(leng === 0 || leng === 10){
      // console.log("useffect ran");
      games();
      setText('');
      setLeng(0);
    }
  }, [leng]);
    
    
// handle change in the input
  function handlechange(e){
    setText(e.target.value);
  }

  // handle keycapture
  function keycapture(e){
    // console.log( textTobeTyped.charAt(leng),"+",e.key);
    if(textTobeTyped.charAt(leng) === e.key ){
      setLeng((prev)=> prev += 1);
      setTotalwordtyped(totalwordtyped+1);
    }else {
      if(e.key != "Backspace"){
        setErr(err+1);
        setTotalwordtyped(totalwordtyped+1);
        // console.log("error=>",err);
      }
    }
  }

  return (
    <div className="App">
      <h2>Typing Site</h2>

      <div className='timing-div'>Time:<h4>{min}:{sec}</h4>
       <button onClick={()=>setTicking(prev=>!prev)}>Start</button>
       <button onClick={resetting}>Reset</button> 
      </div>

      <div className='text-to-betyped'>
        {textTobeTyped}
      </div>




      {/* taking input from the user */}
      <div>
        <input onChange={handlechange} onKeyDown={keycapture} className="typing-input" type="text" value={text} style={{pointerEvents:ticking ? "initial":"none"}}></input>
        {ticking ? "":<p>*Please click start to start practicing typing</p>}
      </div>


      {/* showing keyboard setup for the new people */}
      <img className="keyboard" src={keyboard} alt='keyboard'/>
    </div>
  );
}

export default App;
