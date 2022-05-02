import styled from "styled-components";
import {AiOutlineLoading3Quarters} from 'react-icons/ai';

export default function Loading(){
    return(
        <CircleIcon/>
    )
}

const CircleIcon = styled(AiOutlineLoading3Quarters)`
    font-size:30px;
    animation: spin 0.7s infinite;

    @keyframes spin{
        0% {transform: rotate(0deg)}
        20% {transform: rotate(72deg)}
        40% {transform: rotate(144deg)}
        60% {transform: rotate(216deg)}
        80% {transform: rotate(288deg)}
        100% {transform: rotate(360deg)}
    }
`;