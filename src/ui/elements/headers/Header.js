import { AbstractPageObject } from "../../AbstractPageObject";
import { test } from "@playwright/test";

export class Header extends AbstractPageObject {
	#hamburgerButton = () =>  this.page.locator("[data-test='header-hamburger']");
	constructor(page) {
		super(page);
	}

	async checkHamburgerButtonVisible() {
		return await this.checkElemVisible("hamburger button", this.#hamburgerButton());
	}

	async clickHamburgerButton() {
		return await test.step("Click Hamburger button",
			async () => {
				await this.#hamburgerButton().click();
				return this;
			});
	}
}