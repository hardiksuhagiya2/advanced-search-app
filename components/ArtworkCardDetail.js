import useSWR from "swr";
import Error from "next/error";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store"; 
import { useState, useEffect } from "react"; 
import { addToFavourites, removeFromFavourites } from "@/lib/userData"; 

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null,
    fetcher
  );

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom); 
  const [showAdded, setShowAdded] = useState(false); 

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID)); 
    } else {
      setFavouritesList(await addToFavourites(objectID)); 
    }
  };

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card style={{ width: "100%" }}>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          Date: {data.objectDate || "N/A"}
          <br />
          Classification: {data.classification || "N/A"}
          <br />
          Medium: {data.medium || "N/A"}
          <br />
          <br />
          Artist: {data.artistDisplayName || "N/A"}
          {data.artistDisplayName && data.artistWikidata_URL && (
            <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">
              {" "}
              wiki
            </a>
          )}
          <br />
          Credit Line: {data.creditLine || "N/A"}
          <br />
          Dimensions: {data.dimensions || "N/A"}
        </Card.Text>
        <Button
          variant={showAdded ? "primary" : "outline-primary"}
          onClick={favouritesClicked}
        >
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}
