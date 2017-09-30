import React from 'react'
import Calendar from '../../lib'
import { render } from 'react-dom'

const MOUNT_NODE = document.getElementById('root')

function App() {
  return (
    <div style={{ margin: '150px auto', width: '279px', height: '355px' }}>
      <Calendar />
    </div>
  )
}
render(<App />, MOUNT_NODE)