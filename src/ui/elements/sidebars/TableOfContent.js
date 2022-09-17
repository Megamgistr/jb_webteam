import { AbstractPageObject } from "../../AbstractPageObject";
import { test } from "@playwright/test";
import { isInViewport } from "../../../helpers/is_in_viewport";

export class TableOfContent extends AbstractPageObject {
	#sidebarNav = () => this.page.locator("[data-test*=\"app__sidebar\"]");
	#itemByDtcLi = (dts) => this.page.locator(`[data-toc-scroll="${dts}"]`);
	#itemArow = (dts) => this.#itemByDtcLi(dts).locator("svg");
	#itemLink = (dts) => this.#itemByDtcLi(dts).locator("a");
	#selectedItem = () => this.page.locator("[data-toc-scroll]", {has: this.page.locator(".toc-item--selected")});

	constructor(page) {
		super(page);
	}


	async isSidebarVisible() {
		return await test.step("Define if sidebar visible",
			async () => await this.#sidebarNav().isVisible());
	}

	async isSidebarVisibleSmallScreen() {
		return await test.step("Define if sidebar visible",
			async () => {
				const data = await this.#sidebarNav().getAttribute("data-test");
				return data.includes("visible");
			});
	}

	async isItemVisible(data_toc_scroll) {
		return await test.step(`Define if item ${data_toc_scroll} visible`,
			async () => await this.#itemByDtcLi(data_toc_scroll).isVisible());
	}

	async isItemWithArrow(data_toc_scroll) {
		return await test.step(`Define if item ${data_toc_scroll} with arrow`,
			async () => await this.#itemArow(data_toc_scroll).isVisible());
	}

	async getSelectedItemDtcAttr() {
		return await test.step("Get selected item",
			async () => await this.#selectedItem().getAttribute("data-toc-scroll"));
	}

	async clickItem(data_toc_scroll) {
		return await test.step(`Click item ${data_toc_scroll}`,
			async () => {
				await this.#itemByDtcLi(data_toc_scroll).click();
				return this;
			});
	}

	async scrollToItem(data_toc_scroll) {
		return await test.step(`Scroll to item ${data_toc_scroll}`,
			async () => {
				await this.#itemByDtcLi(data_toc_scroll).scrollIntoViewIfNeeded();
				return this;
			});
	}

	async getItemHrefAttr(data_toc_scroll) {
		return await test.step(`Get item ${data_toc_scroll} href attr`,
			async () =>  await this.#itemLink(data_toc_scroll).getAttribute("href"));
	}

	async hoverItem(data_toc_scroll) {
		return await test.step(`Hover item ${data_toc_scroll}`,
			async () => {
				await this.#itemByDtcLi(data_toc_scroll).hover();
				return this;
			});
	}

	async clickItemArrow(data_toc_scroll) {
		return await test.step(`Click item ${data_toc_scroll} arrow`,
			async () => {
				await this.#itemArow(data_toc_scroll).click();
				return this;
			});
	}

	async isItemVisibleInViewport(data_toc_scroll) {
		return await test.step(`Define if item visible ${data_toc_scroll} in viewport`,
			async () => await this.#itemByDtcLi(data_toc_scroll).evaluate(isInViewport));
	}
}