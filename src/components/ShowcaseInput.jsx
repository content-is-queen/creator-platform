import { useEffect, useState } from "react";

import Form, { Error } from "./Form";
import Button from "./Button";

const ShowcaseInput = ({ setLocalUser, setUpdated, localUser }) => {
  const [shows, setShows] = useState(localUser?.showcase || []);
  const [inputValue, setInputValue] = useState("");
  const [errors, setError] = useState({});

  const add = (e) => {
    setError({});

    // TODO: add rejex expression to check if it is a valid spotify or apple url
    if (inputValue.trim("").length === 0) {
      setError({ message: "Please enter a valid url" });
      return;
    }

    if (shows.find((i) => i.url == inputValue)) {
      setError({ message: "You can't add the same url twice" });
      return;
    }

    if (shows.length === 6) {
      setError({ message: "You can only add up to 6 episodes" });
      return;
    }

    setUpdated(true);
    setShows((prev) => [...prev, { url: inputValue }]);

    // Clear input when an entry is added
    setInputValue("");
  };

  const remove = (url) => {
    setUpdated(true);
    setError({});
    setShows((prev) => prev.filter((i) => i.url !== url));
  };

  useEffect(() => {
    setLocalUser((prev) => ({
      ...prev,
      ["showcase"]: shows,
    }));
  }, [shows]);

  return (
    <div>
      <div className="mb-4">
        <p className="uppercase">Showcase</p>
        <span className="block text-sm text-queen-black/80">
          Add up to 6 podacast Spotify or Apple podacast episodes
        </span>
      </div>

      {shows.length > 0 &&
        shows.map((show, index) => (
          <div
            key={index}
            className="flex items-center border-b border-queen-black/10 pb-5 my-5"
          >
            <span className="w-full block">{show.url}</span>
            <Button
              type="button"
              variant="white"
              as="button"
              onClick={() => {
                remove(show.url);
              }}
            >
              Remove
            </Button>
          </div>
        ))}

      <div className="flex items-center gap-x-6">
        <Form.Input
          className="w-full"
          name="showcase"
          value={inputValue}
          placeholder="https://open.spotify.com/episode/1AndIV5yEGBgW41BmQuYkQ?si=d01cf36e51544969"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="button" variant="white" as="button" onClick={add}>
          Add
        </Button>
      </div>

      {errors?.message && <Error>{errors.message}</Error>}
    </div>
  );
};
export default ShowcaseInput;
