import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    const expectedPosts = posts.map((post, index) => ({
      id: (index + 1).toString(),
      ...post,
    }));

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      expect(postsService.findMany()).toEqual(expectedPosts);
    });

    it('should return correct posts for skip and limit options', () => {
      expect(postsService.findMany({ skip: 1, limit: 2 })).toEqual(
        expectedPosts.slice(1, 3),
      );
    });

    it('should skip posts when only skip option is provided', () => {
      expect(postsService.findMany({ skip: 2 })).toEqual(
        expectedPosts.slice(2),
      );
    });

    it('should limit posts when only limit option is provided', () => {
      expect(postsService.findMany({ limit: 2 })).toEqual(
        expectedPosts.slice(0, 2),
      );
    });

    it('should return empty array when skip exceeds posts count', () => {
      expect(postsService.findMany({ skip: 10 })).toEqual([]);
    });

    it('should return empty array when limit is 0', () => {
      expect(postsService.findMany({ limit: 0 })).toEqual([]);
    });
  });
});
