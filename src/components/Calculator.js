import React, { useEffect, useState } from 'react';
import './calculator.css';
import img from '../assets/Github.svg'

const Calculator = () => {
  const [result, setResult] = useState('');

  const calculate = (value) => {
    try {
      if (value === 'C') {
        setResult('');
        return;
      }
  
      const safeValue = value.replace(/[^-()\d/*+.]/g, '');
      const calculateFunction = new Function('return ' + safeValue);
      const finalValue = calculateFunction();
  
      if (isNaN(finalValue) || !isFinite(finalValue)) {
        setResult("Can't divide by 0 or invalid expression");
        setTimeout(() => {
          setResult('');
        }, 1300);
      } else {
        setResult(finalValue.toString());
      }
    } catch (error) {
      setResult('Error');
    }
  };

  const realtimeScreen = (value) => {
    setResult((prevResult) => prevResult + value);
  };

  const keyboardInputHandler = (e) => {
    e.preventDefault();

    if (!isNaN(parseInt(e.key))) {
      realtimeScreen(e.key);
    }

    if (['+', '-', '*', '/'].includes(e.key)) {
      realtimeScreen(e.key);
    }

    if (e.key === '.') {
      realtimeScreen(e.key);
    }

    if (e.key === 'Enter') {
      calculate(result);
    }

    if (e.key === 'Backspace') {
      setResult((prevResult) => prevResult.slice(0, -1));
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyboardInputHandler);

    return () => {
      document.removeEventListener('keydown', keyboardInputHandler);
    };
  }, [keyboardInputHandler]);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="header-container">
          <h1 id="calc">Calculator</h1>
          <div className="top-buttons">
            <a target='_blank' rel="noopener noreferrer" href="https://github.com/jaseemuddinn">
              <img src={img} alt="Github Icon" height="22.5" width="22.5" id="github-icon" />
            </a>
          </div>
        </div>
        <div className="first-row">
          <input type="text" name="finalResult" id="finalResult" placeholder="Result" readOnly value={result} />
          <input type="button" value="C" onClick={()=>calculate('C')} id="clear-button" />
        </div>
        <div className="second-row">
          <input type="button" value="1" onClick={() => realtimeScreen(1)} />
          <input type="button" value="2" onClick={() => realtimeScreen(2)} />
          <input type="button" value="3" onClick={() => realtimeScreen(3)} />
          <input type="button" value="+" onClick={() => realtimeScreen('+')} />
        </div>
        <div className="third-row">
          <input type="button" value="4" onClick={() => realtimeScreen(4)} />
          <input type="button" value="5" onClick={() => realtimeScreen(5)} />
          <input type="button" value="6" onClick={() => realtimeScreen(6)} />
          <input type="button" value="-" onClick={() => realtimeScreen('-')} />
        </div>
        <div className="fourth-row">
          <input type="button" value="7" onClick={() => realtimeScreen(7)} />
          <input type="button" value="8" onClick={() => realtimeScreen(8)} />
          <input type="button" value="9" onClick={() => realtimeScreen(9)} />
          <input type="button" value="x" onClick={() => realtimeScreen('*')} />
        </div>
        <div className="fifth-row">
          <input type="button" value="/" onClick={() => realtimeScreen('/')} />
          <input type="button" value="0" onClick={() => realtimeScreen(0)} />
          <input type="button" value="." onClick={() => realtimeScreen('.')} />
          <input type="button" value="=" onClick={() => calculate(result)} />
        </div>
      </div>
      <p style={{ color: 'white', marginTop: '20px' }}>Created by <a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/jaseemuddin">Jaseemuddin Naseem</a></p>
    </div>
  );
};

export default Calculator;
