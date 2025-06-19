import openai
import os

openai.api_key = os.getenv('OPENAI_API_KEY')

class Agent:
    def __init__(self, name):
        self.name = name
        self.history = []

    def process(self, message):
        self.history.append({"role": "user", "content": message})
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=self.history
        )
        self.history.append({"role": "assistant", "content": response.choices[0].message.content})
        return response.choices[0].message.content