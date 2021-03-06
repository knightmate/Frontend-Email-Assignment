import logo from './logo.svg';
import './App.css';
import { useEffect ,useState,useContext} from 'react';
import EmailList from './component/EmailList';
 import {fetchBodyDetail} from './Utils/api'
import EmailBody from './component/EmailBody';
import {Context}  from './Context/Context';
import Filter from './component/Filter';
import {FILTERTYPE} from './constants/index';
import {filterData} from './Utils/filterFunction';

import Constant from './constants/index'

function App() {

   const {emailList,filter,filterType,handleFilterClick}=useContext(Context);
    const [expandEmailBody,setExpand]=useState(null);
     
    

      const filteredData=getFilteredData(filterType);
      console.log("filter","#131",emailList);
      console.log("filter type","#131",filteredData);

     
    useEffect(()=>{

      // console.log('useeffect');
     // callAPI();

  },[]);



  const handleEmailClick=(clickedId)=>{
   console.log("121",clickedId);
    setExpand(true);
    fetchBodyDetail(clickedId).then((res)=>{
     console.log("#121","response of body detail api",res);
      setExpand({
        loader:true,
        data:res
      })

    });
    
  }










  
function getFilteredData(type){

  switch(type){
    case FILTERTYPE.READ:{
        const filteredData= filterData(filter,emailList,Constant.STATE.READ);
         
    return filteredData;
    }
    case FILTERTYPE.FAV:{
       
       const filteredData= filterData(filter,emailList,Constant.STATE.FAV);
        
        return filteredData;
    }

    default: return emailList;
    
}
 }
  console.log("fdfdfdfd");
  return (
    <div className="App">
    <div className='filter-container'>
      <span style={{color:'black'}}>Filter : </span>
    <Filter
      title={"Read"}
      active={filterType.toLowerCase()==="read"?true:false}
      handleFilterClick={handleFilterClick}
      />
        <Filter
      title={"UnRead"}
      active={filterType.toLowerCase()==="unread"?true:false}
      handleFilterClick={handleFilterClick}
      />
        <Filter
      title={"Fav"}
      active={filterType.toLowerCase()==="fav"?true:false}
      handleFilterClick={handleFilterClick}
      />
    </div>
     <div className='flex'>
     <EmailList
      list={filteredData}
      onClick={handleEmailClick}
      />
      {
        expandEmailBody&&(
        <EmailBody
         loader={expandEmailBody.loader}
         data={expandEmailBody.data}
        />)
      }
     </div>
    </div>
  );
}

export default App;


 