import Spinner from "../component/Spinner";
import styled from "styled-components";

const Title = styled.h1`
    font-size: 64px;
    font-weight: bold;
    margin: 8px;
    margin-bottom: 96px;
    text-align: center;
`;

const Loading = () => {
    return (
        <div>
            <Title>로딩 중 ...</Title>
            <Spinner></Spinner>
        </div>
       
    )
}

export default Loading;