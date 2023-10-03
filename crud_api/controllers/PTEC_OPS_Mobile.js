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
    res.status(200).send(response);
    if (response[0].userReply) {
      const sendJSON = {
        "to": response[0].userReply,
        "messages": [{
          "type": "flex",
          "quickReply": { // ②
            "items": [
              {
                "type": "action", // ③
                "action": {
                  "type": "message",
                  "label": "แสดงงาน OPS",
                  "text": "แสดงงาน OPS"
                }
              },
            ]
          },
          "contents": {
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "แจ้งเตือน !!",
                  "weight": "bold",
                  "color": "#00FF00",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": `${response[0].res}`,
                  "size": "xs",
                  "wrap": true
                },
              ]
            },
            "type": "bubble"
          },
          "altText": "Flex Message"
        }]
      }
      axios.post('https://api.line.me/v2/bot/message/push', sendJSON, { headers })
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const webhooks = async (req, res) => {
  // console.log('webhooks');
  // console.log(req.userid);
  // console.log(req);
  try {
    
    
    console.log('#########################################################');
    console.log('try');
    res.status(200).send("OK")
    const events = req.body.events
    console.log('------');
    console.log(events);
    if (events.length > 0) {
      if (events[0].source.userId) {
        const venderID = await query_OPS_mobile.STrack_CheckVenderID(events[0].source.userId)
        const textJSON = {
          "type": "flex",
          "quickReply": { // ②
            "items": [
              {
                "type": "action", // ③
                "action": {
                  "type": "message",
                  "label": "แสดงงาน OPS",
                  "text": "แสดงงาน OPS"
                }
              },
            ]
          },
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
        if ((venderID ? venderID[0].response : undefined) === 'false') {
          console.log('webhooks in 1 ');

          if (events[0].replyToken) {
            console.log('webhooks in 1.1 ');
            console.log(events[0].replyToken);
            console.log(textJSON);
            
            return client.replyMessage(events[0].replyToken, textJSON)
          }
        } else {
           console.log('webhooks in 2 ');

          return await events.map((items) => handleEvent(items))
        }
      }
    }
  } catch (error) {
    console.log('#########################################################');
    console.log('catch');
    res.status(500).end
  }
}

const handleEvent = async (event) => {
  if (event.type === 'postback') {
    return null
  } else if (event.type === 'message') {
    const body = { "message": event.message.text, "userid_line": event.source.userId }
    const venderID = await query_OPS_mobile.STrack_callMessages(body)
    
    console.log(venderID);
    console.log('in handleEvent 0');
    if ((venderID ? venderID.length : 0) > 0) {
      
      console.log('in handleEvent 0.1');
      if (!(venderID ? venderID[0].response : undefined)) {
        console.log('in handleEvent 1');
        const str = 'ยังไม่มีคำสั่งนี้ $'
        return client.replyMessage(event.replyToken,
          {
            "type": "text",
            "text": `${str}`,
            "quickReply": { // ②
              "items": [
                {
                  "type": "action", // ③
                  "action": {
                    "type": "message",
                    "label": "แสดงงาน OPS",
                    "text": "แสดงงาน OPS"
                  }
                },
              ]
            },
            "emojis": [
              {
                "index": str.indexOf('$'),
                "productId": "5ac21a18040ab15980c9b43e",
                "emojiId": "005",
              }
            ]
          })
      }
      else if ((venderID ? venderID[0].response : undefined).indexOf('cancel STK') > -1) {
        
        console.log('in handleEvent 2');
        return client.replyMessage(event.replyToken,
          {
            "type": "text",
            "text": `${venderID[0].response}`,
          })
      }
      else if ((venderID ? venderID[0].response : undefined) === 'แสดงงาน OPS') {
        
        console.log('in handleEvent 3');
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
                      "text": `[${item.STK_CODE}]`,
                      "wrap": true,
                      "weight": "bold",
                      "size": "md",
                      "color": "#ffffff",
                      "flex": 4,
                    },
                    {
                      "type": "text",
                      "text": `${item.title} (${item.jobDetails})`,
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
                  "text": `ผู้แจ้ง : ${item.user_name} (ผู้จัดการสาขา ${item.branch_issue})`,
                  "wrap": true,
                  "color": "#aaaaaa",
                  "size": "xs",
                },
                {
                  "type": "text",
                  "text": `ติดต่อผู้แจ้ง : ${item.user_tel}`,
                  "wrap": true,
                  "color": "#aaaaaa",
                  "size": "xs",
                },
                {
                  "type": "text",
                  "text": `ติดต่อออฟฟิศ : ${item.OfficeTel}`,
                  "wrap": true,
                  "size": "xs",
                  "margin": "md",
                  "color": "#aaaaaa",
                },
                {
                  "type": "text",
                  "text": `ที่อยู่ : ${item.address}`,
                  "wrap": true,
                  "size": "xs",
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
                      "text": "แจ้งงานผู้รับเหมา",
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
                      "text": "ยืนยันรับงาน",
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
                      "text": "กำลังดำเนินการ",
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
                              "backgroundColor": item.time_step4 ? "#FFA500" : "#EF454D"
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
                          "borderColor": item.time_step4 ? "#FFA500" : "#EF454D",
                          "borderWidth": "2px",
                          "backgroundColor": item.time_step4 ? "#FFA500" : "#EF454D"
                        },
                        {
                          "type": "filler"
                        }
                      ],
                      "flex": 0
                    },
                    {
                      "type": "text",
                      "text": "ส่งงาน",
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
                    "label": item.userid_line ? 'FOLLOWUP' : "COMFIRM",
                    "text": item.userid_line ? `${item.STK_CODE}` : `${item.statusid + 1}>${item.STK_CODE}`
                  },
                  "height": "sm",
                  "style": "primary",
                  "color": item.userid_line ? "#aaaaaa" : "#1DB446",
                  "margin": "sm",
                },
                {
                  "type": "button",
                  "action": {
                    "type": "message",
                    "label": "Cancel",
                    "text": `!${item.STK_CODE}`
                  },
                  "height": "sm",
                  "margin": "sm",
                  "style": "primary",
                  "color": "#EF454D"
                },
              ]
            },
          })
        }
        const sendJSON = {
          "type": "flex",
          "quickReply": { // ②
            "items": [
              {
                "type": "action", // ③
                "action": {
                  "type": "message",
                  "label": "แสดงงาน OPS",
                  "text": "แสดงงาน OPS"
                }
              },
              {
                "type": "action", // ③
                "action": {
                  "type": "message",
                  "label": "แสดงงานใหม่",
                  "text": "แสดงงาน แจ้งผู้รับเหมา"
                }
              }, 
              {
                "type": "action", // ③
                "action": {
                  "type": "message",
                  "label": "แสดงงานยืนยันรับงาน",
                  "text": "แสดงงาน ยืนยันรับงาน"
                }
              },
              {
                "type": "action", // ③
                "action": {
                  "type": "message",
                  "label": "แสดงงานกำลังดำเนินการ",
                  "text": "แสดงงาน กำลังดำเนินการ"
                }
              },
              {
                "type": "action", // ③
                "action": {
                  "type": "message",
                  "label": "แสดงงานส่งมอบงาน",
                  "text": "แสดงงาน ส่งมอบงาน"
                }
              },
            ]
          },
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
      } else if ((venderID ? venderID[0].response : undefined) === 'แสดงงาน OPS ของฉัน') {
        
        console.log('in handleEvent 4');
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
                      "text": `[${item.STK_CODE}]`,
                      "wrap": true,
                      "weight": "bold",
                      "size": "md",
                      "color": "#ffffff",
                      "flex": 4,
                    },
                    {
                      "type": "text",
                      "text": `${item.title} (${item.jobDetails})`,
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
                  "text": `ผู้แจ้ง : ${item.user_name} (ผู้จัดการสาขา ${item.branch_issue})`,
                  "wrap": true,
                  "color": "#aaaaaa",
                  "size": "xs",
                },
                {
                  "type": "text",
                  "text": `ติดต่อผู้แจ้ง : ${item.user_tel}`,
                  "wrap": true,
                  "color": "#aaaaaa",
                  "size": "xs",
                },
                {
                  "type": "text",
                  "text": `ติดต่อออฟฟิศ : ${item.OfficeTel}`,
                  "wrap": true,
                  "size": "xs",
                  "margin": "md",
                  "color": "#aaaaaa",
                },
                {
                  "type": "text",
                  "text": `ที่อยู่ : ${item.address}`,
                  "wrap": true,
                  "size": "xs",
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
                      "text": "แจ้งงานผู้รับเหมา",
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
                      "text": "ยืนยันรับงาน",
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
                      "text": "กำลังดำเนินการ",
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
                          "borderColor": item.time_step4 ? "#FFA500" : "#EF454D",
                          "borderWidth": "2px",
                          "backgroundColor": item.time_step4 ? "#FFA500" : "#EF454D"
                        },
                        {
                          "type": "filler"
                        }
                      ],
                      "flex": 0
                    },
                    {
                      "type": "text",
                      "text": "ส่งงาน",
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
                    "text": `${item.statusid - 1}>${item.STK_CODE}`
                  },
                  "style": "primary",
                  "color": item.time_step4 ? "#AAAAAA" : "#1DB446",
                  "margin": "sm"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "message",
                    "label": "Cancel",
                    "text": `!${item.STK_CODE}`
                  },
                  "style": "primary",
                  "margin": "sm",
                  "color": "#EF454D"
                },
              ]
            },
          })
        }
        const sendJSON = {
          "type": "flex",
          "quickReply": { // ②
            "items": [
              {
                "type": "action", // ③
                "action": {
                  "type": "message",
                  "label": "แสดงงาน OPS",
                  "text": "แสดงงาน OPS"
                }
              },
            ]
          },
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
      } else if ((venderID ? venderID[0].response : undefined) === 'step_ops') {
        
        console.log('in handleEvent 5');
        const JSONres = {
          "type": "flex",
          "quickReply": { // ②
            "items": [
              {
                "type": "action", // ③
                "action": {
                  "type": "message",
                  "label": "แสดงงาน OPS",
                  "text": "แสดงงาน OPS"
                }
              },
            ]
          },
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
                      "text": `[${venderID[0].STK_CODE}]`,
                      "wrap": true,
                      "weight": "bold",
                      "size": "md",
                      "color": "#ffffff",
                      "flex": 4,
                    },
                    {
                      "type": "text",
                      "text": `${venderID[0].title} (${venderID[0].jobDetails})`,
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
                  "text": `ผู้แจ้ง : ${venderID[0].user_name} (ผู้จัดการสาขา ${venderID[0].branch_issue})`,
                  "wrap": true,
                  "color": "#aaaaaa",
                  "size": "xs",
                },
                {
                  "type": "text",
                  "text": `ติดต่อผู้แจ้ง : ${venderID[0].user_tel}`,
                  "wrap": true,
                  "color": "#aaaaaa",
                  "size": "xs",
                },
                {
                  "type": "text",
                  "text": `สาขาที่เกิดปัญหา : ${venderID[0].branch_issue}`,
                  "wrap": true,
                  "size": "xs",
                  "margin": "md",
                  "color": "#aaaaaa",
                },
                {
                  "type": "text",
                  "text": `ติดต่อออฟฟิศ : ${venderID[0].OfficeTel}`,
                  "wrap": true,
                  "size": "xs",
                  "margin": "md",
                  "color": "#aaaaaa",
                },
                {
                  "type": "text",
                  "text": `ที่อยู่ : ${venderID[0].address}`,
                  "wrap": true,
                  "size": "xs",
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
                      "text": "แจ้งงานผู้รับเหมา",
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
                      "text": "ยืนยันรับงาน",
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
                      "text": "กำลังดำเนินการ",
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
                              "backgroundColor": venderID[0].time_step4 ? "#FFA500" : "#EF454D"
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
                          "borderColor": venderID[0].time_step4 ? "#FFA500" : "#EF454D",
                          "borderWidth": "2px",
                          "backgroundColor": venderID[0].time_step4 ? "#FFA500" : "#EF454D"
                        },
                        {
                          "type": "filler"
                        }
                      ],
                      "flex": 0
                    },
                    {
                      "type": "text",
                      "text": "ส่งงาน",
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
                    "label": "Back",
                    "text": `${venderID[0].statusid - 1}<${venderID[0].STK_CODE}`
                  },
                  "style": "primary",
                  "margin": "sm",
                  "color": "#FFA500"
                },
                {
                  "type": "button",
                  "action": venderID[0].statusid === 3 ? {
                    "type": "uri",
                    "label": "Next",
                    "uri": `https://liff.line.me/1657915988-KLn4ZXyE?stk_code=${venderID[0].STK_CODE}`
                  } : {
                    "type": "message",
                    "label": "Next",
                    "text": `${venderID[0].statusid + 1}>${venderID[0].STK_CODE}`
                  },
                  "style": "primary",
                  "color": venderID[0].time_step4 ? "#AAAAAA" : "#1DB446",
                  "margin": "sm"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "message",
                    "label": "Cancel",
                    "text": `!${venderID[0].STK_CODE}`
                  },
                  "style": "primary",
                  "margin": "sm",
                  "color": "#EF454D"
                },
              ]
            },
          },
          "altText": "Flex Message"
        }
        return client.replyMessage(event.replyToken, JSONres)
      }
      // else if ((venderID ? venderID[0].response : undefined)) {
      //   return client.replyMessage(event.replyToken,
      //     {
      //       "type": "text",
      //       "text": `${venderID[0].response}`
      //     })
      // }
    }
  }
}

