import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppRoutes from './routes/AppRoutes'
import DroneMasterProvider from './context/DroneMasterProvider'
import {Container} from 'react-bootstrap'


function App() {

  return (

    
    <>
    

    <DroneMasterProvider>

   
    <AppRoutes/>


    </DroneMasterProvider>


    </>

    
  )
}

export default App
