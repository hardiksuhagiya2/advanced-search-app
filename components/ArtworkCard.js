import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card style={{ width: '18rem' }} >
      <Card.Img 
        variant="top" 
        src={data.primaryImageSmall || "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} 
      />
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          Date: {data.objectDate ? data.objectDate : "N/A"}<br />
          Classification: {data.classification? data.classification : "N/A"}<br />
          Medium: {data.medium ? data.medium : "N/A"}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="dark">ID : {objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
