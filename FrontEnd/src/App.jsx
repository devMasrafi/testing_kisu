import React, { useEffect, useState } from "react";

const App = () => {
  const baseURL = "http://localhost:5000/posts";

  // fetching data
  const [getData, setGetData] = useState([]);

  const postInfo = async () => {
    try {
      const postData = await fetch(baseURL);

      // if error when fetching
      if (!postData.ok) {
        console.log(error.message, "fetch error");
      }

      // parse/convert to json formate
      const res = await postData.json();
      console.log("Fetching data", res);
      setGetData(res);
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    postInfo();
  }, []);
  console.log(getData);

  // form handel
  const [formInput, setFormInput] = useState({
    title: "",
    body: "",
  });

  const onChangeHandler = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formInput, "aida form handel");

    // tesing function

    // posting data to DB
    const giveData = async () => {
      try {
        const useInput = await fetch(baseURL, {
          method: "POST",
          body: JSON.stringify(formInput),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (!useInput.ok) {
          console.log("error while sending data to database");
        }
        const newPost = await useInput.json();
        console.log(newPost, "new post er data");
        setGetData((prevData) => [...prevData, newPost]);
      } catch (error) {
        console.log(error.message, "error hoise post e");
      }
    };
    giveData();
  };
  console.log(getData, "data save howar por");

  // delete

  const handelDelete = async (id) => {
    try {
      const deleteRes = await fetch(`${baseURL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      postInfo()
    } catch (error) {
      console.log(error.message);
    }
    
  };

  return (
    <>
      {/* showing fetch data as cards */}
      <div className="container mx-auto bg-gray-400 flex gap-x-3">
        {getData.map((posts) => {
          return (
            <div key={posts.id}>
              <div>
                <ul className="border-2 border-red-400 p-2 bg-blue-400">
                  <li>{posts.title}</li>
                  <li>{posts.body}</li>
                  <button
                    className="bg-white "
                    onClick={() => handelDelete(posts.id)}
                  >
                    delete
                  </button>
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className=" container mx-auto bg-slate-500 ">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-y-2 w-[16rem] py-8 mx-auto mt-[8rem] "
        >
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={onChangeHandler}
            className="rounded px-2"
          />
          <input
            type="text"
            placeholder="body"
            name="body"
            onChange={onChangeHandler}
            className="rounded px-2"
          />
          <button className="px-3 py-1 bg-blue-400 mt-3 rounded ">send</button>
        </form>
      </div>
    </>
  );
};

export default App;
