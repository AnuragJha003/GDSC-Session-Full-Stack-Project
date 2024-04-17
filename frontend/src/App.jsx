import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import ImageMain from './components/ImageMain.jsx'
import Main from './components/Main.jsx'
import {createBrowserRouter,RouterProvider,Route,Link } from "react-router-dom";


function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:(
        <>
       <Header />
       <Home />
        </>
      ),
    },{
      path:"/text",
      element:(
        <>
        <Header />
        <Main />
        </>
      ),
    },{
      path:"/image",
      element:(
        <>
        <Header />
        <ImageMain />
        </>
      ),
    },
  ]);
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
