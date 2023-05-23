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
    res.status(200).send("OK")
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
        return client.replyMessage(events[0].replyToken, textJSON)
      } else {
        return await events.map((items) => handleEvent(items))
      }
    }
  } catch (error) {
    res.status(500).end
  }
}

const handleEvent = async (event) => {
  if (event.type === 'postback') {
    return null
  } else if (event.type === 'message') {
    const body = { "message": event.message.text, "userid_line": event.source.userId }
    const venderID = await query_OPS_mobile.STrack_callMessages(body)
    if (!venderID[0].response) {
      const str = 'ยังไม่มีคำสั่งนี้ $'
      return client.replyMessage(event.replyToken,
        {
          "type": "text",
          "text": `${str}`,
          "emojis": [
            {
              "index": str.indexOf('$'),
              "productId": "5ac21a18040ab15980c9b43e",
              "emojiId": "005",
            }
          ]
        })
    }
    else if (venderID[0].response.indexOf('cancel STK') > -1) {
      return client.replyMessage(event.replyToken,
        {
          "type": "text",
          "text": `${venderID[0].response}`,
        })
    }
    else if (venderID[0].response === 'แสดงงาน OPS') {
      const lengthJSON = venderID
      var employees = {
        accounting: []
      };
      for (var i in lengthJSON) {
        var item = lengthJSON[i];
        employees.accounting.push({
          "type": "bubble",
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
                    "text": `${item.OPS_CODE}`,
                    "wrap": true,
                    "weight": "bold",
                    "size": "xl",
                    "color": "#ffffff",
                    "flex": 4,
                  },
                  {
                    "type": "text",
                    "text": `${item.title}`,
                    "wrap": true,
                    "weight": "bold",
                    "size": "md",
                    "color": "#ffffff",
                    "flex": 4,
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
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": `สาขาผู้แจ้ง : ${item.branch_issue}`,
                "wrap": true,
                "color": "#aaaaaa",
                "size": "xs",
              },
              {
                "type": "text",
                "text": `ผู้แจ้ง : ${item.suplier_name}`,
                "wrap": true,
                "size": "xxs",
                "margin": "md",
                "color": "#aaaaaa",
              },
              {
                "type": "separator",
                "margin": "lg"
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": `${item.time_step1 ? item.time_step1 : null}`,
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
                        "borderColor": item.time_step1 ? "#1DB446" : "#EF454D",
                        "borderWidth": "2px",
                        "backgroundColor": item.time_step1 ? "#1DB446" : "#EF454D"
                      },
                      {
                        "type": "filler"
                      }
                    ],
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "ยืนยันแจ้งงาน",
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
                            "backgroundColor": item.time_step2 ? "#1DB446" : "#EF454D"
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
                        "text": `${item.time_step2 ? item.time_step2 : null}`,
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
                        "borderColor": item.time_step2 ? "#1DB446" : "#EF454D",
                        "backgroundColor": item.time_step2 ? "#1DB446" : "#EF454D"
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
                            "backgroundColor": item.time_step3 ? "#1DB446" : "#EF454D"
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
                        "text": `${item.time_step3 ? item.time_step3 : null}`,
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
                        "borderColor": item.time_step3 ? "#1DB446" : "#EF454D",
                        "backgroundColor": item.time_step3 ? "#1DB446" : "#EF454D"
                      },
                      {
                        "type": "filler"
                      }
                    ],
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "อยู่ระหว่างดำเนินการ",
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
                            "backgroundColor": item.time_step4 ? "#1DB446" : "#EF454D"
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
                    "text": `${item.time_step3 ? item.time_step4 : null}`,
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
                        "borderColor": item.time_step4 ? "#1DB446" : "#EF454D",
                        "borderWidth": "2px",
                        "backgroundColor": item.time_step4 ? "#1DB446" : "#EF454D"
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
            ],
          },
          "footer": {
            "type": "box",
            "layout": "horizontal",
            "spacing": "sm",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "label": "Cancel",
                  "text": `!${item.OPS_CODE}`
                },
                "height": "sm",
                "margin": "sm",
                "style": "primary",
                "color": "#EF454D"
              },
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "label": item.userid_line ? 'FOLLOWUP' : "COMFIRM",
                  "text": item.userid_line ? `${item.OPS_CODE}` : `${item.statusid + 1}>${item.OPS_CODE}`
                },
                "height": "sm",
                "style": "primary",
                "color": item.userid_line ? "#aaaaaa" : "#1DB446",
                "margin": "sm",
              },
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
    } else if (venderID[0].response === 'แสดงงาน OPS ของฉัน') {
      const lengthJSON = venderID
      var employees = {
        accounting: []
      };
      for (var i in lengthJSON) {
        var item = lengthJSON[i];
        employees.accounting.push({
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
                    "text": `${item.OPS_CODE}`,
                    "wrap": true,
                    "weight": "bold",
                    "size": "xl",
                    "color": "#ffffff",
                    "flex": 4,
                  },
                  {
                    "type": "text",
                    "text": `${item.title}`,
                    "wrap": true,
                    "weight": "bold",
                    "size": "md",
                    "color": "#ffffff",
                    "flex": 4,
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
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": `สาขาผู้แจ้ง : ${item.branch_issue}`,
                "wrap": true,
                "color": "#aaaaaa",
                "size": "xs",
              },
              {
                "type": "text",
                "text": `ผู้แจ้ง : ${item.suplier_name}`,
                "wrap": true,
                "size": "xxs",
                "margin": "md",
                "color": "#aaaaaa",
              },
              {
                "type": "separator",
                "margin": "lg"
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": `${item.time_step1 ? item.time_step1 : null}`,
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
                        "borderColor": item.time_step1 ? "#1DB446" : "#EF454D",
                        "borderWidth": "2px",
                        "backgroundColor": item.time_step1 ? "#1DB446" : "#EF454D"
                      },
                      {
                        "type": "filler"
                      }
                    ],
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "ยืนยันแจ้งงาน",
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
                            "backgroundColor": item.time_step2 ? "#1DB446" : "#EF454D"
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
                        "text": `${item.time_step2 ? item.time_step2 : null}`,
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
                        "borderColor": item.time_step2 ? "#1DB446" : "#EF454D",
                        "backgroundColor": item.time_step2 ? "#1DB446" : "#EF454D"
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
                            "backgroundColor": item.time_step3 ? "#1DB446" : "#EF454D"
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
                        "text": `${item.time_step3 ? item.time_step3 : null}`,
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
                        "borderColor": item.time_step3 ? "#1DB446" : "#EF454D",
                        "backgroundColor": item.time_step3 ? "#1DB446" : "#EF454D"
                      },
                      {
                        "type": "filler"
                      }
                    ],
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "อยู่ระหว่างดำเนินการ",
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
                            "backgroundColor": item.time_step4 ? "#1DB446" : "#EF454D"
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
                    "text": `${item.time_step3 ? item.time_step4 : null}`,
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
                        "borderColor": item.time_step4 ? "#1DB446" : "#EF454D",
                        "borderWidth": "2px",
                        "backgroundColor": item.time_step4 ? "#1DB446" : "#EF454D"
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
              },
            ],
          },
          "footer": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "label": "Cancel",
                  "text": `!${item.OPS_CODE}`
                },
                "style": "primary",
                "margin": "sm",
                "color": "#EF454D"
              },
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "label": "Back",
                  "text": `${item.statusid - 1}<${item.OPS_CODE}`
                },
                "style": "primary",
                "margin": "sm",
                "color": "#FFA500"
              },
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "label": "Next",
                  "text": `${item.statusid - 1}>${item.OPS_CODE}`
                },
                "style": "primary",
                "color": item.time_step4 ? "#AAAAAA" : "#1DB446",
                "margin": "sm"
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
    } else if (venderID[0].response === 'step_ops') {
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
                    "text": `${venderID[0].OPS_CODE}`,
                    "wrap": true,
                    "weight": "bold",
                    "size": "xl",
                    "color": "#ffffff",
                    "flex": 4,
                  },
                  {
                    "type": "text",
                    "text": `${venderID[0].title}`,
                    "wrap": true,
                    "weight": "bold",
                    "size": "md",
                    "color": "#ffffff",
                    "flex": 4,
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
                "type": "text",
                "text": `สาขาผู้แจ้ง : ${venderID[0].branch_issue}`,
                "wrap": true,
                "color": "#aaaaaa",
                "size": "xs",
              },
              {
                "type": "text",
                "text": `เบอร์โหทรติดต่อ : ${venderID[0].OfficeTel}`,
                "wrap": true,
                "size": "xxs",
                "margin": "md",
                "color": "#aaaaaa",
              },
              {
                "type": "separator",
                "margin": "lg"
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": `${venderID[0].time_step1 ? venderID[0].time_step1 : null}`,
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
                        "borderColor": venderID[0].time_step1 ? "#1DB446" : "#EF454D",
                        "borderWidth": "2px",
                        "backgroundColor": venderID[0].time_step1 ? "#1DB446" : "#EF454D"
                      },
                      {
                        "type": "filler"
                      }
                    ],
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "ยืนยันแจ้งงาน",
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
                            "backgroundColor": venderID[0].time_step2 ? "#1DB446" : "#EF454D"
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
                        "text": `${venderID[0].time_step2 ? venderID[0].time_step2 : null}`,
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
                        "borderColor": venderID[0].time_step2 ? "#1DB446" : "#EF454D",
                        "backgroundColor": venderID[0].time_step2 ? "#1DB446" : "#EF454D"
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
                            "backgroundColor": venderID[0].time_step3 ? "#1DB446" : "#EF454D"
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
                        "text": `${venderID[0].time_step3 ? venderID[0].time_step3 : null}`,
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
                        "borderColor": venderID[0].time_step3 ? "#1DB446" : "#EF454D",
                        "backgroundColor": venderID[0].time_step3 ? "#1DB446" : "#EF454D"
                      },
                      {
                        "type": "filler"
                      }
                    ],
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "อยู่ระหว่างดำเนินการ",
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
                            "backgroundColor": venderID[0].time_step4 ? "#1DB446" : "#EF454D"
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
                    "text": `${venderID[0].time_step4 ? venderID[0].time_step4 : null}`,
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
                        "borderColor": venderID[0].time_step4 ? "#1DB446" : "#EF454D",
                        "borderWidth": "2px",
                        "backgroundColor": venderID[0].time_step4 ? "#1DB446" : "#EF454D"
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
          },
          "footer": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "label": "Cancel",
                  "text": `!${venderID[0].OPS_CODE}`
                },
                "style": "primary",
                "margin": "sm",
                "color": "#EF454D"
              },
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "label": "Back",
                  "text": `${venderID[0].statusid - 1}<${venderID[0].OPS_CODE}`
                },
                "style": "primary",
                "margin": "sm",
                "color": "#FFA500"
              },
              {
                "type": "button",
                "action": {
                  "type": "message",
                  "label": "Next",
                  "text": `${venderID[0].statusid + 1}>${venderID[0].OPS_CODE}`
                },
                "style": "primary",
                "color": venderID[0].time_step4 ? "#AAAAAA" : "#1DB446",
                "margin": "sm"
              }
            ]
          },
        },
        "altText": "Flex Message"
      }
      return client.replyMessage(event.replyToken, JSONres)
    }
    else if (venderID[0].response) {
      return client.replyMessage(event.replyToken,
        {
          "type": "text",
          "text": `${venderID[0].response}`
        })
    }
  }
}

