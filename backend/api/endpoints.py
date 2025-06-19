from fastapi import APIRouter
from backend.agents.agent import Agent
from backend.utils.helpers import shodan_search

router = APIRouter()

@router.get("/agents/{agent_name}")
def get_agent(agent_name: str):
    agent = Agent(agent_name)
    return {"agent": agent.name}

@router.post("/agents/{agent_name}/process")
def process_message(agent_name: str, message: str):
    agent = Agent(agent_name)
    response = agent.process(message)
    return {"response": response}

@router.get("/shodan/{query}")
def search_shodan(query: str):
    results = shodan_search(query)
    return results