import { test, expect } from "@playwright/test";
import { IDEA_HELP } from "../../../src/constants/idea_page/data_toc_scroll_atr_value";
import { H1Titles } from "../../../src/constants/idea_page/titles";
import { HelpIdeaPage } from "../../../src/ui/pages/HelpIdeaPage";

let ideaPage;
let toc;
let article;
let startUrl;

test.beforeEach(async ({ page }) => {
  await page.goto("");
  ideaPage = new HelpIdeaPage(page);
	toc = ideaPage.tableOfContent();
	article = ideaPage.article();
	startUrl = await page.url();
});

test.describe("Interact with sections in table of component", () => {
  test("select not nested section with link", async ({ page }) => {
		await selectSectionExample(page, IDEA_HELP.GROOVY, IDEA_HELP.RUN_DEBUG_STARTED, H1Titles.GROOVY);
  });

  test("select nested section with link", async ({ page }) => {
		await toc.clickArrowOfSection(IDEA_HELP.GROOVY);
		await selectSectionExample(page, IDEA_HELP.RUN_DEBUG_STARTED, IDEA_HELP.RUN_DEBUG_CONFIGURATION, H1Titles.RUN_DEBUG_STARTED);
  });

  test("select section without link", async ({ page }) => {
		await toc.checkSectionHidden(IDEA_HELP.ANALYSIS_DATA_FLOW);
		await toc.clickSection(IDEA_HELP.ANALYSIS);
		const afterUrl = await page.url();
		await checkUrl(startUrl, afterUrl);
		await toc.checkSectionVisible(IDEA_HELP.ANALYSIS_DATA_FLOW);
		await toc.clickSection(IDEA_HELP.ANALYSIS);
		await toc.checkSectionHidden(IDEA_HELP.ANALYSIS_DATA_FLOW);
  });
	
  test("click arrow of section with link", async ({ page }) => {
		await toc.checkSectionHidden(IDEA_HELP.ACCESSIBILITY);
		await toc.clickArrowOfSection(IDEA_HELP.GETTING_STARTED);
		const afterUrl = await page.url();
		await checkUrl(startUrl, afterUrl);
		await toc.checkSectionVisible(IDEA_HELP.ACCESSIBILITY);
		await toc.clickArrowOfSection(IDEA_HELP.GETTING_STARTED);
		await toc.checkSectionHidden(IDEA_HELP.ACCESSIBILITY);
  });

  test("select section by path in article", async ({ page }) => {
		await toc.clickSection(IDEA_HELP.GETTING_STARTED);
		const beforeUrl = await page.url();
		await toc.clickSection(IDEA_HELP.ACCESSIBILITY);
		await article.clickFirstSectionInPath();
		const afterUrl = await page.url();
		await toc.checkSelectedSection(IDEA_HELP.GETTING_STARTED);
		await checkUrl(beforeUrl, afterUrl);
  });

	test("scroll to hidden section", async () => {
		expect(await toc.isSectionVisibleInViewport(IDEA_HELP.GETTING_STARTED)).toBeTruthy();
		expect(await toc.isSectionVisibleInViewport(IDEA_HELP.GROOVY)).toBeFalsy();
		await toc.scrollToSection(IDEA_HELP.GROOVY);
		expect(await toc.isSectionVisibleInViewport(IDEA_HELP.GROOVY)).toBeTruthy();
		expect(await toc.isSectionVisibleInViewport(IDEA_HELP.GETTING_STARTED)).toBeFalsy();
		await toc.scrollToSection(IDEA_HELP.GETTING_STARTED);
		expect(await toc.isSectionVisibleInViewport(IDEA_HELP.GROOVY)).toBeFalsy();
		expect(await toc.isSectionVisibleInViewport(IDEA_HELP.GETTING_STARTED)).toBeTruthy();
  });
});

async function selectSectionExample(page, main, nested, title) {
	await toc.checkSectionHidden(nested);
	await toc.clickSection(main);
	const url = await page.url();
	const href = await toc.getSectionLinkHrefAttr(main);
	await test.step("Check that url contain href value", () => {
		expect(url).toContain(href);
	});
	await article.checkH1Title(title);
	await toc.checkSectionVisible(nested);
	await toc.clickSection(main);
	const afterUrl = await page.url();
	await checkUrl(url, afterUrl);
	await toc.checkSectionHidden(nested);
}

async function checkUrl(expected, actual) {
	await test.step("Check url", () => {
		expect(expected).toEqual(actual);
	});
}

