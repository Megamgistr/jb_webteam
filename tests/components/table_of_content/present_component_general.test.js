import { test } from "@playwright/test";
import { IDEA_HELP } from "../../../src/constants/idea_page/data_toc_scroll_atr_value";
import { HelpIdeaPage } from "../../../src/ui/pages/HelpIdeaPage";

let ideaPage;
let toc;
let header;

test.beforeEach(async ({ page }) => {
  await page.goto("");
  ideaPage = new HelpIdeaPage(page);
	toc = ideaPage.tableOfContent();
	header = ideaPage.header();
});

test.describe("Table of component display correctly", () => {
  test("in standart viewport", async () => {
    await toc.checkSidebarVisible();
    await toc.checkSectionVisible(IDEA_HELP.GETTING_STARTED);
  });

  test.use({ viewport: { width: 1000, height: 500 } });
  test("in 1000px width viewport", async () => {
    await header.checkHamburgerButtonVisible();
    await toc.checkSidebarHiddenSmallScreen();

    await header.clickHamburgerButton();

    await toc.checkSidebarVisibleSmallScreen();
    await toc.checkSectionVisible(IDEA_HELP.GETTING_STARTED);

    await header.clickHamburgerButton();

    await toc.checkSidebarHiddenSmallScreen();
  });
});


