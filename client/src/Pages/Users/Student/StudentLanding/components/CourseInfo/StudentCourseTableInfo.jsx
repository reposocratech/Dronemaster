import React, { useContext, useState, useEffect } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";
import { AiFillEye, AiFillFile } from "react-icons/ai";
import '../../studentLandingStyle.scss'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver'
export const StudentCourseTableInfo = ({ setLessonsViewedByStudent, setLessonsOneCourse, courseId }) => {
    const navigate = useNavigate()
    const { courseMaterial, user } = useContext(DroneMasterContext);
    const [unitsName, setUnitsName] = useState([]);
    const [lessonViewed, setLessonViewed] = useState([])
    const [resetUseEffect, setResetUseEffect] = useState(false)
    const [selectedLessons, setSelectedLessons] = useState([]);
    const uniqueUnitNames = Array.from(
        new Set(courseMaterial?.map((item) => item.unit_tittle))
    );

    console.log("dale ya", courseMaterial);
    useEffect(() => {
        setUnitsName(uniqueUnitNames);
    }, [courseMaterial]);
    useEffect(() => {
        if (courseId) {
            axios
                .get(`http://localhost:4000/students/countLessonsViewed/${user.user_id}/${courseId}`)
                .then((res) => {
                    setLessonsViewedByStudent(res.data[0].count_lessons_viewed)
                })
                .catch((err) => console.log(err))
        }
    }, [resetUseEffect, courseId])
    useEffect(() => {
        if (courseId) {
            axios
                .get(`http://localhost:4000/students/countLessonscourse/${courseId}`)
                .then((res) => {
                    setLessonsOneCourse(res.data[0].count_lessons_Course)
                })
                .catch((err) => console.log(err))
        }
    }, [resetUseEffect, courseId])
    useEffect(() => {
        if (courseId) {
            axios
                .get(`http://localhost:4000/students/lessonViewed/${user.user_id}/${courseId}`)
                .then((res) => {
                    setLessonViewed(res.data.map(elem => elem.lesson_id))
                })
                .catch((err) => console.log(err))
        }
    }, [resetUseEffect, user, courseId])
    useEffect(() => {
        setSelectedLessons(lessonViewed);
    }, [resetUseEffect, user, lessonViewed, selectedLessons])

    //console.log("el selected", lessonViewed);
    const toggleLesson = (lessonId) => {
        if (selectedLessons.includes(lessonId)) {
            setSelectedLessons(selectedLessons.filter((id) => id !== lessonId));
        } else {
            setSelectedLessons([...selectedLessons, lessonId]);
        }
    };

    const downloadResource = (lesson_id) => {
        axios
            .post(`http://localhost:4000/students/registerLessonViewed/${user.user_id}/${lesson_id}/${courseId}`)
            .then((res) => {
                toggleLesson(lesson_id)
                setResetUseEffect(!resetUseEffect);
            })
            .catch((err) => console.log(err))

        axios
            .get(`http://localhost:4000/resourceName/${lesson_id}`)
            .then((res) => saveAs(`http://localhost:4000/images/resources/${res.data[0].resource_name}`, `${res.data[0].resource_name}`))
            .catch((err) => console.log(err))
    }

    return (<>
        {!courseMaterial && <div className="coursesTableCard">
            <div className="cardTitle justify-content-center">
                <div className="titleStudent">
                    <h3 className="titleText text-center text-warning">Bienvenido de vuelta {user.user_name}</h3>
                </div>
            </div>
            <div className="cardBody">
                <h6 className="text-center fst-italic">Vaya a mis cursos si quieres seguir con el progreso de estos</h6>
            </div>
        </div>
        }
        {courseMaterial && <div className="coursesTableCard">
            <div className="cardTitle">
                <div className="title w-100 d-flex">
                    <div className="iconContainer">
                        <GiClassicalKnowledge />
                    </div>
                    <div className="d-flex justify-content-between w-100">
                        <h5 className="titleText">{courseMaterial && courseMaterial[0]?.course_name}</h5>
                        <button className="btnOutline1" onClick={() => { navigate(`/courses/courseInfo/${courseMaterial[0]?.course_id}`) }}>ver más</button>
                    </div>
                </div>
            </div>
            <div className="cardBody">
                {unitsName[0] !== null && unitsName.map((unitName, unitIdx) => (
                    <table className="coursesTableStudent mb-4" key={unitIdx}>
                        <thead>
                            <tr style={{ paddingTop: '10px' }}>
                                <th className="textReduce text-warning w-75">
                                    <div className="oculto">{unitName}</div>
                                </th>
                                <th className="text-warning text-center">Estado</th>
                                <th className="text-warning text-center">Recursos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseMaterial.filter((elem) => elem.unit_tittle === unitName)
                                .map((lesson, lessonIdx) => (
                                    <>
                                        {lesson.lesson_is_hidden === 0 && <>
                                            <tr tr key={lessonIdx} >
                                                <td className="textReduce text-start w-75 ps-3">
                                                    <div className="oculto">{lesson.lesson_title}</div>
                                                </td>
                                                {(lesson.resource_is_hidden === 0 || lesson.resource_is_hidden === null) && <>
                                                    <td>
                                                        <AiFillEye
                                                            style={{ color: selectedLessons.includes(lesson.lesson_id) ? 'green' : 'white' }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <AiFillFile
                                                            role="button"
                                                            className="text-success"
                                                            onClick={() => downloadResource(lesson.lesson_id)}
                                                        />
                                                    </td>
                                                </>
                                                }
                                            </tr>
                                        </>
                                        }
                                    </>
                                ))}
                        </tbody>
                    </table>
                ))}
            </div>
        </div >
        }
    </>
    )
};





