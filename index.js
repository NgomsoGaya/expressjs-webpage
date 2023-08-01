import express from "express";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import SettingsBill from "./functions/settings-bill.js";
import moment from "moment";
//import { addClicked } from "./functions/settings-bill.js";

//const addingBill = addClicked(); 

const handlebarSetup = exphbs.engine({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts",
});


const app = express();

app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");
app.set("views", "./views");

const settingsBill = SettingsBill()

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: 'main'}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.render("index", {
    settings: settingsBill.getSettings(),
    totals: settingsBill.totals(),
    colorChange: settingsBill.colorChange(),
    //timestamp: moment().fromNow(),
  });
  // call: settingsBill.getSettingsCallCost().input,
  // sms: settingsBill.getSettingsSmsCost().input,
  // warning: settingsBill.getWarningLevel().input,
  // critical: settingsBill.getCriticalLevel().input,
  // callTotal: addingBill.getSettingsCallTotal(),
  // smsTotal: addingBill.getSettingsSmsTotal(),
  // sumTotal: addingBill.sumTotal()// console.log(addingBill.getSettingsCallTotal());
});
//console.log(call)
app.post('/settings', function (req, res) {
  settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel
  })
    // settingsBill.setSettingsCallCost({
    //   input: req.body.callCost
    // });
    // settingsBill.setSettingsSmsCost({
    //   input: req.body.smsCost
    // });
    // settingsBill.setWarningLevel({
    //   input: req.body.warningLevel
    // });
    // settingsBill.setCriticalLevel({
    //   input: req.body.criticalLevel,
    // });
  // console.log(settingsBill.getSettingsCallCost());
    res.redirect('/')
});

app.post('/action', function (req, res) {
  settingsBill.recordAction(req.body.billItemTypeWithSettings);
  // addingBill.sumSettingsCall({call: req.body.billItemTypeWithSettings});
  // console.log(
  //   "---" +
  //     addingBill.sumSettingsCall({ call: req.body.billItemTypeWithSettings })
  // );
  // addingBill.sumSettingsSms(req.body.billItemTypeWithSettings,);
  // console.log(addingBill.sumSettingsSms(req.body.billItemTypeWithSettings));
  res.redirect("/");
});

app.get("/actions", function (req, res) {
  res.render('actions', {actions: settingsBill.actions()})
});

app.get("/actions/:billItemTypeWithSettings", function (req, res) {
  const billItemTypeWithSettings = req.params.billItemTypeWithSettings;
  res.render("actions", {
    actions: settingsBill.actionsFor(billItemTypeWithSettings),
  });
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});