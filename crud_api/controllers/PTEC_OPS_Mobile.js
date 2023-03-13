'use strict';

const { DateTime } = require('mssql');
const query_OPS_mobile = require('../PTEC_DATA/query_OPS_mobile');
const axios = require('axios')

const dotenv = require('dotenv');
const env = dotenv.config().parsed
const line = require('@line/bot-sdk');

const lineConfig = {
  channelAccessToken: env.ACCESSTOKEN,
  channelSecret: env.SECRET_TOKEN,
}

const client = new line.Client(lineConfig);

const OPS_Mobile_List_Vender = async (req, res, next) => {
  try {
    const assetCode = req.body;
    const list_Vender = await query_OPS_mobile.OPS_Mobile_List_Vender(assetCode)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(list_Vender);
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const STrack_Registation = async (req, res, next) => {
  const headers = {
    Authorization: `Bearer ${env.ACCESSTOKEN}`,
    "Content-Type": "application/json; charset=utf-8"
  }
  try {
    const body = req.body;
    const response = await query_OPS_mobile.STrack_Registation(body)
    if (response[0].res === 'ผู้ใช้งานนี้มีการลงทะเบียนแล้ว') {
      client
        .getProfile(body.userid)
        .then(async (profile) => {
          console.log(profile);
          const sendJSON = {
            "to": profile.userId,
            "messages": [{
              "type": "flex",
              "contents": {
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": `แจ้งเตือน !! ผู้ใช้งาน ${profile.displayName}`,
                      "weight": "bold",
                      "color": "#1DB446",
                      "size": "lg"
                    },
                    {
                      "type": "text",
                      "text": `${response[0].res}`,
                      "weight": "bold",
                      "size": "md",
                      "margin": "md"
                    }
                  ]
                },
                "type": "bubble"
              },
              "altText": "Flex Message"
            }]
          }
          res.status(200).send(sendJSON);
          await axios.post('https://api.line.me/v2/bot/message/push', sendJSON, { headers })
        })
    } else {
      client
        .getProfile(body.userid)
        .then(async (profile) => {
          const sendJSON = {
            "to": profile.userId,
            "messages": [{
              "type": "flex",
              "contents": {
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": `แจ้งเตือน !! ผู้ใช้งาน ${profile.displayName}`,
                      "weight": "bold",
                      "color": "#1DB446",
                      "size": "lg"
                    },
                    {
                      "type": "text",
                      "text": `${response[0].res}`,
                      "weight": "bold",
                      "size": "md",
                      "margin": "md"
                    }
                  ]
                },
                "type": "bubble"
              },
              "altText": "Flex Message"
            }]
          }
          res.status(200).send(sendJSON);
          await axios.post('https://api.line.me/v2/bot/message/push', sendJSON, { headers })
        })
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const webhooks = async (req, res) => {
  try {
    const events = req.body.events
    if (events[0].source.userId) {
      const venderID = await query_OPS_mobile.STrack_CheckVenderID(events[0].source.userId)
      const textJSON = {
        "type": "flex",
        "contents": {
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "แจ้งเตือน !!",
                "weight": "bold",
                "color": "#FF0000",
                "size": "sm"
              },
              {
                "type": "text",
                "text": "LINE ID ของผู้ใช้งานยังไม่มีการลงทะเบียน",
                "size": "xs",
                "wrap": true
              },
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "กรุณาลงทะเบียนที่นี่",
                  "uri": "https://liff.line.me/1657915988-6Jrbvqly"
                },
                "position": "relative",
                "margin": "xxl",
                "height": "sm",
                "style": "primary",
              }
            ]
          },
          "type": "bubble"
        },
        "altText": "Flex Message"
      }
      if (venderID[0].response === 'false') {
        client.replyMessage(events[0].replyToken, textJSON)
      } else {
        await events.map((items) => handleEvent(items))
      }
    }
  } catch (error) {
    res.status(500).end
  }
}

