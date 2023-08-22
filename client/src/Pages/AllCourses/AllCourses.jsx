import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import "./allCoursesStyle.scss";
import { CategoryContainer } from "./allCourseComponents/CategoryContainer/CategoryContainer";
import { DroneMasterContext } from "../../context/DroneMasterProvider";
import { Col, Row, Container } from "react-bootstrap";
import LoginForm from "../Users/LoginForm/LoginForm";
import RegisterForm from "../Users/RegisterForm/RegisterForm";

export const AllCourses = () => {
  const [categoryData, setCategoryData] = useState();
  const [courseData, setCourseData] = useState();

  //Gets categories data
  useEffect(() => {
    axios
      .get("http://localhost:4000/courses/allCategories")
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  //Gets course data
  useEffect(() => {
    axios
      .get("http://localhost:4000/courses/allCourses")
      .then((res) => {
        setCourseData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(courseData, "Couuurse");

  const {
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
    openLogin,
    openRegister,
    filter,
    setFilter,
  } = useContext(DroneMasterContext);

  return (
    <Container fluid className="allCoursesContainer">
      <Row className={filter}>
        {categoryData?.map((cat) => {
          return (
            <CategoryContainer
              key={cat.category_id}
              category_id={cat.category_id}
              category_name={cat.category_name}
              courseData={courseData}
            />
          );
        })}
      </Row>

      {showLogin && (
        <Row>
          <Col>
            <LoginForm />
          </Col>
        </Row>
      )}
      {showRegister && (
        <Row>
          <Col>
            <RegisterForm />
          </Col>
        </Row>
      )}
    </Container>
  );
};
