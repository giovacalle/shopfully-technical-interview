import { useFlyersStore } from "@/hooks/useFlyersStore";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import Favorite from "./Favorite";
import { RxComponentPlaceholder, RxHamburgerMenu } from "react-icons/rx";

function Header() {
  const { favorites } = useFlyersStore();

  return (
    <>
      <Navbar expand={false} fixed="top" className="mb-3 navbar-bg-custom">
        <Container
          fluid
          className="d-flex justify-content-start flex-nowrap gap-4"
        >
          <Navbar.Toggle
            aria-controls={`offcanvas-favourites`}
            className="p-0 border-0"
          >
            <RxHamburgerMenu fontSize={28} color="white" />
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvas-favourites`}
            aria-labelledby={`offcanvas-favourites-title`}
            placement="start"
            style={{ maxWidth: "80%" }}
          >
            <Offcanvas.Header className="border-bottom border-secondary">
              <Offcanvas.Title id={`offcanvas-favourites-title`}>
                <RxComponentPlaceholder fontSize={50} className="mb-3" />
                <h2>Favourites</h2>
                <h3 className="text-secondary">
                  The list of your preferred flyers
                </h3>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {favorites.length === 0 && <span>No favourites found</span>}
              {favorites.length > 0 && (
                <>
                  {favorites.map((favorite: any) => (
                    <Favorite key={favorite.id} {...favorite} />
                  ))}
                </>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Navbar.Brand as="h1" className="m-0 text-white">
            ShopFully
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
