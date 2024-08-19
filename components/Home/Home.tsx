import {
    FC
} from 'react';

interface HomeProps {
    open: boolean
};

const Home : FC<HomeProps> = ({open}) => {
    return(
        open &&
        <></>
    );
};

export default Home;