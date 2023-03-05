import { useFlyersStore } from "@/hooks/useFlyersStore";
import { IFlyer } from "@/types/flyers";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { AiFillHeart } from "react-icons/ai";

const Flyer = ({ flyer }: { flyer: IFlyer }) => {
  const { favorites, setFavorites } = useFlyersStore();

  const handleFavourite = () => {
    setFavorites(flyer);
  };

  return (
    <Card className="shadow">
      <Card.Img variant="top" src="/assets/placeholder.jpg" />
      <Card.Body>
        <Card.Subtitle className="mb-2 fs-7">{flyer.retailer}</Card.Subtitle>
        <Card.Title>{flyer.title}</Card.Title>
        <Card.Text className="text-muted fs-7">{flyer.category}</Card.Text>
        <Button variant="none" className="p-0" onClick={handleFavourite}>
          <AiFillHeart
            fontSize={30}
            className={
              favorites.find((f) => f.id === flyer.id)
                ? "violet-custom"
                : "text-secondary"
            }
          />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Flyer;
