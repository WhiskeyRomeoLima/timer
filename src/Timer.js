import React, { useState, useEffect } from 'react';

export default function Timer() {
  const [time, setTime] = useState();
  const [name, setName] = useState('');

  //Because of the empty dependency array, useEffect will be
  //run only once. useEffect will call the effect on the initial render (only once)
  //and the cleanup function when the component is unmounted.
  //this results in setInterval being created only once which
  //continues to run until the component is unmounted where
  //the cleanup function terminates the setInterval() function.
  //While setInterval runs, it updates the state variable 'time.'
  //This causes state to change, which causes a re-render.
  //Recall the virtual DOM. React determines what changed and
  //only that change is rendered.  In this case, 'time' and
  //possible 'name' if typed in.

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString());
      //setTime((prev) => prev + 1); this was the original requirement which is kind of lame
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleChange = ({ target }) => setName(target.value);

  return (
    <>
      <h1>Time: {time}</h1>
      <input value={name} onChange={handleChange} type="text" />
    </>
  );
}

/* 
//*Question From: text9498111390
Feb '21
Per this lesson, “If we want to only call our effect after the first render, 
we pass an empty array to useEffect() as the second argument.” 

I am wondering how is the “time” state updating every second 
even after the first render 

if we have passed an empty array to useEffect(). 
Shouldn’t timer stop at “1” because after “1”, component re-renders, 
but useEffect() is not called due to empty dependency array?

//* Answer from; mtrtmk

to: text9498111390
Feb '21
From the description of setInterval():

The setInterval() method calls a function or evaluates an 
expression at specified intervals (in milliseconds).

The setInterval() method will continue calling the function 
until clearInterval() is called, or the window is closed.

So, after the first render, setInterval() creates an interval and 
then after our specified interval of 1 second, i
t keeps calling our function (our arrow function with setTime) after every second. 
Since we passed an empty dependency array, 
our useEffect will not be called after every re-render. 
So, we won’t end up with new intervals being created. 
But the original interval is still running and will keep on running 
until we close the window or clear the interval.

 */
