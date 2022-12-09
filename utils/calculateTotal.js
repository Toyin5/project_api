
export default function calculateTotal(obj) {
    let total = 0
    for (const key in obj) {
        if (typeof (obj[key]) === "number") {
            total += obj[key]
        }
    }
    return total;
}
