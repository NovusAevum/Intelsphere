import anthropic

class AnthropicAgent:
    def __init__(self, api_key):
        self.client = anthropic.Anthropic(api_key=api_key)

    def respond(self, prompt):
        response = self.client.messages.create(
            model="claude-3-opus-20240229",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text