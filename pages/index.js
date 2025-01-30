/****************************************************************************
* I declare that this assignment is my own work in accordance with the Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Assignment: 2247 / 6
* Student Name: Hardik suhagiya
* Student Email: hsuhagiya@myseneca.ca
* Course/Section: WEB422/ZAA
* Vercel URL: https://advanced-search-app.vercel.app/
*
*****************************************************************************/

import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home() {
  return (
    <>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        alt="The Metropolitan Museum of Art"
        fluid
        rounded
      />

      <Row className="mt-4">
        <Col lg={6}>
          <p>
            The Metropolitan Museum of Art of New York City, colloquially
            &quot;the Met&quot;, is the largest art museum in the Americas. Its
            permanent collection contains over two million works, divided among
            17 curatorial departments. The main building at 1000 Fifth Avenue,
            along the Museum Mile on the eastern edge of Central Park in
            Manhattan&apos;s Upper East Side, is by area one of the world&apos;s
            largest art museums. A much smaller second location, The Cloisters
            at Fort Tryon Park in Upper Manhattan, contains an extensive
            collection of art, architecture, and artifacts from medieval Europe.
          </p>
        </Col>
        <Col lg={6}>
          <p>
            Founded in 1870, the museum&apos;s mission is to bring art and art
            education to the American people. The permanent collection consists
            of works of art from classical antiquity and ancient Egypt,
            paintings, and sculptures from nearly all the European masters, and
            an extensive collection of American and modern art. The Met
            maintains extensive holdings of African, Asian, Oceanian, Byzantine,
            and Islamic art. The museum is home to encyclopedic collections of
            musical instruments, costumes, and accessories, as well as antique
            weapons and armor from around the world.
          </p>
          <p>
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art
            </a>
            .
          </p>
        </Col>
      </Row>
    </>
  );
}
