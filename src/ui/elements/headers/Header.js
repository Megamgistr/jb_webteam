import { AbstractPageObject } from "../../AbstractPageObject";
import { test } from "@playwright/test";

export class Header extends AbstractPageObject {
	#HAMBURGER_BUTTON = "[data-test='header-hamburger']";
	constructor(page) {
		super(page);
	}

	async isHamburgerButtonVisible() {
		return await test.step("Define if hamburger button visible",
			async () => await this.page.locator(this.#HAMBURGER_BUTTON).isVisible());
	}

	async clickHamburgerButton() {
		return await test.step("Click Hamburger button",
			async () => {
				await this.page.locator(this.#HAMBURGER_BUTTON).click();
				return this;
			});
	}
}