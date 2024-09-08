import { Item, ModifierTuple } from "~/types/types";

export function displayModifier(tuple: ModifierTuple) {
    if (tuple[0] == "*") {
       const percentage = (tuple[1] - 1) * 100;
       const sign = percentage >= 0 ? '+' : ''; // Add + sign for positive values
       return `${sign}${percentage.toFixed(0)}%`; // Round to 0 decimal places
    }

    if (tuple[0] == "+" || "-") {
       return(
            <span>{tuple[0]} {tuple[1]}</span>
       )
    }

}