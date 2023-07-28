import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import { updateClicked } from "./functions/settings-bill.js";
import { addClicked } from "./functions/settings-bill.js";
const app = express();
const settingsBill = updateClicked()
const addingBill = addClicked(); 

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: 'main'}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index', {
        call: settingsBill.getSettingsCallCost().input,
        sms: settingsBill.getSettingsSmsCost().input,
        warning: settingsBill.getWarningLevel().input,
        critical: settingsBill.getCriticalLevel().input,
        callTotal: addingBill.getSettingsCallTotal(),
        smsTotal: addingBill.getSettingsSmsTotal(),
        sumTotal: addingBill.sumTotal()
        });// console.log(addingBill.getSettingsCallTotal());
});
//console.log(call)
app.post('/settings', function (req, res) {
    settingsBill.setSettingsCallCost({
      input: req.body.callCost
    });
    settingsBill.setSettingsSmsCost({
      input: req.body.smsCost
    });
    settingsBill.setWarningLevel({
      input: req.body.warningLevel
    });
    settingsBill.setCriticalLevel({
      input: req.body.criticalLevel,
    });
  // console.log(settingsBill.getSettingsCallCost());
    res.redirect('/')
});

app.post('/action', function (req, res) {
  addingBill.sumSettingsCall({call: req.body.billItemTypeWithSettings});
  console.log(
    "---" +
      addingBill.sumSettingsCall({ call: req.body.billItemTypeWithSettings })
  );
  addingBill.sumSettingsSms(req.body.billItemTypeWithSettings,);
  console.log(addingBill.sumSettingsSms(req.body.billItemTypeWithSettings));
  res.redirect("/");
});

app.get("/actions", function (req, res) {

});

app.get("/actions/:type", function (req, res) {

});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});