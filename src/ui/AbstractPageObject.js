import { expect, test } from "@playwright/test";

export class AbstractPageObject {
	constructor(page) {
		this.page = page;
	}

	async checkElemVisible(elemName, elem) {
		return await test.step(`Check that ${elemName} visible`,
		async () => {
			await expect(elem).toBeVisible();
			return this;
		});
	}
	async checkElemHidden(elemName, elem) {
		return await test.step(`Check that ${elemName} hidden`,
		async () => {
			await expect(elem).toBeHidden();
			return this;
		});
	}
}