#!/bin/bash

# IntelSphere Automated Setup Script
# This script will:
# 1. Install Node.js if missing
# 2. Create the .env file with all provided API keys
# 3. Install dependencies
# 4. Start the dev server

set -e

cd "$(dirname "$0")"

# 1. Install Node.js if missing
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js not found. Installing Node.js (LTS) using Homebrew..."
  if ! command -v brew >/dev/null 2>&1; then
    echo "Homebrew not found. Please install Homebrew first: https://brew.sh/"
    exit 1
  fi
  brew install node
else
  echo "Node.js is already installed."
fi

# 2. Create .env file in HanisPlayground
cd HanisPlayground
cat > .env <<EOL
# AI Provider API Keys
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
GEMINI_API_KEY=your_gemini_key_here
MISTRAL_API_KEY=your_mistral_key_here
COHERE_API_KEY=your_cohere_key_here
GROQ_API_KEY=your_groq_key_here
XAI_API_KEY=your_xai_key_here
VOYAGE_API_KEY=your_voyage_key_here
DEEPSEEK_API_KEY=your_deepseek_key_here
LLAMA4_SCOUT_API_KEY=your_llama4_scout_key_here
RELACE_AI_API_KEY=your_relace_ai_key_here

# Google Services
GOOGLE_GENERATIVE_AI_API_KEY=your_google_gen_ai_key_here
GOOGLE_BROWSER_KEY=AIzaSyCFXf3Lp8g9ky3-jvtB83AlVW8hTYAxyMM
GOOGLE_CSE_ID=AIzaSyAGZwbfanDQntrN1F6HnUHRHoj24jVAjHE
GOOGLE_PROGRAMMABLE_SEARCH_API_KEY=your_google_prog_search_key_here

# Search and Intelligence APIs
API_NINJAS_API_KEY=your_api_ninjas_key_here
PUBLICWWW_API_KEY=your_publicwww_key_here
DNS_DUMPSTER_API_KEY=your_dns_dumpster_key_here
INTELX_API_KEY=your_intelx_key_here
SERP_API_KEY=your_serp_key_here
SHODAN_API_KEY=your_shodan_key_here

# Social Media and Marketing APIs
HUBSPOT_API_KEY=your_hubspot_key_here
X_API_KEY=your_x_api_key_here
META_TOKEN_API_KEY=your_meta_token_key_here

# Data and Analytics APIs
OBSERVABLE_API_KEY=your_observable_key_here
APOLLO_API_KEY=your_apollo_key_here
BUILDWITH_API_KEY=your_buildwith_key_here
MARKET_STACK_API_KEY=your_market_stack_key_here
WEATHER_STACK_API_KEY=your_weather_stack_key_here
NEWS_API_KEY=your_news_api_key_here
MEDIA_STACK_API_KEY=your_media_stack_key_here
API_STACK_API_KEY=your_api_stack_key_here

# Business Intelligence APIs
PODIO_API_KEY=your_podio_key_here
MARKER_API_KEY=your_marker_key_here
HUNTER_IO_API_KEY=your_hunter_io_key_here
ATLASSIN_API_KEY=your_atlassin_key_here

# Development and Infrastructure
SUPABASE_API_KEY=your_supabase_key_here
OPENROUTER_API_KEY=your_openrouter_key_here
X_RAPID_API_KEY=your_x_rapid_api_key_here
NEWRELIC_LICENSE_KEY=ac32a96a9675edc8b5ab5ece9a8c1e2dFFFFNRAL

# Additional Services
GOOGLEFONT_API_KEY=your_googlefont_key_here
DOMAIN_WHOIS_API_KEY=your_domain_whois_key_here
IP_GEOLOCATION_API_KEY=your_ip_geolocation_key_here
NUMVERIFY_API_KEY=your_numverify_key_here
VIRUSTOTAL_API_KEY=your_virustotal_key_here
EOL

# 3. Install dependencies
npm install

# 4. Start the dev server
echo "\n---\nIntelSphere setup complete! The dev server will now start.\n---\n"
npm run dev 