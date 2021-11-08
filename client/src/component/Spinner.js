import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import styled from "styled-components";

const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Spinner = () => {
    return (
        <Flex>
            <ScaleLoader
                size={100}
                height="160px"
                width="32px"
                color="#7362ff" 
                radius="8px" 
            />    
        </Flex>
    )
}

export default Spinner;