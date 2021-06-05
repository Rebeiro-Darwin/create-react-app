import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function PromiseExample() {
  const [state, setState] = useState([]);
  const identifier = useRef(false);

  // 1
  useEffect(() => {
    /** code */
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    console.log('useEffect 1');
    const p1 = Promise.resolve('P1 success');
    const p2 = Promise.reject('P2 Fail')
    const p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('P3 success');
        resolve(20);
      }, 1000)
    });
    const arr = [p1, p2, p3];
    Promise.allSettled(arr)
      .then(res => console.log('Success', res))
      .catch(error => console.log('Fail', error));
  })

  // 2
  useEffect(() => {
    /** code */
    console.log('useEffect 2');
    const fetchAPI = async () => {
      const { data } = await axios.get('https://api.instantwebtools.net/v1/passenger?page=0&size=100');
      let count = data.totalPassengers;
      let arr = [];
      let finalData = [...data.data];
      for (let i = 1; i <= Math.ceil(count / 100); i++) {
        arr.push(axios.get('https://api.instantwebtools.net/v1/passenger?page=' + i + "&size=100"));
      }
      Promise.all(arr).then(res => {
        res.forEach(data2 => finalData.push(...data2.data.data));
        setState(finalData);
      });
    }
    fetchAPI();
  }, [])

  // 3
  useEffect(() => {
    if (identifier.current === false) {
      identifier.current = true;
    } else {
      /** code */
      console.log('useEffect 3');
    }
  }, [state])

  return (
    <>
      {state.length} records
      {state.length > 0 ? state.map(data => (
        <div>
          {data.name}
        </div>
      )) : <div>Loading...</div>}
    </>
  )
}
// On the initial render, all 3 will run.
//To prevent '3' from initial render, we can use useRef.

export default PromiseExample;

