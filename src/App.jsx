import { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { calculatePaymentPlan } from './utils/calculator';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = (inputData) => {
    const output = calculatePaymentPlan(inputData);
    setResult(output);
    setShowResult(true); // 👉 계산 후 결과창 보이게
  };

  return (
    <div className="container">
      <h1 className="title">
        명조 과금 효율 가이드 <span className="version">v2.4</span>
      </h1>

      {!showResult ? (
        <InputForm onCalculate={handleCalculate} />
      ) : (
        <ResultDisplay
          result={result}
          onClose={() => setShowResult(false)} // 👉 X버튼 클릭 시 다시 입력창
        />
      )}
    </div>
  );
}

export default App;
