import React, { useEffect, useState } from 'react'
import axios from 'axios'

import "./allCoursesStyle.scss"
import { CategoryContainer } from './allCourseComponents/CategoryContainer/CategoryContainer'

export const AllCourses = () => {
    const [categoryData, setCategoryData] = useState()
    const [courseData, setCourseData] = useState()

    //Gets categories data
    useEffect(() => {
      axios
        .get("http://localhost:4000/courses/allCategories")
        .then((res) => {
            setCategoryData(res.data)
        })
        .catch((error) => console.log(error))
    }, [])

    //Gets course data
    useEffect(() => {
        axios
          .get("http://localhost:4000/courses/allCourses")
          .then((res) => {
              setCourseData(res.data)
          })
          .catch((error) => console.log(error))
      }, [])
    
      console.log(courseData, "Couuurse")


  return (
    <section className='allCoursesContainer'>
        {categoryData?.map((cat) => {
            return(
               
               
                <CategoryContainer key={cat.category_id} category_id={cat.category_id} category_name={cat.category_name} courseData={courseData}/> 
               
                
            )
        })}

        
        
    </section>
  )
}
