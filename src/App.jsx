import React from 'react';
import './App.css';
import MainFrame from './components/MainFrame';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <h1>Comparing AI Models</h1>
      </header>

      <div>
        <MainFrame />
      </div>

      <div>
        <div className='AboutSection'>
          <h1>About Each Model</h1>
          <ul>
            <li>
              <h2>Davinci</h2>
              <p>
              Davinci is the most advanced and capable GPT-3 model. Can do any task the other models can do, often with higher quality.  Davinci has a wide range of capabilities that include natural language processing, image recognition, and even code generation. It has been trained on a massive corpus of data and can be used for a variety of tasks, from chatbot creation to creative writing and even game development.
              </p>
            </li>
            <li>
              <h2>Curie</h2>
              <p>
              Curie is an LLM designed for natural language processing tasks such as language translation, sentiment analysis, and question-answering. It has been trained on a large corpus of text data and has a high level of accuracy in these tasks. Very capable, but faster and lower cost than Davinci.
              </p>
            </li>
            <li>
              <h2>Ada</h2>
              <p>
              Ada is another LLM designed for natural language processing tasks, but with a focus on generating human-like text. It has been trained on a large corpus of text data, including literature and poetry, and can be used for tasks such as content creation and creative writing. Very capable, but faster and lower cost than Davinci.
              </p>
            </li>
            <li>
              <h2>Babbage</h2>
              <p>
              Babbage is an LLM that is specialized for machine learning tasks such as classification, regression, and clustering. It has been trained on a large corpus of numerical data and can be used for tasks such as predictive modeling and data analysis. Capable of straightforward tasks, very fast, and lower cost.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className='footer'>
        <p>
          <i>Created by: Amado Lazo, CJ, and Nabil</i>
        </p>
      </div>
    </div>
  );
}

export default App;
