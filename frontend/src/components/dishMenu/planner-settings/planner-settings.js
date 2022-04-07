import {useState} from 'react';
import Calendar from '../../../UI/calendar/calendar';
import styled from 'styled-components';

export default function PlannerSettings(props){
    const [isOpen, setIsOpen] = useState(false);
   
    return(
        <Container>
            <Button>Edytuj</Button>
            <Button>Składniki</Button>
            <Button>Przepis</Button>
            <Button onClick={() => setIsOpen(!isOpen)}>Kalendarz</Button>
            {isOpen === true ?
                <Calendar update={props.update} />
                : null}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 40px;
`;
    
const Button = styled.button`
    background: rgb(18, 153, 18);;
    color: white;
    border: none;
    font-weight: 600;
    border-radius:5px;
    margin-bottom: 5px;
    margin-right: 5px;
    padding: 5px;
    cursor: pointer;
`;

