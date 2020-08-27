import { WebClient } from '@slack/web-api';

// TODO: test it
const sendMsgToSlack = async (scope: 'log'|'warning', msg: string) => {
  // An access token (from your Slack app or custom integration - xoxp, xoxb)
  // const token = process.env.SLACK_TOKEN;
  console.log('sendMsgToSlack');
  const web = new WebClient('xoxb-1198102368273-1312507958599-DCZKyX7FP8Os44uqCze26vmw');

  // This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
  const conversationId = scope === 'log' ? process.env.SLACK_LOG_CHANNEL_ID : process.env.SLACK_WARNING_CHANNEL_ID;
  if (!conversationId) {
    return console.log('No conversationId configured');
  }

  // See: https://api.slack.com/methods/chat.postMessage
  const res = await web.chat.postMessage({ channel: conversationId, text: msg });

  // `res` contains information about the posted message
  return console.log('Message sent: ', res.ts);
};

export default sendMsgToSlack;
