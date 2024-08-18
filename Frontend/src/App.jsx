import { useState, useEffect } from "react";
import "./App.css";

import { fetchCards } from "./utils/Deafult";
import CardList from "./components/CardList";
import axios from "axios";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [cards, setCards] = useState([]);
  const [searchedCard, setSearchedCard] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const getCards = async () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("http://localhost:5000/", requestOptions)
        .then((response) => response.json())
        .then((result) => setCards(result))
        .catch((error) => console.error(error));
    };

    getCards();
  }, [cards]);

  const DrawerHandler = () => {
    setDrawer(!drawer);
  };

  const searchHandler = () => {
    const fetchCard = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/cards/${searchInput}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setSearchedCard(data);
      } catch (err) {
        setError(err.message || "Error fetching card");
      }
    };

    fetchCard();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/create", { title, description });
      setMessage(`Card created successfully: ${response.data.title}`);
      setTitle("");
      setDescription("");
      setDrawer(!drawer)
    } catch (error) {
      setMessage(
        `Error creating card: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <>
      <section className="w-screen h-screen bg-slate-100">
        <div
          className={` ${
            drawer ? "block" : "hidden"
          }  h-1/2 w-1/2 bg-slate-400 drawer `}
        >
          <form
            className="flex flex-col justify-center items-center  gap-4"
            onSubmit={handleSubmit}
          >
            <h1>Add New Card</h1>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="drawer-toggle bg-white px-4 py-2 text-black rounded-md"
              placeholder="title"
              id="title"
            />
            <textarea
              id="description"
              value={description}
              placeholder="description"
              className="drawer-toggle bg-white px-4 py-2 text-black rounded-md"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button
              className="px-4 py-2  rounded-md bg-orange-500"
              type="submit"
              onClick={DrawerHandler}
            >
              add
            </button>
          </form>
        </div>
        <div className="header bg-purple-100 w-full h-1/4  flex flex-col justify-center items-center gap-4">
          <span className="text-4xl font-medium text-black  ">
            How can we help?
          </span>
          <div className="search-container flex justify-between p-2 items-center bg-white w-2/5">
            <input
              type="text"
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search"
              className="text-black bg-transparent "
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-black "
              onClick={searchHandler}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
          <button
            disabled={drawer ? true : false}
            onClick={DrawerHandler}
            className="bg-gray-700  text-white hover:bg-gray-600  absolute top-4 right-4 rounded-md  px-4 py-2"
          >
            add new card
          </button>
        </div>
        <div className="body h-max py-2 flex justify-center items-center">
          <CardList cards={cards} searchedCard={searchedCard} />
        </div>
      </section>
    </>
  );
}

export default App;
