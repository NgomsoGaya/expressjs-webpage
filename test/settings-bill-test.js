describe('Test my Settings bill function' , function(){
    describe("Set value tests", function(){
    it("should return 5 when call is updated with 5" , function(){

        let settingsBill = updateClicked()

        settingsBill.setSettingsCallCost(5)

        assert.equal(5, settingsBill.getSettingsCallCost());
    
    });

    it( "should return 2 when sms is updated with 2", function(){
        let settingsBill2 = updateClicked()

        settingsBill2.setSettingsSmsCost(2)

        assert.equal(settingsBill2.getSettingsSmsCost(), 2);

    });
    it("should return a 10 when warning level is updated with 10" , function(){

        let settingsBill = updateClicked()

        settingsBill.setWarningLevel(10)

        assert.equal(10, settingsBill.getWarningLevel());
    
    });

    it( "should return 20 when critical level is updated with 20", function(){
        let settingsBill2 = updateClicked()

        settingsBill2.setCriticalLevel(20)

        assert.equal(settingsBill2.getCriticalLevel(), 20);

    });
})

    describe("Add up calls and sms tests", function(){
        it("should return 5 when call is updated with 5" , function(){

            let settingsBill = updateClicked()
            let settingsBillTotal = addClicked()
    
            settingsBill.setSettingsCallCost(5)
            settingsBillTotal.sumSettingsCall("call")
    
            assert.equal(5, settingsBillTotal.getSettingsCallTotal());
        
        });
    
        it( "should return 2 when sms is updated with 2", function(){
            let settingsBill2 = updateClicked()
            let settingsBillTotal2 = addClicked()
    
            settingsBill2.setSettingsSmsCost(2)
            settingsBillTotal2.sumSettingsSms("sms")
    
            assert.equal(settingsBillTotal2.getSettingsSmsTotal(), 2);
    
        });
        
        it("should return 9 when call is updated to 5 and sms is updated to 2 and two calls are made", function(){
            let settingsBill3 = updateClicked()
            let settingsBillTotal3 = addClicked()

            settingsBill3.setSettingsCallCost(5)
            settingsBill3.setSettingsSmsCost(2)

            settingsBillTotal3.sumSettingsCall("call")
            settingsBillTotal3.sumSettingsSms("sms")
            settingsBillTotal3.sumSettingsSms("sms")

            assert.equal(settingsBillTotal3.sumTotal(), 9)
        })
    })

    describe("Warning and Critical level testing", function(){
        it("should return warning when calls are above or equal warning level" , function(){

            let settingsBill = updateClicked()
            let settingsBillTotal = addClicked()
    
            settingsBill.setSettingsCallCost(5)
            settingsBill.setWarningLevel(10)

            settingsBillTotal.sumSettingsCall("call")
            settingsBillTotal.sumSettingsCall("call")
    
            assert.equal("warning", settingsBillTotal.warningClassName());
        
        });
    
        it( "should return critical when sms's are above the critical level", function(){
            let settingsBill2 = updateClicked()
            let settingsBillTotal2 = addClicked()
    
            settingsBill2.setSettingsSmsCost(2)
            settingsBill2.setCriticalLevel(5)

            settingsBillTotal2.sumSettingsSms("sms")
            settingsBillTotal2.sumSettingsSms("sms")
            settingsBillTotal2.sumSettingsSms("sms")
    
            assert.equal("critical", settingsBillTotal2.criticalClassName());
    
        });
        
        it("should return warning when calls made and sms's sum up to more than warning level are made", function(){
            let settingsBill3 = updateClicked()
            let settingsBillTotal3 = addClicked()

            settingsBill3.setSettingsCallCost(5)
            settingsBill3.setSettingsSmsCost(2)

            settingsBill3.setWarningLevel(10)
            settingsBill3.setCriticalLevel(20)

            settingsBillTotal3.sumSettingsCall("call")
            settingsBillTotal3.sumSettingsSms("sms")
            settingsBillTotal3.sumSettingsSms("sms")
            settingsBillTotal3.sumSettingsCall("call")
            settingsBillTotal3.sumSettingsCall("call")

            assert.equal(settingsBillTotal3.warningClassName(), "warning")
        })
    })
    describe("Critical level Stop testing", function(){
        it("should return critical when calls are above or equal critical level and should stop counting at 10 when more than 2 R5 calla are made" , function(){

            let settingsBill = updateClicked()
            let settingsBillTotal = addClicked()
    
            settingsBill.setSettingsCallCost(5)
            settingsBill.setCriticalLevel(10)

            settingsBillTotal.sumSettingsCall("call")
            settingsBillTotal.sumSettingsCall("call")
            settingsBillTotal.sumSettingsCall("call")
            settingsBillTotal.sumSettingsCall("call")
    
            assert.equal("critical", settingsBillTotal.criticalClassName());
            assert.equal(10, settingsBillTotal.sumTotal())
        
        });
    
        it( "should return critical when sms's and calls are above the critical level and should stop counting at 15 when the sum exceed critical level", function(){
            let settingsBill2 = updateClicked()
            let settingsBillTotal2 = addClicked()
    
            settingsBill2.setSettingsSmsCost(2)
            settingsBill2.setSettingsCallCost(5)
            settingsBill2.setCriticalLevel(15)

            settingsBillTotal2.sumSettingsSms("sms")
            settingsBillTotal2.sumSettingsSms("sms")
            settingsBillTotal2.sumSettingsSms("sms")
            settingsBillTotal2.sumSettingsCall("call")
            settingsBillTotal2.sumSettingsCall("call")
            settingsBillTotal2.sumSettingsCall("call")

    
            assert.equal("critical", settingsBillTotal2.criticalClassName());
            assert.equal(16, settingsBillTotal2.sumTotal())

    
        });

        it( "should allow us to update critical level and continue adding", function(){
            let settingsBill2 = updateClicked()
            let settingsBillTotal2 = addClicked()
    
            settingsBill2.setSettingsSmsCost(2)
            settingsBill2.setSettingsCallCost(5)
            settingsBill2.setWarningLevel(10)
            settingsBill2.setCriticalLevel(15)

            settingsBillTotal2.sumSettingsSms("sms")
            settingsBillTotal2.sumSettingsSms("sms")
            settingsBillTotal2.sumSettingsSms("sms")
            settingsBillTotal2.sumSettingsCall("call")
            settingsBillTotal2.sumSettingsCall("call")
            settingsBillTotal2.sumSettingsCall("call")

    
            assert.equal("critical", settingsBillTotal2.criticalClassName());
            assert.equal(16, settingsBillTotal2.sumTotal())

            settingsBill2.setCriticalLevel(25)

            settingsBillTotal2.sumSettingsSms("sms")
            settingsBillTotal2.sumSettingsCall("call")

            assert.equal("warning", settingsBillTotal2.warningClassName());
            assert.equal(23, settingsBillTotal2.sumTotal())


    
        });
    })

});