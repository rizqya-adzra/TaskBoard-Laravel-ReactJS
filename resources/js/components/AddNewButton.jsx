import React from 'react'

const AddNewButton = ({ onClick, AddName }) => {
  return (
      <button
          onClick={onClick}
          className="mx-5 bg-white bg-opacity-70 font-semibold rounded-lg hover:bg-indigo-50 transition min-w-[240px] min-h-[40px]"
      >
          {AddName}
      </button>
  )
}

export default AddNewButton