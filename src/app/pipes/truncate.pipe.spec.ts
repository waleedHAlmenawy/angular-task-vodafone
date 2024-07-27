import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  const truncate = new TruncatePipe();

  it('create an instance', () => {
    expect(truncate).toBeTruthy();
  });

  it('truncate pipe should truncate a string that passed the limit and add ... to it', () => {
    expect(truncate.transform('Waleed Almenawy', 6)).toBe('Waleed ...');
  });
});
