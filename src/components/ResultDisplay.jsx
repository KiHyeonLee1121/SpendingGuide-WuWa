function ResultDisplay({ result, onClose }) {
  const {
    totalNeeded,
    fixedIncome,
    cashNeeded,
    totalCost,
    accumulated,
    purchaseList,
  } = result;

  return (
    <>
      {/* 어두운 반투명 배경 */}
      <div className="overlay" onClick={onClose}></div>

      <div className="result">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>후보 계산 결과</h2>
        <ul>
          <li>총 요구 별의소리: {totalNeeded.toLocaleString()} 개</li>
          <li>일일 수급 제외: {fixedIncome.toLocaleString()} 개</li>
          <li>현질 필요량: {cashNeeded.toLocaleString()} 개</li>
        </ul>

        <h3>유니버스 추천 구매 조합</h3>
        <ul>
          {purchaseList.map((item, idx) => (
            <li key={idx}>{item.name} × {item.count}</li>
          ))}
        </ul>

        <h4>총 가능 예산: {totalCost.toLocaleString()} 원</h4>
        <p>총 확보 별의소리: {accumulated.toLocaleString()} 개 (최대 8,080개 초과 허용)</p>

        <div className="notice">
          <p>※ 위 과금 상품 조합은 효율이 높은 순서대로 구성되었습니다.</p>
          <p>※ 상위 11개 패키지는 1회 한정 구매 상품이며, <br />이후 중복 구매 가능한 상품을 통해 목표를 달성합니다.</p>
          <p>※ 목표 별의소리 수량보다 일부 초과된 경우가 있을 수 있습니다.<br />이는 과금 효율을 우선하여 가장 효율적인 상품 단위로 구매한 결과입니다.</p>
          <p>※ 실제 필요한 수량보다 더 많은 별의소리를 획득하더라도 <br />총 과금액을 최소화하기 위한 처리입니다.</p>
        </div>
      </div>
    </>
  );
}

export default ResultDisplay;
