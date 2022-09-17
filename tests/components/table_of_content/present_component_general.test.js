import { test, expect } from "@playwright/test";
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

test.describe("Table of component is disaplyed correctly", () => {
  test("in standart viewport", async () => {
    await test.step("Check that sidebar is visible", async () => {
      expect(await toc.isSidebarVisible()).toBeTruthy();
    });
  
    await test.step("Check that item is visible", async () => {
      expect(await toc.isItemVisible(IDEA_HELP.GETTING_STARTED)).toBeTruthy();
    });
  });

  test.use({ viewport: { width: 1000, height: 500 } });
  test("in 1000px width viewport", async () => {
    await test.step("Check that hamburger button visible", async () => {
      expect(await header.isHamburgerButtonVisible()).toBeTruthy();
    });

    await test.step("Check that sidebar is not visible", async () => {
      expect(await toc.isSidebarVisibleSmallScreen()).toBeFalsy();
    });

    await header.clickHamburgerButton();

    await test.step("Check that sidebar is visible", async () => {
      expect(await toc.isSidebarVisibleSmallScreen()).toBeTruthy();
    });

    await test.step("Check that item is visible", async () => {
      expect(await toc.isItemVisible(IDEA_HELP.GETTING_STARTED)).toBeTruthy();
    });

    await header.clickHamburgerButton();

    await test.step("Check that sidebar is not visible", async () => {
      expect(await toc.isSidebarVisibleSmallScreen()).toBeFalsy();
    });
  });
});


