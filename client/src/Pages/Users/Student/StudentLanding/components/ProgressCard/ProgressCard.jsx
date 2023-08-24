import React from 'react'
import '../../studentLandingStyle.scss'
import { BiSolidUserDetail } from "react-icons/bi";

export const ProgressCard = ({ user }) => {
    return (
        <div className="userInfoCard">
            <div className="cardTitle">
                <div className="iconContainer">
                    <BiSolidUserDetail />
                </div>
                <div className="title">
                    <h6 className="titleText">Cursos Realizados</h6>
                </div>
            </div>
        </div>
    )
}
