import {
    FC
} from 'react';

interface CalendarProps {
    open: boolean
};

const Calendar : FC<CalendarProps> = ({open}) => {
    return(
        open &&
        <></>
    );
};

export default Calendar;