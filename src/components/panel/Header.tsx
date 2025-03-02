import React from 'react'
import "./Header.css"
import { AppMode, selectMode } from '../../store/appSlice'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { clearQuery } from '../../store/searchSlice';
import { motion } from "framer-motion";

function Header() {
    const dispatch = useDispatch<AppDispatch>();
    const handleClick = (mode: AppMode) => {
        dispatch(selectMode(mode))
        dispatch(clearQuery())
    }
    
    const curMode = useSelector((state: RootState) => state.app.mode)
    return (
        <div className="header">
            <motion.div className={`header_tab rounded-t-md mt-1 p-2 w-[150px] ${curMode === AppMode.Hero ? "border-white border bg-dota-panel-item-box-active" : "bg-dota-panel-item-box"}`} onClick={() => handleClick(AppMode.Hero)}>
                <p className="text-dota-text-white text-l pl-2 font-bold">Hero</p>
            </motion.div>
            <motion.div className={`header_tab rounded-t-md mt-1 p-2 w-[150px] ${curMode === AppMode.Item ? "border-white border bg-dota-panel-item-box-active" : "bg-dota-panel-item-box"}`}  onClick={() => handleClick(AppMode.Item)}>
                <p className="text-dota-text-white text-l pl-2 font-bold">Item</p>
            </motion.div>
        </div>
  )
}
export default Header