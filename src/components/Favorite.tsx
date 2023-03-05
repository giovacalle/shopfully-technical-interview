import { IFlyer } from "@/types/flyers";
import { Container } from "react-bootstrap";

import { AiFillHeart } from "react-icons/ai";

const Favorite = ({ title }: IFlyer) => {
  return (
    <Container
      fluid
      className="p-2 d-flex align-items-center justify-content-start gap-3 rounded favorite"
    >
      <AiFillHeart fontSize={30} className="violet-custom" />
      <span>{title}</span>
    </Container>
  );
};

export default Favorite;
