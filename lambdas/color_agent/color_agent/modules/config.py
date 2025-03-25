from langchain_openai import ChatOpenAI
import os
api_key = os.getenv("OPEN_API_KEY")
print("api_key",api_key)
model = ChatOpenAI(model="gpt-4o-mini", temperature=0, api_key=api_key)