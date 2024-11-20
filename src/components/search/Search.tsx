import "./Search.css"
import { RootState, AppDispatch } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as CloseIcon } from '../../closeicon.svg';
import { ReactComponent as SearchIcon } from '../../searchicon.svg';
import { clearQuery, updateQuery } from "./searchSlice";

function Search() { 
    const query = useSelector((state: RootState) => state.search.query);
    const dispatch = useDispatch<AppDispatch>();
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateQuery(event.target.value))
    }
    const handleClear = () => {
        dispatch(clearQuery())
    }
    return (
        <div className='search'>
            <textarea className="search-input" value={query} onChange={handleChange} placeholder="Search for an item" />
            <div className='close-button'>
                {query.length !== 0 ? 
                    <CloseIcon className="close-icon" onClick={handleClear}/> :
                    <SearchIcon className="search-icon" />
                }
            </div>
        </div>
    );
}

export default Search;
