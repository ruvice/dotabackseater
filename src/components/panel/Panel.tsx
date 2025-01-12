import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ItemCard from "../vote/item/ItemCard";
import { Item } from "../../models/item";
import LazyImage from "../vote/item/LazyImage";
import { useEffect, useRef, useState } from "react";
import ChatSuggestion from "./ChatSuggestion";


function Panel() { 
    return (
        <div className="panel bg-dota-panel-background border border-border-color p-2">
            <ChatSuggestion />
        </div>
    )
}

export default Panel;
