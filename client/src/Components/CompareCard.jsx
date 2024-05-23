import React from 'react'

const CompareCard = ({bike1 , bike2 , setBike1Value , setBike2Value}) => {

  let handleCompare = () => {
    setBike1Value(bike1)
    setBike2Value(bike2)
  }

  return (
    <div className='compare-card'>
        <h4>{bike1}</h4>
        <p>vs</p>
        <h4>{bike2}</h4>
        <button onClick={handleCompare}>Compare</button>
    </div>
  )
}

export default CompareCard
