import { render } from "@solidjs/testing-library"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import Counter from "./counter"

describe("<Counter />", () => {
	it("increments value", async () => {
		const { queryByRole } = render(() => <Counter />)
		const button = queryByRole("button") as HTMLButtonElement
		expect(button).toBeInTheDocument()
		expect(button).toHaveTextContent(/Clicks: 0/)
		await userEvent.click(button)
		expect(button).toHaveTextContent(/Clicks: 1/)
	})
})