const STrack_responseFlex_AfterInsert = async (req, res, next) => {
  try {
    const body = req.body;
    const response = await query_OPS_mobile.STrack_responseFlex_AfterInsert(body)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const responseJSON = {
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
                "text": `${response[0].STrack_Code}`,
                "wrap": true,
                "weight": "bold",
                "size": "xl",
                "color": "#ffffff",
                "flex": 4,
              },
              {
                "type": "text",
                "text": `${response[0].Name}`,
                "wrap": true,
                "weight": "bold",
                "size": "md",
                "color": "#ffffff",
                "flex": 4,
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
        "spacing": "sm",
        "contents": [
          {
            "type": "text",
            "text": `สาขาผู้แจ้ง : ${response[0].BranchID}`,
            "wrap": true,
            "color": "#aaaaaa",
            "size": "xs",
          },
          {
            "type": "text",
            "text": `เบอร์โทรติดต่อ : ${response[0].OfficeTel}`,
            "wrap": true,
            "size": "xxs",
            "margin": "md",
            "color": "#aaaaaa",
          },
          {
            "type": "separator",
            "margin": "lg"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": `${response[0].time_step1 ? response[0].time_step1 : null}`,
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
                    "borderColor": response[0].time_step1 ? "#1DB446" : "#EF454D",
                    "borderWidth": "2px",
                    "backgroundColor": response[0].time_step1 ? "#1DB446" : "#EF454D"
                  },
                  {
                    "type": "filler"
                  }
                ],
                "flex": 0
              },
              {
                "type": "text",
                "text": "ยืนยันแจ้งงาน",
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
                        "backgroundColor": response[0].time_step2 ? "#1DB446" : "#EF454D"
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
                    "text": `${response[0].time_step2 ? response[0].time_step2 : null}`,
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
                    "borderColor": response[0].time_step2 ? "#1DB446" : "#EF454D",
                    "backgroundColor": response[0].time_step2 ? "#1DB446" : "#EF454D"
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
                        "backgroundColor": response[0].time_step3 ? "#1DB446" : "#EF454D"
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
                    "text": `${response[0].time_step3 ? response[0].time_step3 : null}`,
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
                    "borderColor": response[0].time_step3 ? "#1DB446" : "#EF454D",
                    "backgroundColor": response[0].time_step3 ? "#1DB446" : "#EF454D"
                  },
                  {
                    "type": "filler"
                  }
                ],
                "flex": 0
              },
              {
                "type": "text",
                "text": "อยู่ระหว่างดำเนินการ",
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
                        "backgroundColor": response[0].time_step4 ? "#1DB446" : "#EF454D"
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
                "text": `${response[0].time_step3 ? response[0].time_step4 : null}`,
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
                    "borderColor": response[0].time_step4 ? "#1DB446" : "#EF454D",
                    "borderWidth": "2px",
                    "backgroundColor": response[0].time_step4 ? "#1DB446" : "#EF454D"
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
          },
        ],
      },
      "footer": {
        "type": "box",
        "layout": "horizontal",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "Cancel",
              "text": `!${response[0].STrack_Code}`
            },
            "height": "sm",
            "margin": "sm",
            "style": "primary",
            "color": "#EF454D"
          },
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "COMFIRM",
              "text": `${2}>${response[0].STrack_Code}`
            },
            "height": "sm",
            "style": "primary",
            "color": response[0].time_step4 ? "#aaaaaa" : "#1DB446",
            "margin": "sm",
          },
        ]
      },
    }
    for (var i = 0; i < response.length; i++) {

      const headers = {
        Authorization: `Bearer ${env.ACCESSTOKEN}`,
        "Content-Type": "application/json; charset=utf-8"
      }

      client
        .getProfile(response[i].userid)
        .then(async (profile) => {
          const sendJSON = {
            "to": profile.userId,
            "messages": [{
              "type": "flex",
              "contents": responseJSON,
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

const STrack_End_Comments = async (req, res) => {
  try {
    const new_data = await query_fa_control.STrack_End_Comments();
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify(new_data));
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}


module.exports = {
  OPS_Mobile_List_Vender,
  webhooks,
  STrack_Registation,
  STrack_responseFlex_AfterInsert,
  STrack_End_Comments
}

