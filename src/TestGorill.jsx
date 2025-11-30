import {useState, useEffect} from 'react';
// const TestGorilla = (props) => {
//  const [counter, setCounter] = useState(0);
//  useEffect(
//    () => {
//      console.log('Hello');
//      setCounter(1);
//    },
//    [props.visible]
//  );
//  return <div>{counter}</div>;
// };

// const TestGorilla = () => {
//     const [result, setResult] = useState(false);
//     useEffect(()=>{
     
//      const fetchData = () => new Promise((r) => {
//         // setTimeout(() => {
//         console.log('dfg'); 
//          r(Date.now()); 
//         });
//     //  }, 100));


//      const data = fetchData().then((value) => {setResult(value); //console.log(result)
//  });
 
// });
// // console.log(result);
// //  console.log(result);
// //  console.log(data.toString())
//  return (
//    <div>
//      {result ===1 ? (
//        <div>hello</div>
//      ) : (
//        <div>good bye</div>
//      )}
//    </div>
//  );
// };
// const fetchData = () => new Promise((r) => setTimeout(() => r(Date.now()), 100));
// const TestGorilla = () => {
//  const [result, setResult] = useState();
//    useEffect(() => {
//     const data =fetchData().then((value) =>{ setResult(value); console.log(result)});
//   }, []); // Empty dependency array = run once on mount
//  return (
//    <div>
//      {result === 1  ? (
//        <div>hello</div>
//      ) : (
//        <div>good bye</div>
//      )}
//    </div>
//  );
// };
// const TestGorilla = () => {
//   const [result, setResult] = useState();
  
//   useEffect(() => {
//     fetchData().then((value) => setResult(value));
//   }, []); // Empty dependency array = run once on mount
  
//   return (
//     <div>
//       {result ? (
//         <div>hello</div>
//       ) : (
//         <div>good bye</div>
//       )}
//     </div>
//   );
// };

// const TestGorilla = (props) => {
//  const [visible, setVisible] = useState(false);
//  useEffect(() => {
//    setInterval(() => {
//      setVisible(true);
//      console.log(props.body);
//    }, 4000);

//  }, []);
// //  console.log(visible);
//  if (visible) return props.body;
//  else return null;
// };


// const TestGorilla = (props) => {
//  const [visible, setVisible] = useState(false);
//  useEffect(() => {
//    setTimeout(() => {
//      setVisible(true);
//      console.log('df');
//     }, 4000);
// }, []);
// // console.log('df');
//  if (visible) return props.children;
//  else return null;
// };

// const TestGorilla = (props) => {
//  return (
//    setTimeout(() => {
//      return props.children;
//    }),
//    4000
//  );
// };


// const MyParent = ({ value }) => {
//  return <div>{value !== 3 && <MyChild />}</div>;
// };
//  const TestGorilla = (props) => {
// console.log("hi");

//  }
// function createObj(){
//   let secret = 'hidden';
//   return {
//     getSecret: function(){
//       return secret;
//     }
//   }
// }
// const TestGorilla = ()=>{
//    const obj = createObj();
//    const extract = obj.getSecret();
//    console.log(extract);
// }

function revertStr(strings){
  let str = strings || 'Hello World';
  return str.split('').reverse().join('');

  // let strArr=str.split('');
  // let arrLength = strArr.length;
  // let tempArr = []
  // strArr.forEach((val, key, arr)=>{
  //      tempArr.push(arr[arrLength-key-1]);
  // })
  // return tempArr.join('');
}
const TestGorilla = ()=>{
  let revertStrs = revertStr();
  console.log(revertStrs)
}
export default TestGorilla