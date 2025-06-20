exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      response: "This is a mock AI response.",
      model: "MockModel",
      agent: "MockAgent",
      format: "conversational",
      personality: "strategic",
      capabilities: ["mock"],
      timestamp: new Date().toISOString()
    })
  };
}; 