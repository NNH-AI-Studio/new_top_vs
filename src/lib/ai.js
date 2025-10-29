export async function generateComparison(productA, productB) {
  return {
    productA,
    productB,
    winner: productA,
    analysis: 'AI-generated comparison analysis',
  };
}
