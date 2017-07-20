import { RetrospectiveRoundTablePage } from './app.po';

describe('retrospective-round-table App', () => {
  let page: RetrospectiveRoundTablePage;

  beforeEach(() => {
    page = new RetrospectiveRoundTablePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
