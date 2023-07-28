    var settingsCallCost = 0
    var settingsSmsCost = 0

    var warningLevel = 0
    var criticalLevel = 0

export function updateClicked() {

    function setSettingsCallCost(input){
     settingsCallCost = input
    }

    function getSettingsCallCost(){
        return settingsCallCost
    }
    
    function setSettingsSmsCost(input){
    settingsSmsCost = input
    }

    function getSettingsSmsCost(){
        return settingsSmsCost
    }

    function setWarningLevel(input){
         warningLevel = input
     }
    
    function getWarningLevel(){
         return warningLevel
     }

    function setCriticalLevel(input){
         criticalLevel = input
     }

     function getCriticalLevel(){
         return criticalLevel
     }

    return{
        setSettingsCallCost,
        setSettingsSmsCost,
        getSettingsCallCost,
        getSettingsSmsCost,
        setWarningLevel,
        setCriticalLevel,
        getWarningLevel,
        getCriticalLevel
    }
}

export function addClicked() {
    var settingsCallTotal = 0
    var settingsSmsTotal= 0
    var settingsTotal = 0

    function getWarningLevel(){
        return warningLevel
    }

    function getCriticalLevel(){
        return criticalLevel
    }
    function sumSettingsSms(sms) {
      if (sumTotal() < getCriticalLevel()) {
        if (sms.toLowerCase() == "sms") {
          settingsSmsTotal += settingsSmsCost;
        }
      }
    }
    //let calls = settingsCallCost
    function sumSettingsCall(calls) {
      if (sumTotal() < getCriticalLevel()) {
        if (calls.toLowerCase() == "call") {
          settingsCallTotal += settingsCallCost;
        }
      }
    }

    function sumTotal(){
        settingsTotal = settingsCallTotal + settingsSmsTotal
        return settingsTotal
    }

    function getSettingsSmsTotal(){
        return settingsSmsTotal
    }

    function getSettingsCallTotal(){
        return settingsCallTotal
    }

    function warningClassName(){
        if(sumTotal()>= getWarningLevel()){
            return "warning"
        }
    }

    function criticalClassName(){
        if(sumTotal()>= getCriticalLevel()){
            return "critical"
        }
    }

    return {
        sumSettingsSms,
        sumSettingsCall,
        getSettingsSmsTotal,
        getSettingsCallTotal,
        sumTotal,
        warningClassName,
        criticalClassName
    }
}