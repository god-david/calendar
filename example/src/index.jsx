import React from 'react'
import Calendar from '../../src'
import { render } from 'react-dom'

const MOUNT_NODE = document.getElementById('root')

function App() {
  return (
    <div style={{
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      margin: 'auto',
      width: '277px',
      height: '355px'
    }}
    >
      <Calendar minDate="2017-09-01" />
    </div>
  )
}
render(<App />, MOUNT_NODE)
