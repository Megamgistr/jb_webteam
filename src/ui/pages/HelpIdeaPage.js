import { AbstractPageObject } from "../AbstractPageObject";
import { Header } from "../elements/headers/Header";
import { TableOfContent } from "../elements/sidebars/TableOfContent";
import { Article } from "../elements/viewports/Article";

export class HelpIdeaPage extends AbstractPageObject {
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