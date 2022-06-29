/**
 * @jest-environment jsdom
 */
import { Comment } from './index';
import { render, within } from '@testing-library/react';
import { screen } from '@testing-library/dom';

describe('Comment', () => {
  it('should render Comment component', () => {
    const TEXT = '123';
    render(<Comment comment={TEXT} userLogin="testLogin" />);
    expect(within(screen.getByText(TEXT)));
  });
});
