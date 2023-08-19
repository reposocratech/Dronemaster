import React, { useState } from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import './RegisterForm.scss'



const RegisterForm = () => {


  const {  
    register, 
    handleSubmit, 
    formState: {errors}
  
  } = useForm({

defaultValues:{
  user_name: "", 
  user_lastname: "", 
  email: "", 
  password: ""
}
});


  const navigate = useNavigate();


  
 
  const onSubmit = (data) =>{
    console.log("DARAAAAAAAAAAAAAAAAAAAAAAAAAA", data);

    axios

    .post('http://localhost:4000/students/registerStudent',data)
    .then ((result)=> console.log(result))
    .catch((error) => console.log(error)) 

}
   

  return (

    <div className={`prop-egular-small`} > 

<div >

<div className="welcome-title">¡Bienvenido de vuelta!</div>
<div className="text-paragraph-cont">
<p className="welcome-paragraph">Estamos emocionados por tenerte aqui nuevamente</p>
<p className="text-wrapper">Ingresa y disfruta de tu experiencia</p>
</div>
</div>
 
    <form className="regular-small" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("user_name", { required: "Must be completed", maxLength: 20 })} 
          placeholder='Insert your name'
          type='text'
          className="input-user"
          
      />
       <p>{errors.firstName?.message}</p>

      <input {...register("user_lastname", { required: "Must be completed", maxLength: 20 })} 
           placeholder='Last Name'
           type='text'
           className="input-user"

      />

      <p>{errors.lastName?.message}</p>

      <input {...register("email", { required: "Must be completed", maxLength: 20 })} 
         placeholder='Email'
         type='email'
         autoComplete='off'
         className="input-user"

      />
       <p>{errors.email?.message}</p>

      <input {...register("password", { required: "Must be completed", maxLength: 20 })} 
                  placeholder='Contraseña'
                  type='password'
                  autoComplete='off'
                  className="input-user"

      />
       <p>{errors.password?.message}</p>

      <button className= "prop-egular-small"> Aceptar</button> 
      <button className= "prop-egular-small" onClick={()=> navigate ('/')}> Cancelar</button> 
        <p>¿Ya tienes una cuenta? <span>Inicia Sesión</span> </p>
    </form> 
</div>
  )
}

export default RegisterForm
