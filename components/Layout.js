import Container from 'react-bootstrap/Container';
import MainNav from './mainNav';

function Layout(props) {
  return (
    <>
      <MainNav />
      <br />
      <Container>
        {props.children}
      </Container>
      <br />
    </>
  );
}

export default Layout;
