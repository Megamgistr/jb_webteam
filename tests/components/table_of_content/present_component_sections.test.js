import { test } from "@playwright/test";
import { IDEA_HELP } from "../../../src/constants/idea_page/data_toc_scroll_atr_value";
import { HelpIdeaPage } from "../../../src/ui/pages/HelpIdeaPage";

let ideaPage;
let toc;

test.beforeEach(async ({ page }) => {
  await page.goto("");
	ideaPage = new HelpIdeaPage(page);
	toc = ideaPage.tableOfContent();
});

test.describe("Table of component sections display correctly", () => {
	test("with nested sections has arrow", async () => {
		await toc.checkArrowOfSectionVisible(IDEA_HELP.GETTING_STARTED);
	});
  test("without nested sections doesn`t have arrow", async () => {
	await toc.clickSection(IDEA_HELP.GETTING_STARTED);
	await toc.checkArrowOfSectionHidden(IDEA_HELP.ACCESSIBILITY);
  });
});


