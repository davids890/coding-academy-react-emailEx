import React from 'react';

export const iconsService = {
    getOutlineStar,
    getFullStar,
    // getDelete,
    // getRead,
    // getUnread,
};

function getOutlineStar() {
    return null;
    // return React.createElement('span', { className: 'material-symbols-outlined material-star-outline' }, 'star_outline');
}

function getFullStar() {
    return React.createElement('span', { className: 'material-symbols-outlined material-star' }, 'star');
}
