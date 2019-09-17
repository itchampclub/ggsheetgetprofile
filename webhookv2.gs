//active
var channelToken = "oB+dxq4Tj7by26TAeG+yYwl4b----------------C2iYxroQNVYYqyfv84hAsnHS8/Di9m6w7OP8LElQdB04t89/1O/w1cDnyilFU=";
var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mk4Vo----------------pbKso/edit#gid=0");
var sheet = ss.getSheetByName("d--------ta");

function replyMsg(replyToken, Msg, channelToken) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': Msg
    })
  };
  UrlFetchApp.fetch(url, opt);
}

function doPost(e) {
  var value = JSON.parse(e.postData.contents);
    var events = value.events;
    if (events != null) {
      for (var i in events) {
        var event = events[i];
        var type = event.type;
        var replyToken = event.replyToken;
        var sourceType = event.source.type;
     // var sourceId = LineHelpers.getSourceId(event.source);
        var userId = event.source.userId;
        var groupId = event.source.groupId;
        var timeStamp = event.timestamp;
        var url = "https://api.line.me/v2/bot/profile/"+userId;
        var headers = {
             "contentType": "application/json",
    "headers":{"Authorization": "Bearer "+channelToken}
             };
        var getprofile = UrlFetchApp.fetch(url, headers);
        var profiledata = JSON.parse(getprofile.getContentText());
        var displayName = profiledata.displayName;
        var statusMessage = profiledata.statusMessage;
        var pictureUrl = profiledata.pictureUrl;
        
        
        
        //message type
        switch (type) {
          case 'postback':
            break;
          case 'message':
            var messageType = event.message.type;
            var messageId = event.message.id;
            var messageText = event.message.text;
            var mess = [{'type': 'text', 'text': messageText}];
            replyMsg(replyToken, mess, channelToken);
            break;
          case 'join':
            var mess = [{'type': 'text', 'text': "join"}];
            replyMsg(replyToken, mess, channelToken);
            break;
          case 'leave':
            var mess = [{'type': 'text', 'text': "leave"}];
            replyMsg(replyToken, mess, channelToken);
            break;
          case 'memberLeft':
            var mess = [{'type': 'text', 'text': "memberLeft"}];
            replyMsg(replyToken, mess, channelToken);
            break;
          case 'memberJoined':
            var mess = [{'type': 'text', 'text': "memberJoined"}];
            replyMsg(replyToken, mess, channelToken);
            break;
          case 'follow':
            var mess = [{'type': 'text', 'text': "follow"}];
            replyMsg(replyToken, mess, channelToken);
            var uid = sheet.getRange(2, 1, sheet.getLastRow(),sheet.getLastColumn()).getValues();
                for(var i = 0;i<uid.length; i++){
                   if(userId == uid[i][0]){
                    var already = true;
                    sheet.getRange(i+2,2).setValue(displayName);
                    sheet.getRange(i+2,3).setValue(statusMessage);
                    sheet.getRange(i+2,4).setValue('=IMAGE("'+pictureUrl+'")');
                   }
                }
                   if(!already){
                    var img = '=IMAGE("'+pictureUrl+'")';
                    sheet.appendRow([userId, displayName, statusMessage, img]);
                   }
            break;
          case 'unfollow':
            var mess = [{'type': 'text', 'text': "unfollow"}];
            replyMsg(replyToken, mess, channelToken);
            break;
          default:
            break;
        }
      }
   }
}
/*
var LineHelpers = (function (helpers) {
  helpers.getSourceId = function (source) {
    try {
      switch (source.type) {
        case 'user':
          return source.userId;
          break;
        case 'group':
          return source.groupId;
          break;
        case 'room':
          return source.roomId;
          break;
        default:
          break;
      }
    } catch (ex) {
    }
  };
  return helpers;
})(LineHelpers || {});
*/
