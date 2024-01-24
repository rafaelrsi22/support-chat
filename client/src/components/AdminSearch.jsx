import React, {useState} from "react";

function AdminSearch(props) {
    const [searchValue, setSearchValue] = useState('');
    const [query, setQuery] = useState([]);

    return (
        <div className="p-3 shadow rounded-lg w-3/12">
            <form onSubmit={async (e) => {
                e.preventDefault();

                const response = await fetch('/auth/' + searchValue);
                const json = await response.json();

                setQuery(json.data);

                setSearchValue('');
            }}>
                <input type="text" id="chat-input" rows="1" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="Search an username..." autoComplete="off" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <input type="submit" className="block w-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4  cursor-pointer" value="Search" />
            </form>
            <ul>
                {query.map((value) => {
                    return (
                        <li className="mt-4 p-4 shadow rounded-lg text-center cursor-pointer hover:bg-gray-50" onClick={async () => {
                            const response = await fetch(('/chat/' + value.id));
                            const json = await response.json();

                            props.onMessagesLoad(json.data);
                        }}>
                            <p className="text-3xl">{value.username}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default AdminSearch;