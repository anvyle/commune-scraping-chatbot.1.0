import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  text: string;
  links: { description: string; url: string }[];
  isUser: boolean;
}

export interface MessageState {
  messages: Message[];
}

const initialState: MessageState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages } = messageSlice.actions;

export default messageSlice.reducer;
