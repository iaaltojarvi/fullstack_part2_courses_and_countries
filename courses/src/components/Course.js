import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({ courses }) => {
  const coursesToProps = Object.values(courses).map((part) => part);
  const titles = courses.map((title) => title.name);
    return (
      <>
      <Header header='Web development curriculum' />
      <Content titles={titles} courseParts={coursesToProps}/>
      </>
    )
};

export default Course;