import cohere

class CohereAgent:
    def __init__(self, api_key):
        self.client = cohere.Client(api_key)

    def respond(self, prompt):
        response = self.client.chat(message=prompt)
        return response.text