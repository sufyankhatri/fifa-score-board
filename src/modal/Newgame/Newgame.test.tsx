// src/Counter.test.tsx
import { render } from "@testing-library/react";
import Newgame from "./Newgame";

test("renders the score board component", () => {
  const { container } = render(<Newgame isOpen onRequestClose={() => {}} />);
  expect(container).toBeDefined();
});
