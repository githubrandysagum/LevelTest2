import { LevelTest2Page } from './app.po';

describe('level-test2 App', function() {
  let page: LevelTest2Page;

  beforeEach(() => {
    page = new LevelTest2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
