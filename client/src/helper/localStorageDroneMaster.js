export const getLocalStorage = () => {

    return window.localStorage.getItem("token")
    
    
    } 
    


export const saveLocalStorageDroneMaster = (key, item) => {
    window.localStorage.setItem(key, item)
    return true;
}