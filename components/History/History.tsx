import {
    FC
} from 'react';

interface HistoryProps {
    open: boolean
};

const History : FC<HistoryProps> = ({open}) => {
    return(
        open &&
        <></>
    );
};

export default History;