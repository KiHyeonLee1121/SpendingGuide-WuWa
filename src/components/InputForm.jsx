import { useState } from 'react';

export default function InputForm({ onCalculate }) {
  const [daysLeft, setDaysLeft] = useState('0');
  const [charCount, setCharCount] = useState('0');
  const [weaponCount, setWeaponCount] = useState('0');
  const [mode, setMode] = useState(1); // 1 = 천장, 2 = 평균

  const handleSubmit = (e) => {
    e.preventDefault();

    // 문자열 상태를 안전하게 숫자로 변환
    const days = parseInt(daysLeft || '0', 10);
    const chars = parseInt(charCount || '0', 10);
    const weapons = parseInt(weaponCount || '0', 10);

    // ✅ 변수명 통일하여 객체 전달
    onCalculate({
      daysLeft: days,
      charCount: chars,
      weaponCount: weapons,
      mode: mode,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label>픽업까지 남은 일 수:</label>
        <input
          type="number"
          value={daysLeft}
          onChange={(e) => setDaysLeft(e.target.value)}
          placeholder="0"
          required
        />
      </div>

      <div>
        <label>캐릭터 뽑기 횟수:</label>
        <input
          type="number"
          value={charCount}
          onChange={(e) => setCharCount(e.target.value)}
          placeholder="0"
          required
        />
      </div>

      <div>
        <label>무기 뽑기 횟수:</label>
        <input
          type="number"
          value={weaponCount}
          onChange={(e) => setWeaponCount(e.target.value)}
          placeholder="0"
          required
        />
      </div>

      <div>
        <label>시뮬레이션 모드:</label>
        <div>
          <label>
            <input
              type="radio"
              value={1}
              checked={mode === 1}
              onChange={() => setMode(1)}
            />
            천장 기준 (12,800개)
          </label>
          <label>
            <input
              type="radio"
              value={2}
              checked={mode === 2}
              onChange={() => setMode(2)}
            />
            평균 기준 (11,520개)
          </label>
        </div>
      </div>

      <button type="submit">계산하기</button>
    </form>
  );
}
