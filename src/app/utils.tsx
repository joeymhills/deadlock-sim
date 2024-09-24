import { Modifier, Item, ModifierTuple } from "~/types/types";

// Hacky was of determing if I need to display the stat change as a percentage or a whole number.
// Need to add a way to display the stat name more pretty, might create an in memory map that maps the names to their pretty names
export function displayModifier(modifier: Modifier) {
   if (modifier && modifier.value % 1 == 0) {
      return (
            <p>{modifier.stat} {modifier.modifier} {modifier.value}</p>
      )
   } else if (modifier && modifier.value % 1 != 0) {
      return (
            <p>{modifier.stat}: {modifier.modifier} {Math.round(modifier.value*100)}%</p>
      )
   }
}