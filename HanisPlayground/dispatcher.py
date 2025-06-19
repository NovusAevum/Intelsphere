import os
from agents.openai_agent import OpenAIAgent
from agents.anthropic_agent import AnthropicAgent
from agents.cohere_agent import CohereAgent

class Dispatcher:
    def __init__(self):
        self.agents = {
            "openai": OpenAIAgent(os.getenv("OPENAI_API_KEY")),
            "anthropic": AnthropicAgent(os.getenv("ANTHROPIC_API_KEY")),
            "cohere": CohereAgent(os.getenv("COHERE_API_KEY"))
        }

    def run(self):
        while True:
            command = input("Enter command for God-mode AI: ").strip()
            if command == "exit":
                break
            for name, agent in self.agents.items():
                try:
                    print(f"\n>>> {name.upper()} Agent Response:")
                    print(agent.respond(command))
                except Exception as e:
                    print(f"[ERROR] {name}: {e}")