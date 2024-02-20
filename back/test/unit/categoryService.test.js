const {CategoryService} = require('../../src/domain/services/CategoryService');
const Category = require('../../src/domain/entities/Category');

describe('Category Service test', () => {
    it('should return SECOND for FIRST', () => {
        const categoryService = new CategoryService();
        const result = categoryService.getNextCategoryFrom(Category.FIRST);
        expect(result).toBe(Category.SECOND);
    });

    it('should return THIRD for SECOND', () => {
        const categoryService = new CategoryService();
        const result = categoryService.getNextCategoryFrom(Category.SECOND);
        expect(result).toBe(Category.THIRD);
    });

    it('should return FOURTH for THIRD', () => {
        const categoryService = new CategoryService();
        const result = categoryService.getNextCategoryFrom(Category.THIRD);
        expect(result).toBe(Category.FOURTH);
    });

    it('should return FIFTH for FOURTH', () => {
        const categoryService = new CategoryService();
        const result = categoryService.getNextCategoryFrom(Category.FOURTH);
        expect(result).toBe(Category.FIFTH);
    });

    it('should return SIXTH for FIFTH', () => {
        const categoryService = new CategoryService();
        const result = categoryService.getNextCategoryFrom(Category.FIFTH);
        expect(result).toBe(Category.SIXTH);
    });

    it('should return SEVENTH for SIXTH', () => {
        const categoryService = new CategoryService();
        const result = categoryService.getNextCategoryFrom(Category.SIXTH);
        expect(result).toBe(Category.SEVENTH);
    });

    it('should return DONE for SEVENTH', () => {
        const categoryService = new CategoryService();
        const result = categoryService.getNextCategoryFrom(Category.SEVENTH);
        expect(result).toBe(Category.DONE);
    });

    it('should return DONE for DONE', () => {
        const categoryService = new CategoryService();
        const result = categoryService.getNextCategoryFrom(Category.DONE);
        expect(result).toBe(Category.DONE);
    });

    it('should return FIRST for unknown', () => {
        const categoryService = new CategoryService();
        const result = categoryService.getNextCategoryFrom('unknown');
        expect(result).toBe(Category.FIRST);
    });
});