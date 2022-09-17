import { test, expect } from "@playwright/test";
import { IDEA_HELP } from "../../../src/constants/idea_page/data_toc_scroll_atr_value";
import { HelpIdea } from "../../../src/ui/pages/HelpIdea";

let ideaPage;
let toc;

test.beforeEach(async ({ page }) => {
  await page.goto("");
	ideaPage = new HelpIdea(page);
	toc = ideaPage.tableOfContent();
});

test.describe("Table of component items are disaplyed correctly", () => {
	test("with nested items has arrow", async () => {
		expect(await toc.isItemWithArrow(IDEA_HELP.GETTING_STARTED)).toBeTruthy();
	});
  test("without nested items doesn`t have arrow", async () => {
		await toc.clickItem(IDEA_HELP.GETTING_STARTED);
    expect(await toc.isItemWithArrow(IDEA_HELP.ACCESSIBILITY)).toBeFalsy();
  });
});


