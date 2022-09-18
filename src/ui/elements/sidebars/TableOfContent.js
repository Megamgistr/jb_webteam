import { AbstractPageObject } from "../../AbstractPageObject";
import { expect, test } from "@playwright/test";
import { isInViewport } from "../../../helpers/is_in_viewport";

export class TableOfContent extends AbstractPageObject {
	#sidebarNav = () => this.page.locator("[data-test*='app__sidebar']");
	#sectionByDtcLi = (dts) => this.page.locator(`nav [data-toc-scroll="${dts}"]`);
	#arowOfSection = (dts) => this.#sectionByDtcLi(dts).locator("svg");
	#sectionLink = (dts) => this.#sectionByDtcLi(dts).locator("a");
	#selectedSection = () => this.page.locator("[data-toc-scroll]", {has: this.page.locator(".toc-item--selected")});

	constructor(page) {
		super(page);
	}

	async checkSidebarVisible() {
		return await this.checkElemVisible("sidebar", this.#sidebarNav());
	}

	async checkSidebarHidden() {
		return await this.checkElemHidden("sidebar", this.#sidebarNav());
	}

	async checkSidebarVisibleSmallScreen() {
		return await test.step("Check that sidebar visible in small screen",
			async () => {
				await expect(this.#sidebarNav()).toHaveAttribute("data-test", /visible/);
				return this;
			});
	}

	async checkSidebarHiddenSmallScreen() {
		return await test.step("Check that sidebar hidden in small screen",
			async () => {
				await expect(this.#sidebarNav()).not.toHaveAttribute("data-test", /visible/);
				return this;
			});
	}

	async checkSectionVisible(data_toc_scroll) {
		return await this.checkElemVisible(`section ${data_toc_scroll}`, this.#sectionByDtcLi(data_toc_scroll));
	}

	async checkSectionHidden(data_toc_scroll) {
		return await this.checkElemHidden(`section ${data_toc_scroll}`, this.#sectionByDtcLi(data_toc_scroll));
	}

	async checkArrowOfSectionVisible(data_toc_scroll) {
		return await this.checkElemVisible(`arrow of section ${data_toc_scroll}`, this.#arowOfSection(data_toc_scroll));
	}

	async checkArrowOfSectionHidden(data_toc_scroll) {
		return await this.checkElemHidden(`arrow of section ${data_toc_scroll}`, this.#arowOfSection(data_toc_scroll));
	}

	async checkSelectedSection(data_toc_scroll) {
		return await test.step(`Check that selected section is ${data_toc_scroll}`,
			async () => {
				await expect(this.#selectedSection()).toHaveAttribute("data-toc-scroll", data_toc_scroll);
				return this;
			});
	}

	async clickSection(data_toc_scroll) {
		return await test.step(`Click section ${data_toc_scroll}`,
			async () => {
				await this.#sectionByDtcLi(data_toc_scroll).click();
				return this;
			});
	}

	async scrollToSection(data_toc_scroll) {
		return await test.step(`Scroll to section ${data_toc_scroll}`,
			async () => {
				await this.#sectionByDtcLi(data_toc_scroll).scrollIntoViewIfNeeded();
				return this;
			});
	}

	async getSectionLinkHrefAttr(data_toc_scroll) {
		return await test.step(`Get section link ${data_toc_scroll} href attr`,
			async () =>  await this.#sectionLink(data_toc_scroll).getAttribute("href"));
	}

	async clickArrowOfSection(data_toc_scroll) {
		return await test.step(`Click arrow of section ${data_toc_scroll}`,
			async () => {
				await this.#arowOfSection(data_toc_scroll).click();
				return this;
			});
	}

	async isSectionVisibleInViewport(data_toc_scroll) {
		return await test.step(`Define if section visible ${data_toc_scroll} in viewport`,
			async () => await this.#sectionByDtcLi(data_toc_scroll).evaluate(isInViewport));
	}
}