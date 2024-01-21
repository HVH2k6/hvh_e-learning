import React from 'react';
import { Link } from 'react-router-dom';

const ButtonLink = ({children,link,className}) => {
    return (
        <Link to={link} className={`px-3 py-2 rounded-lg bg-green-500 text-white font-semibold ${className}`}>
            {children}
        </Link>
    );
};

export default ButtonLink;