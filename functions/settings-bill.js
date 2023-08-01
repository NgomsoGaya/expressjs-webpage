import moment from "moment";

export default function SettingsBill() {
   let smsCost;
   let callCost;
   let warningLevel;
   let criticalLevel;
   
   let actionList = [];

   function setSettings(settings) {
     smsCost = Number(settings.smsCost);
     callCost = Number(settings.callCost);
     warningLevel = Number(settings.warningLevel) ;
     criticalLevel = Number(settings.criticalLevel) ;
   }

   function getSettings() {
     return {
       smsCost,
       callCost,
       warningLevel,
       criticalLevel,
     };
   }

  function recordAction(action) {
      if (grandTotal() >= criticalLevel) {
        return;
      }
     let cost = 0;
     if (action === "sms") {
       cost = smsCost;
     } else if (action === "call") {
       cost = callCost;
     }
   
    if (action) {
     actionList.push({
       type: action,
       cost: cost,
       timestamp: new Date(),
      // momentStamp: moment(timestamp),
     })
    };
   }

  function actions() {
    // const keyToUpdate = actionList.timestamp
    // const newValue = moment().calendar()
    // //use map to mdofiy data
    // const modifiedActionList = actionList.findIndex(item => item.key === keyToUpdate)
    // if (modifiedActionList !== -1) {
    //   actionList[modifiedActionList].value = newValue;
    // }
      //return {...item, value: actionList.timestamp = moment(actionList.timestamp).fromNow()}
   // })
     return actionList;
   }

   function actionsFor(type) {
     const filteredActions = [];

     // loop through all the entries in the action list
     for (let index = 0; index < actionList.length; index++) {
       const action = actionList[index];
       // check this is the type we are doing the total for
       if (action.type === type) {
         // add the action to the list
         filteredActions.push(action);
       }
     }

     return filteredActions;

     // return actionList.filter((action) => action.type === type);
   }

   function getTotal(type) {
     let total = 0;
     // loop through all the entries in the action list
    //if (!(grandTotal() >= criticalLevel)) {
      for (let index = 0; index < actionList.length; index++) {
       const action = actionList[index];
       // check this is the type we are doing the total for
       if (action.type === type) {
         // if it is add the total to the list
         total += action.cost;
       }
    // } 
     }
     return total.toFixed(2);

     // the short way using reduce and arrow functions

     // return actionList.reduce((total, action) => {
     //     let val = action.type === type ? action.cost : 0;
     //     return total + val;
     // }, 0);
   }

   function grandTotal() {
     return (Number(getTotal("sms")) + Number(getTotal("call"))).toFixed(2) ;
   }

   function totals() {
     let smsTotal = getTotal("sms");
     let callTotal = getTotal("call");
     return {
       smsTotal,
       callTotal,
       grandTotal: grandTotal(),
     };
   }

   function hasReachedWarningLevel() {
     const total = grandTotal();
     const reachedWarningLevel = total >= warningLevel && total < criticalLevel;

     return reachedWarningLevel;
   }

   function hasReachedCriticalLevel() {
     const total = grandTotal();
     return total >= criticalLevel;
   }
  
  function colorChange(){
    if (hasReachedCriticalLevel()) { 
      return "danger";
    }
    else if (hasReachedWarningLevel()) {
      return "warning";
    }  
    // else {
    //   return ""
    // }
  }
   return {
     setSettings,
     getSettings,
     recordAction,
     actions,
     actionsFor,
     totals,
     hasReachedWarningLevel,
     hasReachedCriticalLevel,
     colorChange
   };
 };