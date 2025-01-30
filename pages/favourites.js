import { useAtom } from "jotai";
import { favouritesAtom } from "@/store"; 
import ArtworkCard from "@/components/ArtworkCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <Row className="gy-4">
      {favouritesList.length > 0 ? (
        favouritesList.map((objectID) => (
          <Col lg={3} md={4} sm={6} key={objectID}>
            <ArtworkCard objectID={objectID} />
          </Col>
        ))
      ) : (
        <Col>
          <div style={{ textAlign: "center", padding: "50px" }}>
            <h4>Nothing here, try adding some new artwork to the list.</h4>
          </div>
        </Col>
      )}
    </Row>
  );
}
