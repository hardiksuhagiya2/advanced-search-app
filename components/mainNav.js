import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store"; 
import { addToHistory } from "@/lib/userData"; 
import { readToken, removeToken } from "@/lib/authenticate";

function MainNav() {
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const token = readToken();
  const userName = token ? token.userName : null;

  function logout() {
    setIsExpanded(false);
    removeToken(); 
    router.push("/login"); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsExpanded(false);

    if (searchField.trim().length > 0) {
      const queryString = `title=true&q=${searchField}`;
      setSearchHistory(await addToHistory(queryString));
      router.push(`/artwork?${queryString}`);
    }
  };

  const handleToggle = () => setIsExpanded((prev) => !prev);
  const isUserDropdownActive =
    router.pathname === "/favourites" || router.pathname === "/history";

  return (
    <>
      <Navbar
        className="fixed-top navbar-dark bg-dark"
        expanded={isExpanded}
        expand="lg"
      >
        <Container>
          <Navbar.Brand>Hardik Suhagiya</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggle}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" legacyBehavior passHref>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" legacyBehavior passHref>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {token && (
              <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                />
                <Button type="submit" variant="outline-light">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            <Nav>
              {token ? (
                <NavDropdown
                  title={`${userName}`}
                  id="user-dropdown"
                  active={isUserDropdownActive}
                >
                  <Link href="/favourites" legacyBehavior passHref>
                    <NavDropdown.Item
                      active={router.pathname === "/favourites"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" legacyBehavior passHref>
                    <NavDropdown.Item
                      active={router.pathname === "/history"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav>
                  <Link href="/register" legacyBehavior passHref>
                    <Nav.Link
                      active={router.pathname === "/register"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Register
                    </Nav.Link>
                  </Link>
                  <Link href="/login" legacyBehavior passHref>
                    <Nav.Link
                      active={router.pathname === "/login"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Login
                    </Nav.Link>
                  </Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;
