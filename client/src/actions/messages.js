// ACTION TYPES
export const GET_MESSAGES = 'GET_MESSAGES';

// ACTIONS
export function getMessages(m){
  return {
    type: GET_MESSAGES,
    messages: m
  }
}
