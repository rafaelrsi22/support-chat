import React, {useState} from "react";

function AdminSearch(props) {
    const [searchValue, setSearchValue] = useState('');
    const [query, setQuery] = useState([]);

    return (
        <div className="p-3 shadow rounded-lg w-3/12 overflow-auto">
            <form onSubmit={async (e) => {
                e.preventDefault();

                const response = await fetch('/auth/' + searchValue);
                const json = await response.json();

                setQuery(json.data);

                setSearchValue('');
            }}>
                <input type="text" id="chat-input" rows="1" className="block w-full font-semibold rounded-md border-dashed border-2 border-slate-950 py-1.5 px-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Search an username..." autoComplete="off" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <input type="submit" className="block w-full text-lg font-semibold text-white bg-neutral-950 hover:bg-transparent hover:text-neutral-950 focus:outline-none border hover:border-neutral-950 rounded-lg text-sm mt-2 px-8 py-3 text-center cursor-pointer background-transition" value="Search" />
            </form>
            <ul>
                {query.map((value) => {
                    return (
                        <li className="mt-4 p-4 shadow rounded-lg text-center cursor-pointer hover:bg-gray-50" onClick={async () => {
                            const response = await fetch(('/chat/' + value.id));
                            const json = await response.json();

                            props.onMessagesLoad(json.data);
                        }}>
                            <p className="text-xl">{value.username}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default AdminSearch;