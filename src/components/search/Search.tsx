import "./Search.css"
import { RootState, AppDispatch } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as CloseIcon } from '../../closeicon.svg';
import { ReactComponent as SearchIcon } from '../../searchicon.svg';
import { clearQuery, updateQuery } from "./searchSlice";
import { AppMode } from "../../appSlice";

function Search() { 
    const query = useSelector((state: RootState) => state.search.query);
    const curMode = useSelector((state: RootState) => state.app.mode)
    const dispatch = useDispatch<AppDispatch>();
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateQuery(event.target.value))
    }
    const handleClear = () => {
        dispatch(clearQuery())
    }
    return (
        <div className='search'>
            <SearchIcon className="search-icon" />
            <textarea className="search-input ml-2" value={query} onChange={handleChange} placeholder={`Search for ${curMode === AppMode.Hero ? "a hero" : "an item"}`} spellCheck={false}/>
            <div className='close-button'>
                {query.length !== 0 && <CloseIcon className="close-icon" onClick={handleClear}/>}
            </div>
        </div>
    );
}

export default Search;
