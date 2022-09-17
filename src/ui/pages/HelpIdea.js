import { AbstractPageObject } from "../AbstractPageObject";
import { Header } from "../elements/headers/Header";
import { TableOfContent } from "../elements/sidebars/table_of_content";
import { Article } from "../elements/viewports/Article";

export class HelpIdea extends AbstractPageObject {
	constructor(page) {
		super(page);
	}

	header() {
		return new Header(this.page);
	}

	tableOfContent() {
		return new TableOfContent(this.page);
	}

	article() {
		return new Article(this.page);
	}
}