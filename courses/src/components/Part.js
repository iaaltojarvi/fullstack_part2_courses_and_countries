import React from 'react'

const Part = ({ courseParts, courseTitles }) => {
    const parts = Object.values(courseParts.parts);
    const exercises = parts.map((part) => part.exercises);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const reducedExercises = exercises.reduce(reducer);
    return (
        <>
            <br></br>
            <h4>{courseTitles}</h4>
            {parts.map((part, i) =>
                <p key={i}>{`${part.name}, ${part.exercises} exercises`}</p>
            )}
            <h5>{`Total of ${reducedExercises} exercises`}</h5>
        </>
    )
}

export default Part;