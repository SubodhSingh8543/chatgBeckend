// const express = require('express');
// const axios = require('axios');

// const app = express();
// const port = 3000; // Change the port number if needed

// // Middleware for parsing JSON in request bodies
// app.use(express.json());

// // Define a route for handling POST requests to /chat
// app.post('/chat', async (req, res) => {
//   try {
//     // Retrieve the message from the request body
//   const message = req.body.message;
//     console.log(message);
//     // Make a request to the GPT model API with the message
//     const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
//       prompt: `${message}`,
//       max_tokens: 50
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer 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', // Replace with your OpenAI API key
//       },
//     });

//     // Extract the generated reply from the API response
//     const reply = response.data.choices[0].text.trim().split('\n');
//     console.log(reply);
//     // Send the reply back as the response
//     res.json({ reply });
//   } catch (error) {
//     console.error('Error:', error.message);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const axios = require('axios');
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

// API endpoint to receive user messages
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Send user message to ChatGPT API


    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: userMessage,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

    // Extract the generated response from the ChatGPT API
    const chatGptResponse = response.data.choices[0].text;

    // Send the response back to the frontend
    res.send({ message: chatGptResponse});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
