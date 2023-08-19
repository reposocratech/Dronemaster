import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import { saveLocalStorageDroneMaster } from '../../../helper/localStorageDroneMaster';
import { DroneMasterContext } from '../../../context/DroneMasterProvider';
import './LoginForm.scss'



const LoginForm = () => {

    const { 
      register,
       handleSubmit,
       formState: {errors}
      
      
      } = useForm({
        defaultValues:{
          email: "", 
          password: ""
        }

      });

      

    const navigate = useNavigate();

   const {setUser} = useContext(DroneMasterContext) 
    /*    console.log("este es el contexto", useContext(DroneMasterContext))   */

    

    const onSubmit = (data) =>{

        
        console.log("DARAAAAAAAAAAAAAAAAAAAAAAAAAA", data);
 
    axios

        .post('http://localhost:4000/login', data)
        .then ((result)=> 
        console.log(result.data.user),
        saveLocalStorageDroneMaster("token", result.data.user)
        
        )
        .catch((error) => console.log(error))
 


    }



  return (
    <div  className={`prop-egular-small`}>
   

 <div className="regular-small">
<form className="regular-small"  onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: "Must be completed", maxLength: 200 })} 
      placeholder='email'
      autoComplete='off'
      type="email" 
     className="input-user" 

      />

<p>{errors.email?.message}</p>
      <input {...register("password", { required: "Must be completed", pattern: /^[A-Za-z]+$/i })}
            placeholder='Contraseña'
            autoComplete='off'
            type="password" 
            className="input-user" 
      />

    <p>{errors.password?.message}</p>


      <button className= "prop-egular-small" > Aceptar</button> 
      <button className= "prop-egular-small" onClick={()=> navigate ('/')}> Cancelar</button> 
      <p className="formas-parte-de">
          <span className="text-wrapper">¿Formas parte de nuetra? </span>
          <span className="span">Inicia Sesion</span>
      </p>
    </form>

    </div>

    <div className="text-group" >

    <div className="welcome-title">¡Únete a nosotros!</div>
<img className="vector" alt="Vector" src="vector-1.svg" />
<div className="text-paragraph-cont">
<p className="welcome-paragraph">Estamos encantados de darte la bienvenida.</p>
<p className="text-wrapper">Regístrate y comienza a ser parte de nuestra comunidad. ¡Esperamos verte pronto!</p>
</div>
    </div>

  
      
    </div>
  )
}

export default LoginForm
