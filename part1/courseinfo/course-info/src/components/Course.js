const Course = ({ courses }) => {
    return (
      <>
        {courses.map((course) => {
          return (
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </div>
        )})}
      </>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <>
        <h1>{course.name}</h1>
      </>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <>
        <p>
          {part.name} {part.exercises}
        </p>
      </>
  )}
  
  const Content = ({ course }) => {
    return (
      <>
        {course.parts.map(part => 
          <Part part={part} key={part.id}/> )}
      </>
    )
  }
  
  const Total = ({ course }) => {
    const total = course.parts.reduce((reducer, exerciseNumber) => {
      return reducer += exerciseNumber.exercises
    }, 0)
  
    return (
      <>
        <p>
          Total of {total} exercises
        </p>
      </>
    )
  }

  export default Course
