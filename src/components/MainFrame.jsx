import React from "react";
import UserInput from "./input-components/UserInput";
import Button from "@mui/material/Button";
import DavinciOuput from "./ouput-components/DavinciOuput";
import '../App.css';
import ApiKeyInput from "./input-components/ApiKeyInput";
import CurieOutput from "./ouput-components/CurieOutput";
import AdaOutput from "./ouput-components/AdaOutput";
import BabbageOutput from "./ouput-components/BabbageOutput";
import { useState, useEffect } from "react";
import axios from "axios";
import stringSimilarity from "string-similarity";

function MainFrame() {

    //Remember to remove this later... set useStates to empty strings
    const sampleText = ""

    const [apiKey, setApiKey] = useState(""); // State variable to store the API key
    const [userInputText, setUserInputText] = useState("");
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [davinciOutput, setDavinciOutput] = useState(sampleText);
    const [curieOutput, setCurieOutput] = useState(sampleText);
    const [adaOutput, setAdaOutput] = useState(sampleText);
    const [babbageOutput, setBabbageOutput] = useState(sampleText);
    const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
    //Used for the similarity scores
    const [davinciSimilarity, setDavinciSimilarity] = useState(sampleText);
    const [curieSimilarity, setCurieSimilarity] = useState(sampleText);
    const [adaSimilarity, setAdaSimilarity] = useState(sampleText);
    //const [babbageSimilarity, setBabbageSimilarity] = useState(sampleText);

    const setDisabledSubmitButtonState = (value) => setDisabledSubmitButton(value);
    const handleInputTextChange = (event) => setUserInputText(event.target.value);
    const handleApiKeyChange = (event) => setApiKey(event.target.value); // Callback function to handle changes to the API key input field

    useEffect(() => {
        if (userInputText.length > 0) {
            setDisabledSubmitButtonState(false);
        } else {
            setDisabledSubmitButtonState(true);
        }
    }, [userInputText]);

    const callApiFunction = async (userInput, modelName, apiKey) => {
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          };
    
          const prompt = `You are an AI assistant, and you were asked the following question: ${userInput}. Please provide a well-researched, detailed, and helpful response.`;
          console.log("Prompt:", prompt); // Log the prompt
    
          const response = await axios.post(
            `https://api.openai.com/v1/completions`,
            {
              model: modelName,
              prompt: prompt,
              max_tokens: 150, // Increase the max_tokens value
              temperature: 0.3,
            },
            { headers: headers }
          );
    
          const generatedText = response.data.choices[0].text.trim();
          console.log("API Response:", response.data); // Log the entire response
          console.log("Generated Text:", generatedText); // Log the extracted text
          return generatedText;
        } catch (error) {
          console.error("Error in callApiFunction:", error);
        }
      };

    const callSimilarityFunction = async (firstModelName, secondModelName, firstModel, secondModel, apiKey) => {
    try {
        const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
        };

        const prompt = `Display this in a STRICT JSON Format: {"Score":{},"FeedBack":{}} Compare these strings and give me a Score from 0 through 100 depending on how close they are related to each other in context AND for the feedback, provide why you gave it that score. This is ${firstModelName} vs ${secondModelName} : \n\n ${firstModelName}: "${firstModel}" \n\n ${secondModelName}: "${secondModel}"`;
        console.log("Prompt:", prompt); // Log the prompt

        const response = await axios.post(
        `https://api.openai.com/v1/completions`,
        {
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 500, // Increase the max_tokens value
            temperature: 0.3,
        },
        { headers: headers }
        );

        //return a JSON object
        const generatedText = response.data.choices[0].text.trim();
        //if cannot parse, return an error
        try {
            return JSON.parse(generatedText);
        } catch (err) {
            console.error("Error parsing JSON:", err);
            return { Score: "Err", FeedBack: "Err" };
        }
        
    } catch (error) {
            console.error("Error in callApiFunction:", error);
        }
    }
    
    
    const onButtonSubmit = async () => {
        console.log("Submitting...");
        console.log("API Key:", apiKey); // Log the value of the API key
        setLoading(true);

        try {
            const davinciResult = await callApiFunction(userInputText, "text-davinci-002", apiKey);
            const curieResult = await callApiFunction(userInputText, "text-curie-001", apiKey);
            const adaResult = await callApiFunction(userInputText, "text-ada-001", apiKey);
            const babbageResult = await callApiFunction(userInputText, "text-babbage-001", apiKey);
        
            setDavinciOutput(davinciResult);
            setCurieOutput(curieResult);
            setAdaOutput(adaResult);
            setBabbageOutput(babbageResult);

            const davinciSimilarityResult = await callSimilarityFunction("Davinci", "Curie", davinciResult, curieResult, apiKey);
            const curieSimilarityResult = await callSimilarityFunction("Curie", "Ada", curieResult, adaResult, apiKey);
            const adaSimilarityResult = await callSimilarityFunction("Ada", "Babbage", adaResult, babbageResult, apiKey);
            //const babbageSimilarityResult = await callSimilarityFunction(babbageResult, davinciResult, apiKeyText);

            setDavinciSimilarity(davinciSimilarityResult);
            setCurieSimilarity(curieSimilarityResult);
            setAdaSimilarity(adaSimilarityResult);
            //setBabbageSimilarity(babbageSimilarityResult);

        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
          setLoaded(true);
        }
      }

    return (
        <div className="FieldPlaceholder">
            <div className="UserInputFields">
                <ApiKeyInput apiKey={apiKey} changed={handleApiKeyChange} />

                <UserInput changed={handleInputTextChange} />
            </div>
            <div className="SubmitButton">
                <Button variant="contained" disabled={disabledSubmitButton || loading} onClick={onButtonSubmit}> {loading ? "Loading..." : "Submit"}</Button>
            </div>
            <div className="OutputFields">
                <DavinciOuput AiTextOutput={davinciOutput} />
                <AdaOutput AiTextOutput={adaOutput} />
                <CurieOutput AiTextOutput={curieOutput} />
                <BabbageOutput AiTextOutput={babbageOutput} />
            </div>
            {loaded && (
              <div>
                <div className="ContextSimiliarityOutput">
                    <h1>Context Similarity Output</h1>
                    <p><u>Prompt Sent to <i>GPT</i>: Display this in a STRICT JSON Format: "Score, FeedBack" Compare these strings and give me a Score from 0 through 100 depending on how close they are related to each other in context AND for the feedback, provide why you gave it that score.</u></p>
                    <div className="SimilarityOuputInner">
                      <h2>Davinci vs Curie</h2>
                      <p><strong>Score: </strong> {davinciSimilarity.Score}</p>
                      <p><strong>Feedback: </strong> {davinciSimilarity.FeedBack}</p>
                      <h2>Curie vs Ada</h2>
                      <p><strong>Score: </strong>{curieSimilarity.Score}</p>
                      <p><strong>Feedback: </strong>{curieSimilarity.FeedBack}</p>
                      <h2>Ada vs Babbage</h2>
                      <p><strong>Score: </strong>{adaSimilarity.Score}</p>
                      <p><strong>Feedback: </strong>{adaSimilarity.FeedBack}</p>
                    </div>
                </div>
                <div className="SimiliarityTextOutput">
                    <h1>Text Similarity Output</h1>
                    <p><u>This is a score from 0 to 1 where 1 is perfect text similarity.</u></p>
                    <div className="SimilarityOuputInner">
                      <h2>Davinci vs Curie</h2>
                      <p><strong>Score: </strong> { stringSimilarity.compareTwoStrings(davinciOutput, curieOutput)}</p>
                      <h2>Curie vs Ada</h2>
                      <p><strong>Score: </strong> { stringSimilarity.compareTwoStrings(curieOutput, adaOutput)}</p>
                      <h2>Ada vs Babbage</h2>
                      <p><strong>Score: </strong> { stringSimilarity.compareTwoStrings(adaOutput, babbageOutput)}</p>
                    </div>
                </div>
              </div>
            )}
        </div>
      );
}
export default MainFrame;