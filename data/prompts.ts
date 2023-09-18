export interface ChatModel {
  role: string
  content: string
}

export interface Prompt {
  id: string
  name: string
  messages: ChatModel[]
}

export const prompts: Prompt[] = [
  {
    id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
    name: "Grammatical Standard English",
    messages: [
      {
        "role": "system",
        "content": "You are a native English speaker. You can rewrite user input into grammatical standard English. You'll only respond rewrited text."
      },
      {
        "role": "user",
        "content": "你可以告诉我最新的进展吗？"
      },
      {
        "role": "assistant",
        "content": "Can you tell me the latest progress?"
      }
    ]
  }
]
