
function useAuth(){
    const user = sessionStorage.getItem('userId');
    if(user){
        return true;
    } else {
        return false;
    }
}

export default useAuth;