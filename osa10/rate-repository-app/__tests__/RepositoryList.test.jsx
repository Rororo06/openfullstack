import { render, screen, within } from '@testing-library/react-native';

import { RepositoryListContainer } from '../src/components/RepositoryList';
import { formatCount } from '../src/utils/format';

describe('RepositoryListContainer', () => {
  it('renders repository information correctly', () => {
    const repositories = {
      totalCount: 8,
      pageInfo: {
        hasNextPage: true,
        endCursor:
          'bWFsdGVyLmphdmFzY3JpcHQtcmVzdGF1cmFudA==',
        startCursor: 'anMtdG9vbGluZy5qcw==',
      },
      edges: [
        {
          node: {
            id: 'jaredpalmer.formik',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears',
            language: 'TypeScript',
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl:
              'https://avatars2.githubusercontent.com/u/4060187?v=4',
          },
          cursor: 'amFyZWRwYWxtZXIuZm9ybWlr',
        },
        {
          node: {
            id: 'async-library.react-async',
            fullName: 'async-library/react-async',
            description: 'Flexible promise-based React data loader',
            language: 'JavaScript',
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl:
              'https://avatars1.githubusercontent.com/u/54310907?v=4',
          },
          cursor: 'YXN5bmMtbGlicmFyeS5yZWFjdC1hc3luYw==',
        },
      ],
    };

    render(<RepositoryListContainer repositories={repositories} />);

    const items = screen.getAllByTestId('repositoryItem');
    expect(items).toHaveLength(2);

    repositories.edges.forEach(({ node }, index) => {
      const item = within(items[index]);

      expect(item.getByTestId('fullName')).toHaveTextContent(node.fullName);
      expect(item.getByTestId('description')).toHaveTextContent(node.description);
      expect(item.getByTestId('language')).toHaveTextContent(node.language);
      expect(item.getByTestId('stat-Forks')).toHaveTextContent(
        formatCount(node.forksCount)
      );
      expect(item.getByTestId('stat-Stars')).toHaveTextContent(
        formatCount(node.stargazersCount)
      );
      expect(item.getByTestId('stat-Rating')).toHaveTextContent(
        String(node.ratingAverage)
      );
      expect(item.getByTestId('stat-Reviews')).toHaveTextContent(
        String(node.reviewCount)
      );
    });
  });
});
