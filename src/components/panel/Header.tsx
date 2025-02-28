import React from 'react'
import "./Header.css"

function Header() {
  return (
    <div className="header">
        <div className="bg-dota-panel-item-box rounded-t-md mt-1 p-2 w-[150px]">
            <p className="text-dota-text-white text-l pl-2 font-bold">Hero</p>
        </div>
        <div className="bg-dota-panel-item-box-inactive rounded-t-md mt-1 p-2 w-[150px] border-white border">
            <p className="text-dota-text-white text-l pl-2 font-bold">Item</p>
        </div>
    </div>
  )
}

export default Header