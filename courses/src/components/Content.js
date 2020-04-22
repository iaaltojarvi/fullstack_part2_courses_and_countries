import React from 'react';
import Part from './Part';

const Content = ({ courseParts }) => {
    return (
        <>
            {courseParts.map((part, i) =>
                <Part key={i} courseTitles={part.name} courseParts={part} />
            )}
        </>
    )
};

export default Content;