const handleEvent = async (event) => {
  if (event.type === 'postback') {
    await handleEventPostback(event)
  } else if (event.type === 'message') {
    if (event.message.text === 'แสดงงาน OPS') {
      client
        .getProfile(event.source.userId)
        .then((profile) => {
          console.log(profile);

          const lengthJSON = [{
            "title": "OPS I",
            "OPS_CODE": "OPS9384279",
            "suplier_name": "Purethai CO",
            "branch_issue": 18
          }]

          var employees = {
            accounting: []
          };
          for (var i in lengthJSON) {
            var item = lengthJSON[i];
            employees.accounting.push({
              "type": "bubble",
              "body": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": `Title : ${item.title}`,
                    "wrap": true,
                    "weight": "bold",
                    "size": "xl"
                  },
                  {
                    "type": "text",
                    "text": `${item.OPS_CODE}`,
                    "wrap": true,
                    "weight": "bold",
                    "size": "md"
                  },
                  {
                    "type": "separator",
                    "margin": "lg"
                  },
                  {
                    "type": "text",
                    "text": `From Branch : ${item.branch_issue}`,
                    "wrap": true,
                    "color": "#aaaaaa",
                    "size": "xs",
                  },
                  {
                    "type": "text",
                    "text": `By ${item.suplier_name}`,
                    "wrap": true,
                    "size": "xxs",
                    "margin": "md",
                    "color": "#aaaaaa",
                  }
                ],
              },
              "footer": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "button",
                    "style": "primary",
                    "color": "#4169E1",
                    "action": {
                      "type": "postback",
                      "label": "SELECT JOB",
                      "data": `{ "type" : "SELECT", "ops_code" : "${item.OPS_CODE}", "branch" :  "${item.branch_issue}"}`,
                    }
                  },
                  {
                    "type": "button",
                    "action": {
                      "type": "postback",
                      "label": "CANCEL JOB",
                      "data": `{ "type" : "CANCEL", "ops_code" : "${item.OPS_CODE}", "branch" :  "${item.branch_issue}"}`,
                    },
                    "style": "primary",
                    "color": "#808080"
                  }
                ]
              },
            })
          }
          const sendJSON = {
            "type": "flex",
            "contents": {
              "type": "carousel",
              "contents": employees.accounting
            },
            "altText": "Flex Message"
          }
          if (event.type !== "message" || event.message.type !== "text") {
            return null;
          } else if (event.message.type === "text") {
            return client.replyMessage(event.replyToken, sendJSON)
          }
        })
        .catch((err) => {
          // error handling
        });
    } else {
      return client.replyMessage(event.replyToken, { "type": "text", "text": "ยังไม่มีคำสั่งนี้" })
    }
  }
}

const handleEventPostback = async (event) => {
  const data = JSON.parse(event.postback.data) // { type: 'SELECT', ops_code: 'OPS9384279', branch: '18' }
  const JSONres = {
    "type": "flex",
    "contents": {
      "type": "bubble",
      "size": "mega",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "color": "#ffffff",
                "size": "xl",
                "flex": 4,
                "weight": "bold",
                "text": `${data.ops_code} (BR : ${data.branch})`
              }
            ]
          }
        ],
        "paddingAll": "20px",
        "backgroundColor": "#0367D3",
        "spacing": "md",
        "paddingTop": "22px"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "2023-02-27",
                "size": "xs",
                "gravity": "center",
                "align": "center"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "filler"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [],
                    "cornerRadius": "30px",
                    "height": "12px",
                    "width": "12px",
                    "borderColor": "#1DB446",
                    "borderWidth": "2px"
                  },
                  {
                    "type": "filler"
                  }
                ],
                "flex": 0
              },
              {
                "type": "text",
                "text": "ยืนยันรายการแล้ว",
                "gravity": "center",
                "flex": 2,
                "size": "sm"
              }
            ],
            "spacing": "lg",
            "cornerRadius": "30px",
            "margin": "xl"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "filler"
                  }
                ],
                "flex": 1
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "filler"
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [],
                        "width": "2px",
                        "backgroundColor": "#1DB446"
                      },
                      {
                        "type": "filler"
                      }
                    ],
                    "flex": 1
                  }
                ],
                "width": "12px"
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [],
                "flex": 2
              }
            ],
            "spacing": "lg",
            "height": "35px"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "2023-03-09",
                    "gravity": "center",
                    "size": "xs",
                    "align": "center"
                  }
                ],
                "flex": 1
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "filler"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [],
                    "cornerRadius": "30px",
                    "width": "12px",
                    "height": "12px",
                    "borderWidth": "2px",
                    "borderColor": "#6486E3"
                  },
                  {
                    "type": "filler"
                  }
                ],
                "flex": 0
              },
              {
                "type": "text",
                "text": "อยู่ระหว่างดำเนืนการ",
                "gravity": "center",
                "flex": 2,
                "size": "sm"
              }
            ],
            "spacing": "lg",
            "cornerRadius": "30px"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "filler"
                  }
                ],
                "flex": 1
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "filler"
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [],
                        "width": "2px",
                        "backgroundColor": "#B7B7B7"
                      },
                      {
                        "type": "filler"
                      }
                    ],
                    "flex": 1
                  }
                ],
                "width": "12px"
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [],
                "flex": 2
              }
            ],
            "spacing": "lg",
            "height": "35px"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "NONE TIME",
                "gravity": "center",
                "size": "xs",
                "align": "center"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "filler"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [],
                    "cornerRadius": "30px",
                    "width": "12px",
                    "height": "12px",
                    "borderColor": "#EF454D",
                    "borderWidth": "2px"
                  },
                  {
                    "type": "filler"
                  }
                ],
                "flex": 0
              },
              {
                "type": "text",
                "text": "ดำเนินการเสร็จสิ้น",
                "gravity": "center",
                "flex": 2,
                "size": "sm"
              }
            ],
            "spacing": "lg",
            "cornerRadius": "30px"
          }
        ]
      }
    },
    "altText": "Flex Message"
  }
  return client.replyMessage(event.replyToken, JSONres)
}


module.exports = {
  OPS_Mobile_List_Vender,
  webhooks,
  STrack_Registation
}

