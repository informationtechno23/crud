import axios from 'axios'
import React from 'react'

const Home = () => {
    axios.get('http://localhost:3000').then(res => console.log(res));
  return (
    <div>
      Home
    </div>
  )
}

export default Home