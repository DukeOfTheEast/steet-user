"use client";

// import Image from "next/image";
import Link from "next/link";
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
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul className="flex md:flex-wrap sm:flex-row flex-col  m-4 sm:gap-6 gap-4 items-center justify-center">
        {data?.map((repo) => (
          <li
            key={repo.id}
            className="md:w-2/5 shadow-md rounded-3xl hover:cursor-pointer bg-slate-100 sm:h-40"
          >
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex"
            >
              <h2 className="sm:text-lg py-4 pl-4">{repo.title}</h2>

              {/* <Image
              src={repo.image_url}
              alt="images"
              width="300"
              height="300"
              className="rounded-r-3xl"
            /> */}

              <img
                src={repo.image_url}
                alt="images"
                // width="200"
                // height="200"
                className="rounded-r-3xl sm:w-48 w-24 sm:h-40 h-28"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
