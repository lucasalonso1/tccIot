import React from 'react';
import { Container,
         Title,
         Description,
         
} from './styles';

interface DashProps {
  title: string;
  description: string;
}

export function Dashboard({
    title,
    description
  }: DashProps) {
  return (
    <Container>
     <Title>
      {title}  
     </Title>
     <Description>
      {description}
     </Description>
    </Container>
  );
}