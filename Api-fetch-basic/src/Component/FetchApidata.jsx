import React, { useState, useEffect } from "react";

function FetchApidata() {
  const [Data, setData] = useState([]);

const handleChange = (e) => {
  let filterValue =  Data.filter((value, i) => value.title.includes(e.target.value))
  setData(filterValue)
}

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
         <input className="border-2"   type="text" placeholder="search......" onChange={handleChange} />
      </div>
      <ul className="m-5">
        {Data.map((val, i) => (
          <li className="mb-5" key={val.id}>
            {val.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchApidata;