const STrack_responseFlex_AfterInsert = async (req, res, next) => {
  try {
    const body = req.body;
    const response = await query_OPS_mobile.STrack_responseFlex_AfterInsert(body)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (response.length > 0) {
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
                  "text": `${response[0].OPS_CODE}`,
                  "wrap": true,
                  "weight": "bold",
                  "size": "xl",
                  "color": "#ffffff",
                  "flex": 4,
                },
                {
                  "type": "text",
                  "text": `[${response[0].STK_CODE}]`,
                  "wrap": true,
                  "weight": "bold",
                  "size": "md",
                  "color": "#ffffff",
                  "flex": 4,
                },
                {
                  "type": "text",
                  "text": `${response[0].title} (${response[0].jobDetails})`,
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
              "text": `ผู้แจ้ง : ${response[0].user_name} (ผู้จัดการสาขา ${response[0].branch_issue})`,
              "wrap": true,
              "color": "#aaaaaa",
              "size": "xs",
            },
            {
              "type": "text",
              "text": `ติดต่อผู้แจ้ง : ${response[0].user_tel}`,
              "wrap": true,
              "color": "#aaaaaa",
              "size": "xs",
            },
            {
              "type": "text",
              "text": `ติดต่อออฟฟิศ : ${response[0].OfficeTel}`,
              "wrap": true,
              "size": "xs",
              "margin": "md",
              "color": "#aaaaaa",
            },
            {
              "type": "text",
              "text": `ที่อยู่ : ${response[0].address}`,
              "wrap": true,
              "size": "xs",
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
                  "text": "แจ้งงานผู้รับเหมา",
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
                  "text": "ยืนยันรับงาน",
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
                  "text": "กำลังดำเนินการ",
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
                          "backgroundColor": response[0].time_step4 ? "#FFA500" : "#EF454D"
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
                      "borderColor": response[0].time_step4 ? "#FFA500" : "#EF454D",
                      "borderWidth": "2px",
                      "backgroundColor": response[0].time_step4 ? "#FFA500" : "#EF454D"
                    },
                    {
                      "type": "filler"
                    }
                  ],
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": "ส่งงาน",
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
                "label": "COMFIRM",
                "text": `${2}>${response[0].STK_CODE}`
              },
              "height": "sm",
              "style": "primary",
              "color": response[0].time_step4 ? "#aaaaaa" : "#1DB446",
              "margin": "sm",
            },
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
          ]
        },
      }
      const hasUserid = (element) => {
        return element.userid ? true : false;
      }
      if (response.every(hasUserid)) {
        for (var i = 0; i < response.length; i++) {
          if (response[i].userid) {
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
                    "quickReply": { // ②
                      "items": [
                        {
                          "type": "action", // ③
                          "action": {
                            "type": "message",
                            "label": "แสดงงาน OPS",
                            "text": "แสดงงาน OPS"
                          }
                        },
                      ]
                    },
                    "contents": responseJSON,
                    "altText": "Flex Message"
                  }]
                }
                res.status(200).send(sendJSON);
                await axios.post('https://api.line.me/v2/bot/message/push', sendJSON, { headers })
              })
          }
        }
      } else {
        res.status(200).send(response);
      }
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const STrack_SuccessJob = async (req, res, next) => {
  try {
    const body = req.body;
    const response = await query_OPS_mobile.STrack_SuccessJob(body)
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (response.length > 0) {
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
                  "text": `${response[0].OPS_CODE}`,
                  "wrap": true,
                  "weight": "bold",
                  "size": "xl",
                  "color": "#ffffff",
                  "flex": 4,
                },
                {
                  "type": "text",
                  "text": `[${response[0].STK_CODE}]`,
                  "wrap": true,
                  "weight": "bold",
                  "size": "md",
                  "color": "#ffffff",
                  "flex": 4,
                },
                {
                  "type": "text",
                  "text": `${response[0].title} (${response[0].jobDetails})`,
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
              "text": `ผู้แจ้ง : ${response[0].user_name} (ผู้จัดการสาขา ${response[0].branch_issue})`,
              "wrap": true,
              "color": "#aaaaaa",
              "size": "xs",
            },
            {
              "type": "text",
              "text": `ติดต่อผู้แจ้ง : ${response[0].user_tel}`,
              "wrap": true,
              "color": "#aaaaaa",
              "size": "xs",
            },
            {
              "type": "text",
              "text": `ติดต่อออฟฟิศ : ${response[0].OfficeTel}`,
              "wrap": true,
              "size": "xs",
              "margin": "md",
              "color": "#aaaaaa",
            },
            {
              "type": "text",
              "text": `ที่อยู่ : ${response[0].address}`,
              "wrap": true,
              "size": "xs",
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
                  "text": "แจ้งงานผู้รับเหมา",
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
                  "text": "ยืนยันรับงาน",
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
                  "text": "กำลังดำเนินการ",
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
                  "text": "ส่งงาน (Completed)",
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
                "quickReply": { // ②
                  "items": [
                    {
                      "type": "action", // ③
                      "action": {
                        "type": "message",
                        "label": "แสดงงาน OPS",
                        "text": "แสดงงาน OPS"
                      }
                    },
                  ]
                },
                "contents": responseJSON,
                "altText": "Flex Message"
              }]
            }
            res.status(200).send(sendJSON);
            await axios.post('https://api.line.me/v2/bot/message/push', sendJSON, { headers })
          })
      }
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const STrack_End_Comments = async (req, res) => {
  try {
    const data = req.body
    const new_data = await query_OPS_mobile.STrack_End_Comments(data);
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify(new_data));
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
                  "text": `${new_data[0].OPS_CODE}`,
                  "wrap": true,
                  "weight": "bold",
                  "size": "xl",
                  "color": "#ffffff",
                  "flex": 4,
                },
                {
                  "type": "text",
                  "text": `[${new_data[0].STK_CODE}]`,
                  "wrap": true,
                  "weight": "bold",
                  "size": "md",
                  "color": "#ffffff",
                  "flex": 4,
                },
                {
                  "type": "text",
                  "text": `${new_data[0].title} (${new_data[0].jobDetails})`,
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
              "text": `ผู้แจ้ง : ${new_data[0].user_name} (ผู้จัดการสาขา ${new_data[0].branch_issue})`,
              "wrap": true,
              "color": "#aaaaaa",
              "size": "xs",
            },
            {
              "type": "text",
              "text": `ติดต่อผู้แจ้ง : ${new_data[0].user_tel}`,
              "wrap": true,
              "color": "#aaaaaa",
              "size": "xs",
            },
            {
              "type": "text",
              "text": `ติดต่อออฟฟิศ : ${new_data[0].OfficeTel}`,
              "wrap": true,
              "size": "xs",
              "margin": "md",
              "color": "#aaaaaa",
            },
            {
              "type": "text",
              "text": `ที่อยู่ : ${new_data[0].address}`,
              "wrap": true,
              "size": "xs",
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
                  "text": `${new_data[0].time_step1 ? new_data[0].time_step1 : null}`,
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
                      "borderColor": new_data[0].time_step1 ? "#1DB446" : "#EF454D",
                      "borderWidth": "2px",
                      "backgroundColor": new_data[0].time_step1 ? "#1DB446" : "#EF454D"
                    },
                    {
                      "type": "filler"
                    }
                  ],
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": "แจ้งงานผู้รับเหมา",
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
                          "backgroundColor": new_data[0].time_step2 ? "#1DB446" : "#EF454D"
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
                      "text": `${new_data[0].time_step2 ? new_data[0].time_step2 : null}`,
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
                      "borderColor": new_data[0].time_step2 ? "#1DB446" : "#EF454D",
                      "backgroundColor": new_data[0].time_step2 ? "#1DB446" : "#EF454D"
                    },
                    {
                      "type": "filler"
                    }
                  ],
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": "ยืนยันรับงาน",
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
                          "backgroundColor": new_data[0].time_step3 ? "#1DB446" : "#EF454D"
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
                      "text": `${new_data[0].time_step3 ? new_data[0].time_step3 : null}`,
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
                      "borderColor": new_data[0].time_step3 ? "#1DB446" : "#EF454D",
                      "backgroundColor": new_data[0].time_step3 ? "#1DB446" : "#EF454D"
                    },
                    {
                      "type": "filler"
                    }
                  ],
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": "กำลังดำเนินการ",
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
                          "backgroundColor": new_data[0].time_step4 ? "#FFA500" : "#EF454D"
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
                  "text": `${new_data[0].time_step3 ? new_data[0].time_step4 : null}`,
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
                      "borderColor": new_data[0].time_step4 ? "#FFA500" : "#EF454D",
                      "borderWidth": "2px",
                      "backgroundColor": new_data[0].time_step4 ? "#FFA500" : "#EF454D"
                    },
                    {
                      "type": "filler"
                    }
                  ],
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": "ส่งงาน (รอประเมิน)",
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
                "label": "BACK",
                "text": `${3}<${new_data[0].STK_CODE}`
              },
              "height": "sm",
              "style": "primary",
              "color": "#FFA500",
              "margin": "sm",
            },
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "Cancel",
                "text": `!${new_data[0].STK_CODE}`
              },
              "height": "sm",
              "margin": "sm",
              "style": "primary",
              "color": "#EF454D"
            },
          ]
        },
      }
      const headers = {
        Authorization: `Bearer ${env.ACCESSTOKEN}`,
        "Content-Type": "application/json; charset=utf-8"
      }

      client
        .getProfile(new_data[0].userid_line)
        .then(async (profile) => {
          const sendJSON = {
            "to": profile.userId,
            "messages": [{
              "type": "flex",
              "quickReply": { // ②
                "items": [
                  {
                    "type": "action", // ③
                    "action": {
                      "type": "message",
                      "label": "แสดงงาน OPS",
                      "text": "แสดงงาน OPS"
                    }
                  },
                ]
              },
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

const STcheck_files = async (req, res) => {
  var newpath = 'D:' + "/files/Supliers_Tacking/";

  const file = req.files.file;
  const st_code = req.body.ST_code;
  const filename = file.name;
  const usercode = 'SYSTEM' //SYSTEM (users)
  const url = 'http://vpnptec.dyndns.org:33080/Supliers_Tacking/'

  const attach = 'ATT'
  const new_path = await query_OPS_mobile.FA_Control_Running_NO(attach)
  file.mv(`${newpath}${new_path[0].ATT}.${filename.split('.').pop()}`, async (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    const body = { "st_code": st_code, "url": `${url}${new_path[0].ATT}.${filename.split('.').pop()}`, "user": usercode, "description": st_code }
    const resposne = await query_OPS_mobile.NonPO_Attatch_Save(body)
    res.status(200).send({ attach: resposne });
  });

}

const STK_unCompletedBy_User = async (req, res) => {
  try {
    const data = req.body;
    const new_data = await query_OPS_mobile.STK_unCompletedBy_User(data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (new_data.length == 0) {
      res.status(400).send(JSON.stringify({ message: "ไม่พบข้อมูล" }));
    } else {
      res.status(200).send(JSON.stringify({ message: "success", data: new_data }));
      const headers = {
        Authorization: `Bearer ${env.ACCESSTOKEN}`,
        "Content-Type": "application/json; charset=utf-8"
      }
      for (let i = 0; i < new_data.length; i++) {
        const sendJSON = {
          "to": new_data[i].userid,
          "messages": [{
            "type": "flex",
            "quickReply": { // ②
              "items": [
                {
                  "type": "action", // ③
                  "action": {
                    "type": "message",
                    "label": "แสดงงาน OPS",
                    "text": "แสดงงาน OPS"
                  }
                },
              ]
            },
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
                    "text": "ดำเนินรายการไม่สำเร็จ",
                    "size": "xs",
                    "wrap": true
                  },
                  {
                    "type": "button",
                    "action": {
                      "type": "message",
                      "label": "ดำเนินการใหม่อีกครั้ง",
                      "text": `${new_data[i].STrack_Code}`
                    },
                    "height": "sm",
                    "style": "primary",
                    "color": "#FFA500",
                    "margin": "sm",
                  },
                ]
              },
              "type": "bubble"
            },
            "altText": "Flex Message"
          }]
        }
        axios.post('https://api.line.me/v2/bot/message/push', sendJSON, { headers })
      }
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
  STrack_End_Comments,
  STcheck_files,
  STrack_SuccessJob,
  STK_unCompletedBy_User
}

