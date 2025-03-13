import React, { useEffect, useState } from 'react'
import './quiz.css';
import Control from '../Control/Control';

const quizData: Store.IQuestion[] = [
    {
      question: "How many Hz does the video standard PAL support?",
      answer: "50",
      options: ["25", "50", "60", "59"],
    },
    {
      question: "What was the name of the first Bulgarian personal computer?",
      answer: "IMKO-1",
      options: ["Pravetz 8D", "IMKO-1", "Pravetz 82", "IZOT 1030"],
    },
    {
      question: 'What was the first company to use the term "Golden Master"?',
      answer: "Apple",
      options: ["Google", "Microsoft", "Apple", "IBM"],
    },
    {
      question: 'Who invented the "Spanning Tree Protocol"?',
      answer: "Radia Perlman",
      options: ["Michael Roberts", "Radia Perlman", "Vint Cerf", "Paul Vixie"],
    },
    {
      question: "What type of sound chip does the Super Nintendo Entertainment System (SNES) have?",
      answer: "ADPCM Sampler",
      options: ["PCM Sampler", "FM Synthesizer", "ADPCM Sampler", "Programmable Sound Generator (PSG)"],
    },
    {
      question: "What vulnerability ranked #1 on the OWASP Top 10 in 2013?",
      answer: "Injection",
      options: ["Cross-Site Scripting", "Injection", "Insecure Direct Object References", "Broken Authentication"],
    },
    {
      question: "What was the name of the security vulnerability found in Bash in 2014?",
      answer: "Shellshock",
      options: ["Stagefright", "Shellshock", "Bashbug", "Heartbleed"],
    },
    {
      question: "Dutch computer scientist Mark Overmars is known for creating which game development engine?",
      answer: "Game Maker",
      options: ["Torque 2D", "Game Maker", "Stencyl", "Construct"],
    },
    {
      question: "What major programming language does Unreal Engine 4 use?",
      answer: "C++",
      options: ["C++", "Assembly", "ECMAScript", "C#"],
    },
    {
      question: "The Harvard architecture for micro-controllers added which additional bus?",
      answer: "Instruction",
      options: ["Control", "Instruction", "Address", "Data"],
    },
  ];

const Quiz = () => {
    const [quizState, setQuizState] = useState('start');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [disable, setDisable] = useState<boolean>(false);

    useEffect(() => {
      if(quizState === 'complete'){
        setCurrentQuestion(0);
        setSelectedOption(null);
        setFeedback(null);
      }
    }, [quizState]);
    

    const handleStartQuiz = () => {
        setQuizState('in-progress');
    }

    const handleAnswerSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedOption(value);
        // console.log(value);
    }

    const handleSubmit = () => {
        if (!selectedOption) return;
        const answer = quizData[currentQuestion].answer
        if (selectedOption === answer){
            setScore(prev => prev + 1);
            setFeedback('Correct!');
        }
        else {
            setFeedback(`Wrong! The correct answer is ${answer}`);
        }
        setDisable(true);
        console.log(disable);
    }

    const handleNext = () => {
        if (currentQuestion + 1 < quizData.length){
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
            setFeedback(null);
        }
        else {
            setQuizState('complete');
        }
        setDisable(false);
    }

    const handleRestart = () => {
        setQuizState('start');
        setScore(0);
    }
  

  return (
    <div className="quiz-container">
        {quizState === 'start' && (
            <div className='start-screan'>
                <h1>Welcome to the Quiz!</h1>
                <button className='btn' onClick={handleStartQuiz}>Start Quiz</button>
            </div>
        )}

        {quizState === 'in-progress' && (
            <div className="quiz-screen">
                <h2>{quizData[currentQuestion].question}</h2>
                <ul>
                    {quizData[currentQuestion].options.map((option) => (
                        <li key={option} className='option-item'>
                            <label htmlFor="">
                                <input 
                                type="radio" 
                                name='answer'
                                value={option}
                                checked={selectedOption === option}
                                onChange={handleAnswerSelected}
                                disabled={disable}
                                />
                                {option}
                            </label>
                        </li>
                    ))}
                </ul>
                <Control 
                    feedback={feedback}
                    next={handleNext}
                    submit={handleSubmit}
                    indexQuestion={currentQuestion}
                    data={quizData}
                />
            </div>
        )}

        {quizState === 'complete' && (
            <div className='result-screen'>
                <h1>Quiz Complete!</h1>
                <h3>Your Score: {score}/{quizData.length}</h3>
                <button className='btn' onClick={handleRestart}>Play Again</button>
            </div>
        )} 
    </div>
  );
};

export default Quiz