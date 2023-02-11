import axios from "axios";
import React, { useEffect, useState } from "react";

const EffectTutorial = () => {
  const [data, setData] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setData(response.data[count].email);
      console.log("API was called");
    }
    fetchData();
    // axios
    //   .get("https://jsonplaceholder.typicode.com/comments")
    //   .then((response) => {
    //     setData(response.data[0].email);
    //     console.log("API was called");
    //   });
  }, [count]);

  return (
  <div>
    <p>Hello {data}</p>
    <p>{count}</p>
    <button onClick={() => setCount(count + 1)}>Click here</button>
    </div>);
};

export default EffectTutorial;
