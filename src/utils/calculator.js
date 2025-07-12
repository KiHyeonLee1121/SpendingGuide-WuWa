import { products } from '../data/products';

export function calculatePaymentPlan({ daysLeft, charCount, weaponCount, mode }) {
  // 1. 기본 계산
  const perPull = mode === 2 ? 11520 : 12800;
  const totalPulls = charCount + weaponCount;
  const totalNeeded = totalPulls * perPull;
  const fixedIncome = daysLeft * 150;
  const cashNeeded = Math.max(totalNeeded - fixedIncome, 0);

  // 2. 상품 정렬 (가성비 높은 순)
  const sortedProducts = [...products].sort(
    (a, b) => b.stardust / b.price - a.stardust / a.price
  );

  let accumulated = 0;
  let totalCost = 0;
  const purchaseList = [];

  // 3. 1회 한정 상품 우선 구매
  for (const item of sortedProducts) {
    if (!item.limited || accumulated >= cashNeeded) continue;
    accumulated += item.stardust;
    totalCost += item.price;
    purchaseList.push({ name: item.name, count: 1 });
  }

  // 4. 반복 구매 상품으로 부족분 채움
  for (const item of sortedProducts) {
    if (item.limited || accumulated >= cashNeeded) continue;

    const remaining = cashNeeded - accumulated;
    const count = Math.ceil(remaining / item.stardust);

    for (let i = 0; i < count; i++) {
      accumulated += item.stardust;
      totalCost += item.price;
      if (accumulated - cashNeeded > 8080) break; // 초과 제한
    }

    purchaseList.push({ name: item.name, count });
    break; // 1개 반복 상품만 사용
  }

  return {
    totalNeeded,
    fixedIncome,
    cashNeeded,
    totalCost,
    accumulated,
    purchaseList,
  };
}


