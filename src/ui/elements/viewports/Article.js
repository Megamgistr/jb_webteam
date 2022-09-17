import { AbstractPageObject } from "../../AbstractPageObject";
import { expect, test } from "@playwright/test";

export class Article extends AbstractPageObject {
	#titleH1 = () => this.page.locator("h1");
	#firstItemInPath = () => this.page.locator(".breadcrumb__item:first-child");

	constructor(page) {
		super(page);
	}

	async clickFirstItemInPath() {
		return await test.step("Click first item in path",
			async () =>  {
				await this.#firstItemInPath().click();
				return this;
			});
	}

	async checkH1Title(expected) {
		return await test.step(`Check that h1 title is equal ${expected}`,
			async () =>  {
				await expect(this.#titleH1()).toHaveText(expected, {useInnerText: true});
				return this;
			});
	}
}