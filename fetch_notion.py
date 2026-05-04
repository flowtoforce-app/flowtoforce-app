import requests
import json

TOKEN = "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"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

# First, search for all pages to find V1 and V2
def search_notion():
    url = "https://api.notion.com/v1/search"
    response = requests.post(url, headers=HEADERS, json={"query": "FlowToForce"})
    return response.json()

# Get page content
def get_page(page_id):
    url = f"https://api.notion.com/v1/pages/{page_id}"
    response = requests.get(url, headers=HEADERS)
    return response.json()

# Get block children (content)
def get_blocks(page_id):
    url = f"https://api.notion.com/v1/blocks/{page_id}/children"
    response = requests.get(url, headers=HEADERS)
    return response.json()

# Search for FlowToForce pages
print("Searching for FlowToForce pages...")
search_results = search_notion()

print(json.dumps(search_results, indent=2, ensure_ascii=False))

