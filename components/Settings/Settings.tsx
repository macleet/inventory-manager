import {
    FC
} from 'react';

interface SettingsProps {
    open: boolean
};

const Settings : FC<SettingsProps> = ({open}) => {
    return(
        open &&
        <></>
    );
};

export default Settings;