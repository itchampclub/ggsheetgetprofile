 function doPost(e){
 //active sheet
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mk4VoiM6_ZCd6Ic-Sheet url-g-iBYe7s4pbKso/edit#gid=0");
  var sheet = ss.getSheetByName("data");
 //body form dialogflow
  var data = JSON.parse(e.postData.contents)
  var userMsg = data.originalDetectIntentRequest.payload.data.message.text;
  var userId = data.originalDetectIntentRequest.payload.data.source.userId;
 //get profile  
  var url = "https://api.line.me/v2/bot/profile/"+userId;
  var headers = {
             "contentType": "application/json",
    "headers":{"Authorization": "Bearer oB+dxq4x/QW0LK5ChAdkW8lA/NB45OZBqL9esFEklV4HEXXXXXXXXXXXXXXX--Token--XXXXXXXXXXXXXhaC2iYxroQNVYYqyfv84hAsnHS8/Di9m6w7OP8LElQdB04t89/1O/w1cDnyilFU="}
             };

      var getprofile = UrlFetchApp.fetch(url, headers);
      var profiledata = JSON.parse(getprofile.getContentText());
      var displayName = profiledata.displayName;
      var statusMessage = profiledata.statusMessage;
      var pictureUrl = profiledata.pictureUrl;
   
   
  //check uid@sheet
  var uid = sheet.getRange(2, 1, sheet.getLastRow(),sheet.getLastColumn()).getValues();
  for(var i = 0;i<uid.length; i++){
     if(userId == uid[i][0]){
     var already = true;
     sheet.getRange(i+2,2).setValue(displayName);
     sheet.getRange(i+2,3).setValue(statusMessage);
     sheet.getRange(i+2,4).setValue(pictureUrl);
}
}

if(!already){
var img = '=IMAGE("'+pictureUrl+'")';
  sheet.appendRow([userId, displayName, statusMessage, img]);
     }

      var replyJSON = ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    return replyJSON;
    }
