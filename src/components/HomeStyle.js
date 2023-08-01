import styled from "styled-components";

export const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  background-color: #64766a;
`;
export const DogList = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  background-color: transparent;
`;
export const DogItem = styled.div`
  display: flex;
  height: 45px;
  padding: 0 15px;
  align-items: center;
  justify-content: space-between;
  background-color: #f4f2f3;
  &:nth-child(even) {
    background-color: #c0a9bd;
  }
`;
export const DogForm = styled(DogList)`
  flex-direction: row;
  margin: 50px 0;
  padding-top: 0;
  justify-content: space-between;
  align-items: center;
`;
export const Input = styled.input`
  width: 130px;
  height: 25px;
  padding-left: 10px;
`;
export const Button = styled.button`
  background-color: grey;
  color: white;
  border: none;
  box-shadow: 0 0 10px black;
  border-radius: 3px;
  width: 130px;
  height: 25px;
  cursor: pointer;
  &:hover {
  ${(props) => {
    if (!props.disabled) {
      return `
        background-color: white;
        color: black;
        box-shadow: 0 0 30px red;
        transform: scale(0.9);
        transition: all 0.4s linear;
            `;
    }
  }}
  }
`;
export const RemoveButton = styled(Button)`
  width: 25px;
  background-color: grey;
  color: white;
  font-weight: bolder;
  border: none;
  box-shadow: 0px 0px 10px black;
  border-radius: 100%;
  &:hover {
    background-color: white;
    box-shadow: 0px 0px 40px red;
    color: black;
    transform: scale(0.9);
    transition: all 0.3s linear;
  }
`;
export const Buttons = styled(DogForm)`
  margin: 30px 0;
  height: 40px;
`;
export const TabButton = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 48%;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px black;
  color: white;
  font-size: 20px;
  cursor: pointer;
  background: transparent;
  ${(props) => {
    if (props.name === props["data-active"]) {
      return `
                    background-color: rgba(255,255,255,0.3);
                `;
    }
  }}
  &:hover {
    border:none;
    box-shadow: 0px 0px 30px red;
    color: black;
    transform: scale(0.95);
    transition: all 0.3s linear;
  }
`;
export const ShelterForm = styled(DogForm)`
  flex-direction: column;
`;
