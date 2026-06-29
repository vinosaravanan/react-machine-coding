import React, { useState, useEffect } from "react";

function FetchApidata() {
  const [Data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [EditData, setEditData] = useState('');
  const [toggle, setToggle] = useState(0);

/// Get the Search input data 
  const handleChange = (e) => {
    let searchText = e.target.value;
    console.log(searchText);
    // let filterValue =  Data.filter((value, i) => value.title.toLowerCase().includes(searchText));
    //  console.log('xxxxxxx',filterValue)
    let filterValue = Data.filter((value, i) =>
      value.title.startsWith(searchText),
    );
    console.log(filterValue);

    setFilterData(filterValue);
  };
// delete the data func....
const handleDelete = (id) => {
   console.log(id);
   let deletedData = filterData.filter((val) => {
      return val.id !== id
   });
   console.log(deletedData);
   setFilterData(deletedData)
};
// Edit method get item id for toggle and show update input field
const handleEdit = (id) => {
  console.log('edit...', id);
  setToggle(id)
}
// Get the Edit value and Store data in update state
const handleEditData = (e) => {
  setEditData(e.target.value)
}
// handle for submit to update state and item 
const handleSubmit = (id) => {
  console.log(EditData, id); // this edited data as string 
   setFilterData(pre => (
      pre.map((item) => {
         if (item.id === id) {
            return {
              ...item,
              title: EditData
            }
         }
         return item
      })
   ))
}
console.log(EditData,'edit');

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );

        if (!response.ok) {
          throw new Error("server error");
        }

        const apidata = await response.json();

        setData(apidata.slice(0, 10));
        setFilterData(apidata.slice(0, 10));
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchApi();
  }, []);

  console.log(Data);

  return (
    <div>
      <div className="flex justify-center ">
        <input
          className="border-2"
          type="text"
          placeholder="search......"
          onChange={handleChange}
        />
      </div>
      <ul className="m-5">
        {filterData.map((val, i) => (
          <div>
            <li className="mb-5 inline-block" key={val.id}>
              {val.title}
            </li>
            <button onClick={() => handleDelete(val.id)} className='ml-2 border-2 border-black text-red-400'>delete</button>
            <button onClick={() => handleEdit(val.id)} className='ml-2 border-2 border-black text-green-400'>Edit</button>
            <div>
               {toggle === val.id && (
                <div>
                  <input onChange={handleEditData} value={val.title} className="border-2" type="text" placeholder="edited text ....."/>
                  <button onClick={() => handleSubmit(val.id)} className="ml-1.5 mb-1.5 border-2">submit</button>
                </div>
               )}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default FetchApidata;
