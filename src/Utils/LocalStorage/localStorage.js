
const STATE="STATE";
/**
 * Store the data in local storage 
 * 1-state of email list ['read','unread','fav']
 */

export const setLocalStorage=(filteredState)=>{
    
    // To store data
localStorage.setItem(STATE,JSON.stringify(filteredState));
 
};

export const getLocalStorage=()=>{
    
// To retrieve data
return JSON.parse(localStorage.getItem(STATE) || "[]");
 

}
 