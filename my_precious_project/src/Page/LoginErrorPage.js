import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function LoginErrorPage() {
  const navigate = useNavigate();
  const navigateToOnBoard = () => {
    navigate("/");
  };
  return (
    <Container>
      <Image src={process.env.PUBLIC_URL + "/img/404_error.svg"}></Image>
      <Content>
        <div className="content1">
          죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.
        </div>
        <div className="content2">
          존재하지 않는 주소를 입력하셨거나,<br></br>
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </div>
      </Content>
      <Button onClick={navigateToOnBoard}>홈으로 이동</Button>
    </Container>
  );
}

const Container = styled.div`
  width: 100vh;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 38.69813rem;
  height: 5.11463rem;
`;

const Content = styled.div`
  .content1 {
    color: #838687;
    font-family: PP Neue Machina;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    margin-top: 2.5rem;
  }
  .content2 {
    margin-top: 0.94rem;
    color: #83898f;
    text-align: center;
    font-family: PP Neue Machina;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 171.429% */
    letter-spacing: -0.06125rem;
  }
`;

const Button = styled.button`
  margin-top: 3.19rem;
  width: 25.5625rem;
  height: 3.125rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 2px solid #ff3d00;
  background: #fff;
  color: #ff3d00;
  font-family: PP Neue Machina;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
