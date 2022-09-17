import { test, expect } from "@playwright/test";
import { IDEA_HELP } from "../../../src/constants/idea_page/data_toc_scroll_atr_value";
import { H1Titles } from "../../../src/constants/idea_page/titels";
import { HelpIdea } from "../../../src/ui/pages/HelpIdea";

let ideaPage;
let toc;
let article;
let startUrl;

test.beforeEach(async ({ page }) => {
  await page.goto("");
  ideaPage = new HelpIdea(page);
	toc = ideaPage.tableOfContent();
	article = ideaPage.article();
	startUrl = await page.url();
});

test.describe("Interact with items in table of component", () => {
  test("click item with link", async ({ page }) => {
		await checkNestedItem(IDEA_HELP.ACCESSIBILITY, false);
		await toc.clickItem(IDEA_HELP.GETTING_STARTED);
		const url = await page.url();
		const href = await toc.getItemHrefAttr(IDEA_HELP.GETTING_STARTED);
		await test.step("Check that url contain href value", () => {
			expect(url).toContain(href);
		});
		await article.checkH1Title(H1Titles.GETTING_STARTED);
		await checkNestedItem(IDEA_HELP.ACCESSIBILITY, true);
  });

  test("click item with link in second depth", async ({ page }) => {
		await toc.clickItem(IDEA_HELP.GROOVY);
		await checkNestedItem(IDEA_HELP.RUN_DEBUG_CONFIGURATION, false);
		await toc.clickItem(IDEA_HELP.RUN_DEBUG_STARTED);
		const url = await page.url();
		const href = await toc.getItemHrefAttr(IDEA_HELP.RUN_DEBUG_STARTED);
		await test.step("Check that url contain href value", () => {
			expect(url).toContain(href);
		});
		await article.checkH1Title(H1Titles.RUN_DEBUG_STARTED);
		await checkNestedItem(IDEA_HELP.RUN_DEBUG_CONFIGURATION, true);
  });

  test("click item without link", async ({ page }) => {
		expect(await toc.isItemVisible(IDEA_HELP.ANALYSIS_DATA_FLOW)).toBeFalsy();
		await toc.clickItem(IDEA_HELP.ANALYSIS);
		const afterUrl = await page.url();
		await checkUrl(startUrl, afterUrl);
		await checkNestedItem(IDEA_HELP.ANALYSIS_DATA_FLOW, true);
		await toc.clickItem(IDEA_HELP.ANALYSIS);
		await checkNestedItem(IDEA_HELP.ANALYSIS_DATA_FLOW, false);
  });
	
  test("click item arrow", async ({ page }) => {
		await checkNestedItem(IDEA_HELP.ACCESSIBILITY, false);
		await toc.clickItemArrow(IDEA_HELP.GETTING_STARTED);
		const afterUrl = await page.url();
		await checkUrl(startUrl, afterUrl);
		await checkNestedItem(IDEA_HELP.ACCESSIBILITY, true);
		await toc.clickItemArrow(IDEA_HELP.GETTING_STARTED);
		await checkNestedItem(IDEA_HELP.ACCESSIBILITY, false);
  });

  test("click item by article path", async ({ page }) => {
		await toc.clickItem(IDEA_HELP.GETTING_STARTED);
		const beforeUrl = await page.url();
		await toc.clickItem(IDEA_HELP.ACCESSIBILITY);
		await article.clickFirstItemInPath();
		const afterUrl = await page.url();
		await test.step("Check selected item", async () => {
			expect(await toc.getSelectedItemDtcAttr()).toEqual(IDEA_HELP.GETTING_STARTED);
		});
		await checkUrl(beforeUrl, afterUrl);
  });

	test("scroll to item", async () => {
		expect(await toc.isItemVisibleInViewport(IDEA_HELP.GROOVY)).toBeFalsy();
		await toc.scrollToItem(IDEA_HELP.GROOVY);
		expect(await toc.isItemVisibleInViewport(IDEA_HELP.GROOVY)).toBeTruthy();
  });
});


async function checkUrl(expected, actual) {
	await test.step("Check url", () => {
		expect(expected).toEqual(actual);
	});
}

async function checkNestedItem(doc, expected) {
	await test.step("Check nested item", async () => {
		expect(await toc.isItemVisible(doc)).toEqual(expected);
	});
}

