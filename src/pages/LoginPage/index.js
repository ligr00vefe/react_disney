import React from 'react'
import { styled } from 'styled-components';

const LoginPage = () => {
  return (
    <Container>
      <Content>
        <Center>
          <LogoOne src="/images/cta-logo-one.svg" alt="logo-img01" />
          <SignUpLink>지금 가입</SignUpLink>
          <Description>
            영화에 대한 프리미어 엑세스를 얻으십시오.
            디즈니 플러스 가격은 다음 주부터 1000원 인상됩니다.
          </Description>

          <LogoTwo src="/images/cta-logo-two.png" alt="logo-img02" />
        </Center>
        <BgImage />
      </Content>
    </Container>
  )
}

export default LoginPage

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  overflow: hidden;
`;

const Content = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
  height:100%;
  min-height:100vh;
  position:relative;
  padding: 8rem 4rem; 
  box-sizing: border-box;
  margin-bottom: 10vw;
`;

const Center = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  max-width: 65rem;
`;

const LogoOne = styled.img`
  display:block;
  width:100%;
  max-width: 60rem;
  min-height:1px;
  margin-bottom:1.2rem;
`;

const SignUpLink = styled.a`
  width:100%;
  font-size: 1.8rem;
  font-weight:bold;
  background:#0063e5;
  letter-spacing: 0.15rem;
  color:#f9f9f9;
  padding: 1.65rem 0;
  border: 0.1rem solid transparent;
  border-radius: 0.4rem;
  margin-bottom: 1.2rem;

  &:hover {
    background:#0483ee;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height:1.5;
  letter-spacing: 0.15rem;
  color: hsla(0, 0%, 95.3%, 1);
  margin: 0 0 2.4rem;
`;

const LogoTwo = styled.img`
  display:inline-block;
  width:100%;
  max-width:60rem;
  vertical-align: bottom;
  margin-bottom: 2rem;
`;

const BgImage = styled.div`
  height:100%;
  background: url('/images/login-background.jpg') no-repeat top / cover;
  position:absolute;
  top: 0;right:0;left:0;
  z-index: -1;
`;