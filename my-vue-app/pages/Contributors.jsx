import { PinContainer } from "../components/ui/3d-pin"
function App() {

  return (
    <>
      <div className="bg-[#9be7fa] min-h-screen text-black p-8 flex flex-col gap-8 font-serif">
        <h1 className="text-4xl font-bold text-center">Contributors</h1>
        <div className='flex justify-center'>
          <PinContainer title="Ranaditya's linkedin" href="https://www.linkedin.com/in/ranaditya-haldar-614065a0/">
            <div className='flex justify-center'>
              <div className='bg-white rounded-3xl flex flex-col justify-center items-center-safe p-5 w-full sm:w-79 shadow-gray-300 shadow-lg border-t-1 border-t-gray-200'>
                <img src="/Ranaditya.jpg" alt="Ranaditya " className="w-32 h-32 rounded-full object-cover mb-4" />
                <h2 className="text-2xl font-bold">Ranaditya</h2>
                <p className="text-lg">Moderator</p>
                <p className="text-lg flex justify-center items-center gap-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                  rhaldar.cmeri@csir.res.in</p>
                <p className="text-lg flex justify-center items-center gap-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
                  90513-68379</p>
              </div>
            </div>
          </PinContainer>
        </div>

        {/*Yeh hamare bare me*/}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          <PinContainer title="Roshan's linkedin" href="https://www.linkedin.com/in/roshan-kumar-9a2a1630b/">
            <div className='flex justify-center'>
              <div className='bg-white rounded-3xl flex flex-col justify-center items-center-safe p-5 w-full shadow-gray-300 shadow-lg border-t-1 border-t-gray-200'>
                <img src="/Roshan.jpg" alt="Roshan" className="w-32 h-37 rounded-full object-cover " />
                <h2 className="text-2xl font-bold">Roshan Kumar</h2>
                <p className="text-lg">Developer</p>
                <p className="text-lg flex justify-center items-center gap-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                  roshan200311@gmail.com</p>
                <p className="text-lg flex justify-center items-center gap-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
                  62831-048754</p>
              </div>
            </div>
          </PinContainer>
          <PinContainer title="Manjit's linkedin" href="https://www.linkedin.com/in/manjit-singh-283496287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
            <div className='flex justify-center'>
              <div className='bg-white rounded-3xl flex flex-col justify-center items-center-safe p-5 sm:w-full w-69 shadow-gray-300 shadow-lg border-t-1 border-t-gray-200'>
                <img src="/manjit.jpg" alt="Manjit Singh" className="w-32 h-37 rounded-full object-cover " />
                <h2 className="text-2xl font-bold">Manjit Singh</h2>
                <p className="text-lg">Developer</p>
                <p className="text-lg flex justify-center items-center gap-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                  manjit1594singh@gmail.com</p>
                <p className="text-lg flex justify-center items-center gap-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
                  95920-90486</p>
              </div>
            </div>
          </PinContainer>

          <PinContainer title="Arslan's linkedin" href="https://www.linkedin.com/in/mohammad-arslan-393928287/">
            <div className='flex justify-center'>
              <div className='bg-white rounded-3xl flex flex-col justify-center items-center-safe p-5 w-full shadow-gray-300 shadow-lg border-t-1 border-t-gray-200'>
                <img src="/Arslan.jpg" alt="Mohammad Arslan" className="w-32 h-37 rounded-full object-cover " />
                <h2 className="text-2xl font-bold whitespace-nowrap">Mohammadsss Arslan</h2>
                <p className="text-lg">Developer</p>
                <p className="text-lg flex justify-center items-center gap-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                  arslan48950@gmail.com</p>
                <p className="text-lg flex justify-center items-center gap-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
                  62840-22564</p>
              </div>
            </div>
          </PinContainer>
        </div>
      </div>
    </>
  )
}

export default App




// import React from 'react'

// const Contributors = () => {
//   return (
//   <div className="bg-cyan-100 min-h-screen text-black p-8 flex flex-col gap-8 font-serif">
//         <h1 className="text-4xl font-bold text-center">Contributors</h1>
//         <div className='flex justify-center'>
//           <div className='bg-white rounded-3xl flex flex-col justify-center items-center-safe p-5 w-full sm:w-85 shadow-gray-300 shadow-lg border-t-1 border-t-gray-200'>
//             <img src="https://portfolio-eight-tau-80.vercel.app/static/media/avatar.5852f40fbb38aa284829fa3fb7722225.svg" alt="Ranaditya " className="w-32 h-32 rounded-full object-cover mb-4" />
//             <h2 className="text-2xl font-bold">Ranaditya</h2>
//             <p className="text-lg">Moderator</p>
//             <p className="text-lg flex justify-center items-center gap-x-0.5">
//               <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
//               rhaldar.cmeri@csir.res.in</p>
//             <p className="text-lg flex justify-center items-center gap-x-0.5">
//               <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
//               90513-68379</p>
//           </div>
//         </div>

//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
//           <div className='flex justify-center'>
//           <div className='bg-white rounded-3xl flex flex-col justify-center items-center-safe p-5 w-full shadow-gray-300 shadow-lg border-t-1 border-t-gray-200'>
//             <img src="/Roshan.jpg" alt="Ranaditya " className="w-32 h-32 rounded-full object-cover mb-4" />
//             <h2 className="text-2xl font-bold">Roshan Kumar Singh</h2>
//             <p className="text-lg">Developer</p>
//             <p className="text-lg flex justify-center items-center gap-x-0.5">
//               <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
//               roshan200311@gmail.com</p>
//             <p className="text-lg flex justify-center items-center gap-x-0.5">
//               <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
//               62831-048754</p>
//           </div>
//         </div>
//         <div className='flex justify-center'>
//           <div className='bg-white rounded-3xl flex flex-col justify-center items-center-safe p-5 w-full shadow-gray-300 shadow-lg border-t-1 border-t-gray-200'>
//             <img src="/manjit.jpg" alt="Manjit Singh" className="w-32 h-37 rounded-full object-cover " />
//             <h2 className="text-2xl font-bold">Manjit Singh</h2>
//             <p className="text-lg">Developer</p>
//             <p className="text-lg flex justify-center items-center gap-x-0.5">
//               <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
//               manjit1594singh@gmail.com</p>
//             <p className="text-lg flex justify-center items-center gap-x-0.5">
//               <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
//               95920-90486</p>
//           </div>
//         </div>
//           <div className='flex justify-center'>
//           <div className='bg-white rounded-3xl flex flex-col justify-center items-center-safe p-5  w-full shadow-gray-300 shadow-lg border-t-1 border-t-gray-200'>
//             <img src="/Arslan.jpg" alt="Mohammad Arslan" className="w-32 h-32 rounded-full mb-4" />
//             <h2 className="text-2xl font-bold">Mohammad Arslan</h2>
//             <p className="text-lg">Developer</p>
//             <p className="text-lg flex justify-center items-center gap-x-0.5">
//               <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
//               arslan48950@gmail.com</p>
//             <p className="text-lg flex justify-center items-center gap-x-0.5">
//               <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
//               62840-22564</p>
//           </div>
//         </div>
//         </div>
//       </div>
//   )
// }

// export default Contributors
