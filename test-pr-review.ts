// This is a test file to see if Gram PR AI catches the issue!
export function calculateDiscount(price: number, discountPercentage: number) {
    // BUG: The developer forgot to divide the discount by 100!
    // A $100 item with a 20% discount should be $80, but this code
    // will calculate 100 - (100 * 20) = a very negative number!
    const discountAmount = price * discountPercentage;
    const finalPrice = price - discountAmount;
    
    console.log("Discount applied!", finalPrice);
    return finalPrice;
}
