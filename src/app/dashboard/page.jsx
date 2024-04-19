"use client";

import Image from "next/image";
import React from "react";
// import { addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.spaceflightnewsapi.net/v4/articles/?format=json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData.results);
        console.log(jsonData);
        // console.log(jsonData.results[0].title);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {data?.map((repo) => (
          <li key={repo.id}>
            <h2 className="text-lg">{repo.title}</h2>
            {/* <Image src={repo.image_url} alt="images" width="300" height="300" /> */}
            <img src={repo.image_url} alt="images" width="300" height="300" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
