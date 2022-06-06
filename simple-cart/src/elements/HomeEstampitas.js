import styled from "styled-components";

export const Button = styled.button`
  color: white;
  background-color: dodgerblue;
  border: none;
  line-height: 48px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  padding: 0 16px;
`;

export const ContainerCard = styled.section`
  padding: 16px;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 12px;
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;

  div {
    display: flex;
    flex-direction: column;
    gap: 6px;
    height: 100%;
  }
`;

export const Title = styled.p`
  font-weight: 500;
  font-size: 20px;
`;

export const LeyendDetail = styled.p`
  color: gray;
`;

export const AddButton = styled(Button)`
  margin-top: auto;
`;

export const Aside = styled.aside`
  position: sticky;
  bottom: 0;
  margin: auto;
  padding-bottom: 16px;
`;

export const BuyButton = styled(Button)`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;
