import { WebClient } from '@slack/web-api';

// TODO: test it
const sendMsgToSlack = async (scope: 'log'|'warning', msg: string) => {
  const token = process.env.SLACK_TOKEN;
  const web = new WebClient(token);

  const conversationId = scope === 'log' ? process.env.SLACK_LOG_CHANNEL_ID : process.env.SLACK_WARNING_CHANNEL_ID;
  if (!conversationId) {
    throw new Error('No conversationId configured');
  }

  const res = await web.chat.postMessage({ channel: conversationId, text: msg });

  return console.log('Message sent: ', res.ts);
};

export default sendMsgToSlack;
