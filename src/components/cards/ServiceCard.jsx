import "react";
import { StarsComponent } from "../shared/StarsComponent";
import {
  CardContainer,
  ImageContainer,
  Image,
  InfoContainer,
  NameContainer,
  ExcerptContainer,
  ButtonContainer,
  CTAContainer,
} from "./styled-components/ServiceCard.styles";

// eslint-disable-next-line react/prop-types
export const ServiceCard = ({
  name,
  serviceType,
  image,
  rating,
  excerpt,
  onImageClick,
}) => {
  // console.log(image?.imagenUrl);
  return (
    <CardContainer>
      <ImageContainer onClick={() => onImageClick()}>
        <Image
          src={image}
          alt={name}
        />
      </ImageContainer>
      <InfoContainer>
        <h3 className="serviceType">{serviceType?.nombre}</h3>
        <NameContainer>
          <p>{name}</p>
          <StarsComponent rating={rating} key={name} />
        </NameContainer>
        <ExcerptContainer>
          <p>{excerpt}</p>
        </ExcerptContainer>
        <CTAContainer>
          <ButtonContainer onClick={() => onImageClick()}>
            Ver más
          </ButtonContainer>
        </CTAContainer>
      </InfoContainer>
    </CardContainer>
  );
};
